import { Button, Flex, Input, Modal, Spin } from "antd";
import React, { useContext, useRef, useState } from "react";
import { MyContext } from "../../App";
import { Editor } from "@tinymce/tinymce-react";
import { patchData } from "../../untils/api";
import { CiEdit } from "react-icons/ci";
export default function EditRole({ role, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const context = useContext(MyContext);
  const handleClick = () => {
    if (!context?.userData?.role?.permissions.includes("role_edit")) {
      context.openAlertBox("error", "Bạn không có quyền chỉnh sửa quyền!");
      return;
    } else {
      setOpen(true);
    }
  };
  const inputRefs = {
    title: useRef(),
  };
  const [formData, setFormData] = useState({
    title: role.title || "",
    description: role.description || "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await patchData(`/api/role/edit/${role._id}`, formData);
      if (res.success) {
        context.openAlertBox("success", res.message);
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
    <Flex align="center" justify="end" gap="middle">
      <CiEdit className="text-[18px] cursor-pointer" onClick={handleClick} />
      <Modal
        title="Thêm nhóm quyền"
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
              <div className="text-[15px]">Tên nhóm quyền</div>
              <Input
                size="large"
                name="title"
                value={formData.title}
                ref={inputRefs.title}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, title: e.target.value }));
                }}
              />
            </div>
            <div className="flex flex-col gap-1 mt-3">
              <div className="text-[15px]">Mô tả </div>
              <Editor
                apiKey="0i4qgvltt8xiuzo0ebuptffq6jiefu5i2annb2aysu6abom0"
                value={formData.description}
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
