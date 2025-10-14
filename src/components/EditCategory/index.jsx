import { Button, Flex, Input, Modal, Spin, Upload } from "antd";
import React, { useContext, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { PlusOutlined } from "@ant-design/icons";
import { MyContext } from "../../App";
import { postData, putData } from "../../untils/api";
export default function EditCategory({ category, onSuccess }) {
  const context = useContext(MyContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRefs = {
    name: useRef(),
  };
  const uploadButton = (
    <div className="flex flex-col items-center justify-center border border-dashed hover:border-red-500 border-gray-300 rounded-md p-4 cursor-pointer text-gray-500">
      <PlusOutlined className="text-xl" />
      <div className="mt-2">Upload</div>
    </div>
  );
  const [formData, setFormData] = useState({
    name: category?.name,
    images: category?.images,
    parentCatName: "",
    parentId: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const body = new FormData();
      body.append("name", formData.name);
      body.append("images", formData.images);

      const res = await putData(`/api/category/update/${category?._id}`, body);

      if (res.success) {
        context.openAlertBox("success", res.message);

        setOpen(false);
        if (onSuccess) {
          onSuccess();
        }
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
    <>
      <Flex vertical gap="middle" align="flex-start">
        {/* Responsive */}

        <CiEdit className="text-[16px]" onClick={() => setOpen(true)} />

        <Modal
          title="Chỉnh sửa danh mục"
          centered
          open={open}
          onCancel={() => setOpen(false)}
          width="90%"
          footer={null} // ẩn nút Ok/Cancel mặc định
          styles={{
            body: {
              maxHeight: "75vh",
              overflowY: "auto",
              padding: "10px",
            },
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <div className="text-[15px]">Tên danh mục</div>
              <Input
                size="large"
                name="name"
                value={formData.name}
                ref={inputRefs.name}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, name: e.target.value }));
                }}
              />
            </div>

            <div className="mt-4">
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
                          url:
                            typeof formData.images === "string"
                              ? formData.images // ảnh cũ từ server
                              : URL.createObjectURL(formData.images), // ảnh mới upload
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
                  "Cập nhật"
                )}
              </Button>
            </div>
          </form>
        </Modal>
      </Flex>
    </>
  );
}
