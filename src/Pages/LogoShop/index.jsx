import { Button, Upload, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../../App";
import { getData, postData } from "../../untils/api";

export default function LogoShop() {
  const [loading, setLoading] = useState(false);
  const context = useContext(MyContext);

  const [formData, setFormData] = useState({ images: "" });
  const [oldImage, setOldImage] = useState("");

  const uploadButton = (
    <div className="flex flex-col items-center justify-center border border-dashed hover:border-red-500 border-gray-300 rounded-md p-4 cursor-pointer text-gray-500">
      <PlusOutlined className="text-xl" />
      <div className="mt-2">Upload</div>
    </div>
  );

  const fetchData = async () => {
    try {
      const res = await getData("/api/logo/");
      if (res.success) {
        const imageUrl = res.data?.images || "";
        setFormData({ images: imageUrl });
        setOldImage(imageUrl); //  lưu ảnh cũ để so sánh
      }
    } catch (error) {
      context.openAlertBox(
        "error",
        error.response?.data?.message || "Không thể kết nối server!"
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const body = new FormData();
    body.append("images", formData.images);

    try {
      const res = await postData("/api/logo/add", body);
      if (res.success) {
        context.openAlertBox("success", res.message);
        setFormData({ images: "" });
        fetchData();
      }
    } catch (error) {
      context.openAlertBox(
        "error",
        error.response?.data?.message || "Không thể kết nối server!"
      );
    } finally {
      setLoading(false);
    }
  };

  //  Kiểm tra xem có ảnh mới không
  const isImageChanged =
    formData.images &&
    formData.images !== oldImage &&
    formData.images instanceof File;

  return (
    <div className="flex flex-col gap-4">
      <div className="text-[18px] font-[500] mb-2 uppercase">Quản lí logo</div>
      <form onSubmit={handleSubmit}>
        <div className="bg-white px-8 py-16 rounded-lg shadow-md">
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
                          ? formData.images // ảnh cũ
                          : URL.createObjectURL(formData.images), // ảnh mới
                    },
                  ]
                : []
            }
            onChange={({ fileList }) => {
              setFormData((prev) => ({
                ...prev,
                images: fileList[0]?.originFileObj || null,
              }));
            }}
          >
            {uploadButton}
          </Upload>

          <div className="text-center">
            <Button
              type="primary"
              danger
              htmlType="submit"
              className="w-[40%] mt-4 text-[17px]"
              size="large"
              disabled={!isImageChanged || loading} //
            >
              {loading ? (
                <div className="flex gap-2">
                  <Spin /> Đang xử lí...
                </div>
              ) : (
                "Cập nhật logo"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
