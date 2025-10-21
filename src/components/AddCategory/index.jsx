import { Button, Flex, Input, Modal, Spin, Upload } from "antd";
import React, { useContext, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { MyContext } from "../../App";
import { postData } from "../../untils/api";
export default function AddCategory({ onSuccess }) {
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
    name: "",
    images: "",
    parentCatName: "",
    parentId: "",
  });
  const handleClick = () => {
    if (!context?.userData?.role?.permissions.includes("category_create")) {
      context.openAlertBox("error", "Bạn không có quyền thêm danh mục!");
      return;
    } else {
      setOpen(true);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.name) {
      context.openAlertBox("error", "Vui lòng nhập tên danh mục");
      inputRefs.name.current.focus();
      setLoading(false);
      return;
    }
    if (!formData.images) {
      context.openAlertBox("error", "Vui lòng thêm hình ảnh");
      setLoading(false);
      return;
    }
    const body = new FormData();
    body.append("name", formData.name);
    body.append("images", formData.images);
    try {
      const res = await postData("/api/category/create", body);
      if (res.success) {
        context.openAlertBox("success", res.message);
        setFormData({ name: "", images: "" });
        setOpen(false);
        if (onSuccess) {
          onSuccess(res.category); // truyền category mới lên cha
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
    <>
      <Flex vertical gap="middle" align="flex-start">
        {/* Responsive */}
        <Button color="danger" variant="solid" onClick={handleClick}>
          Thêm danh mục
        </Button>
        <Modal
          title="Thêm danh mục"
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
        </Modal>
      </Flex>
    </>
  );
}
