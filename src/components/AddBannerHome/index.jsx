import { Button, Flex, Modal, Spin, Upload } from "antd";
import React from "react";
import { useState } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { MyContext } from "../../App";
import { postData } from "../../untils/api";
export default function AddBannerHome({ onSuccess }) {
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
    images: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.images) {
      context.openAlertBox("error", "Vui lòng thêm hình ảnh");
      setLoading(false);
      return;
    }
    const body = new FormData();
    body.append("images", formData.images);
    try {
      const res = await postData("/api/banner/create", body);
      if (res.success) {
        setFormData({ images: "" });
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
      setLoading(false); // luôn chạy
    }
  };

  return (
    <Flex vertical gap="middle" align="flex-start">
      {/* Responsive */}
      <Button color="danger" variant="solid" onClick={() => setOpen(true)}>
        Thêm Banner
      </Button>
      <Modal
        title="Thêm Banner Home"
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
