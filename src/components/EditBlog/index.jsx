import { Button, Flex, Input, Modal, Spin, Upload } from "antd";
import React, { useContext, useState } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { MyContext } from "../../App";
import { CiEdit } from "react-icons/ci";
import { Editor } from "@tinymce/tinymce-react";
export default function EditBlog() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const context = useContext(MyContext);
  const uploadButton = (
    <div className="flex flex-col items-center justify-center border border-dashed hover:border-red-500 border-gray-300 rounded-md p-4 cursor-pointer text-gray-500">
      <PlusOutlined className="text-xl" />
      <div className="mt-2">Upload</div>
    </div>
  );
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
          <form>
            <div className="flex flex-col gap-1">
              <div className="text-[15px]">Tiêu đề</div>
              <Input size="large" name="title" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-[15px]">Mô tả </div>
              <Editor
                apiKey="0i4qgvltt8xiuzo0ebuptffq6jiefu5i2annb2aysu6abom0"
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
