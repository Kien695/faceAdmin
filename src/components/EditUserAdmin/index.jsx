import { Button, Flex, Input, Modal, Select, Spin } from "antd";
import React from "react";
import { useContext } from "react";
import { CiEdit } from "react-icons/ci";
import { MyContext } from "../../App";
import { useState } from "react";
import { patchData } from "../../untils/api";

export default function EditUserAdmin({ admin, onSuccess }) {
  const context = useContext(MyContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    if (!context?.userData?.role?.permissions.includes("userAdmin_edit")) {
      context.openAlertBox(
        "error",
        "Bạn không có quyền chỉnh sửa người quản lí!",
      );
      return;
    } else {
      setOpen(true);
    }
  };
  const [formData, setFormData] = useState({
    name: admin?.name,
    role: admin?.role?._id || "",
  });

  const options = context?.roleData.map((item) => ({
    label: item.title,
    value: item._id,
  }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await patchData(
        `/api/userAdmin/updateRole/${admin?._id}`,
        formData,
      );

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

      <CiEdit className="text-[16px]" onClick={() => setOpen(true)} />

      <Modal
        title="Chỉnh sửa quyền"
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width="75%"
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
          <div className="flex md:flex-row flex-col  items-center md:gap-8 gap-4">
            <div className="flex flex-col gap-1">
              <div className="text-[15px]">Họ tên</div>
              <Input
                size="large"
                style={{ width: 250 }}
                name="name"
                value={formData.name}
                disabled
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-[15px]">Chọn quyền</div>
              <Select
                size="large"
                value={formData.role}
                style={{ width: 250 }}
                options={options}
                onChange={(value, option) => {
                  setFormData((prev) => ({
                    ...prev,
                    role: value,
                  }));
                }}
              />
            </div>
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
  );
}
