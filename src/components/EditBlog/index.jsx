import { Button, Flex, Input, Modal, Spin, Upload } from "antd";
import React, { useContext, useState } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { MyContext } from "../../App";
import { CiEdit } from "react-icons/ci";
import { Editor } from "@tinymce/tinymce-react";
import { patchData } from "../../untils/api";
export default function EditBlog({ blog, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const context = useContext(MyContext);
  const uploadButton = (
    <div className="flex flex-col items-center justify-center border border-dashed hover:border-red-500 border-gray-300 rounded-md p-4 cursor-pointer text-gray-500">
      <PlusOutlined className="text-xl" />
      <div className="mt-2">Upload</div>
    </div>
  );
  const [formData, setFormData] = useState({
    title: blog.title || "",
    images: blog.images || "",
    description: blog.description || "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = new FormData();
      body.append("title", formData.title);
      body.append("description", formData.description);
      body.append("images", formData.images);
      const res = await patchData(`/api/blog/edit/${blog._id}`, body);
      if (res.success) {
        context.openAlertBox("success", res.message);
        if (onSuccess) onSuccess();
        setOpen(false);
      }
    } catch (error) {
      if (error.response) {
        context.openAlertBox("error", error.response.data.message);
      } else {
        context.openAlertBox("error", "Không thể kết nối server!");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Flex vertical gap="middle" align="flex-start">
      {/* Responsive */}

      <CiEdit
        className="text-[20px] cursor-pointer"
        onClick={() => setOpen(true)}
      />

      <Modal
        title="Thêm Blogs"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width="90%"
        footer={null}
        style={{
          body: {
            maxHeight: "75vh", // giới hạn chiều cao
            overflowY: "auto",
            padding: "10px", // bật thanh cuộn dọc
          },
        }}
      >
        <div className="flex flex-col gap-4">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <div className="text-[15px]">Tiêu đề</div>
              <Input
                size="large"
                name="title"
                value={formData.title}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, title: e.target.value }));
                }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-[15px]">Mô tả </div>
              <Editor
                apiKey="0i4qgvltt8xiuzo0ebuptffq6jiefu5i2annb2aysu6abom0"
                value={formData.description}
                onEditorChange={(content) => {
                  setFormData((prev) => ({ ...prev, description: content }));
                }}
                init={{
                  height: 300,
                  plugins:
                    "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                  toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                }}
              />
            </div>
            <div>
              <div className="text-[15px] mb-2">Thêm ảnh</div>
              <Upload
                listType="picture"
                maxCount={1}
                beforeUpload={() => false}
                fileList={
                  formData.images
                    ? [
                        {
                          uid: "-1",
                          name: "image.png",
                          status: "done",
                          url:
                            typeof formData.images === "string"
                              ? formData.images // ảnh cũ từ server
                              : URL.createObjectURL(formData.images), // ảnh mới upload
                        },
                      ]
                    : []
                }
                onChange={({ fileList }) => {
                  const file = fileList[0]?.originFileObj;
                  setFormData((prev) => ({
                    ...prev,
                    images: file || "", // lưu file gốc để gửi FormData sau này
                  }));
                }}
              >
                {uploadButton}
              </Upload>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button onClick={() => setOpen(false)}>Hủy bỏ</Button>
              <Button type="primary" htmlType="submit" disabled={loading}>
                {loading ? (
                  <div className="flex gap-2">
                    <Spin /> Đang xử lí...
                  </div>
                ) : (
                  "Cập nhật"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </Flex>
  );
}
