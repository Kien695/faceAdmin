import { Editor } from "@tinymce/tinymce-react";
import { Button, Flex, Input, Modal, Spin, Upload } from "antd";
import React, { useContext, useRef, useState } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { MyContext } from "../../App";
import { postData } from "../../untils/api";
export default function AddBlog({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const context = useContext(MyContext);
  const uploadButton = (
    <div className="flex flex-col items-center justify-center border border-dashed hover:border-red-500 border-gray-300 rounded-md p-4 cursor-pointer text-gray-500">
      <PlusOutlined className="text-xl" />
      <div className="mt-2">Upload</div>
    </div>
  );
  const inputRefs = {
    title: useRef(),
  };
  const [formData, setFormData] = useState({
    title: "",
    images: "",
    description: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.title) {
      context.openAlertBox("error", "Vui lòng nhập tên blog");
      inputRefs.title.current.focus();
      setLoading(false);
      return;
    }
    if (!formData.description) {
      context.openAlertBox("error", "Vui lòng nhập nội dung blog");
      window.tinymce?.activeEditor?.focus();
      setLoading(false);
      return;
    }
    const body = new FormData();
    body.append("title", formData.title);
    body.append("description", formData.description);
    body.append("images", formData.images);
    try {
      const res = await postData("/api/blog/create", body);
      if (res.success) {
        context.openAlertBox("success", res.message);
        setFormData({ title: "", images: "", description: "" });
        setOpen(false);
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      if (error.response) {
        context.openAlertBox("error", error.response.data.message);
      } else {
        context.openAlertBox("error", "Không thể kết nối server!");
      }
    } finally {
      setLoading(false); // luôn chạy
    }
  };
  return (
    <Flex vertical gap="middle" align="flex-start">
      {/* Responsive */}
      <Button color="danger" variant="solid" onClick={() => setOpen(true)}>
        Thêm Blogs
      </Button>
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
                ref={inputRefs.title}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, title: e.target.value }));
                }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-[15px]">Mô tả </div>
              <Editor
                apiKey="0i4qgvltt8xiuzo0ebuptffq6jiefu5i2annb2aysu6abom0"
                onEditorChange={(context) => {
                  setFormData((prev) => ({ ...prev, description: context }));
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
                fileList={
                  formData.images
                    ? [
                        {
                          uid: "-1",
                          name: "image.png",
                          status: "done",
                          url: URL.createObjectURL(formData.images),
                        },
                      ]
                    : []
                }
                beforeUpload={() => false}
                onChange={({ fileList }) => {
                  setFormData((prev) => ({
                    ...prev,
                    images: fileList[0]?.originFileObj || null,
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
                  "Thêm mới"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </Flex>
  );
}
