import { Button, Flex, Modal, Spin, Upload } from "antd";
import React from "react";
import { useContext } from "react";
import { CiEdit } from "react-icons/ci";
import { MyContext } from "../../App";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { putData } from "../../untils/api";
export default function EditBannerHome({ banner, onSuccess }) {
  const context = useContext(MyContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const uploadButton = (
    <div className="flex flex-col items-center justify-center border border-dashed hover:border-red-500 border-gray-300 rounded-md p-4 cursor-pointer text-gray-500">
      <PlusOutlined className="text-xl" />
      <div className="mt-2">Upload</div>
    </div>
  );
  const [formData, setFormData] = useState({
    images: banner.images || "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const body = new FormData();

      body.append("images", formData.images);

      const res = await putData(`/api/banner/edit/${banner._id}`, body);

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
    <Flex vertical gap="middle" align="flex-start">
      {/* Responsive */}

      <CiEdit
        className="text-[20px] cursor-pointer"
        onClick={() => setOpen(true)}
      />

      <Modal
        title="Chỉnh sửa Banner Home"
        centered
        open={open}
        footer={null}
        onCancel={() => setOpen(false)}
        width="90%"
        styles={{
          body: {
            maxHeight: "75vh", // giới hạn chiều cao
            overflowY: "auto",
            padding: "10px", // bật thanh cuộn dọc}
          },
        }}
      >
        <div className="flex flex-col gap-4">
          <form onSubmit={handleSubmit}>
            <div>
              <div className="text-[15px] mb-2">Upload Banner</div>
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
        </div>
      </Modal>
    </Flex>
  );
}
