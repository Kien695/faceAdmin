import { Button, Flex, Input, Modal, Spin } from "antd";
import React, { useContext, useRef, useState } from "react";
import { MyContext } from "../../App";
import { Editor } from "@tinymce/tinymce-react";
import { postData } from "../../untils/api";

export default function AddRole({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const context = useContext(MyContext);
  const handleClick = () => {
    if (!context?.userData?.role?.permissions.includes("role_create")) {
      context.openAlertBox("error", "Bạn không có quyền thêm nhóm quyền!");
      return;
    } else {
      setOpen(true);
    }
  };
  const inputRefs = {
    title: useRef(),
  };
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.title) {
      context.openAlertBox("error", "Vui lòng nhập tên nhóm quyền");
      inputRefs.title.current.focus();
      setLoading(false);
      return;
    }
    if (!formData.description) {
      context.openAlertBox("error", "Vui lòng nhập mô tả nhóm quyền");
      window.tinymce?.activeEditor?.focus();
      setLoading(false);
      return;
    }

    try {
      const res = await postData("/api/role/create", formData);
      if (res.success) {
        context.openAlertBox("success", res.message);
        setFormData({ title: "", description: "" });
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
    <Flex align="center" justify="end" gap="middle" className="px-5">
      <Button color="danger" variant="solid" onClick={handleClick}>
        Thêm nhóm quyền
      </Button>
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
