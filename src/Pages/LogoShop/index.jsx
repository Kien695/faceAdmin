import { Button, Upload } from "antd";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
export default function LogoShop() {
  const uploadButton = (
    <div className="flex  flex-col items-center justify-center border border-dashed hover:border-red-500 border-gray-300 rounded-md p-4 cursor-pointer text-gray-500">
      <PlusOutlined className="text-xl" />
      <div className="mt-2">Upload</div>
    </div>
  );
  return (
    <div className="flex flex-col gap-4">
      <div className="text-[18px] font-[500] mb-2">Quản lí logo</div>
      <div className="bg-white px-8 py-16 rounded-lg shadow-md">
        <Upload
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          listType="picture"
          maxCount={1}
        >
          {uploadButton}
        </Upload>
        <div className="text-center">
          <Button
            type="primary"
            danger
            className=" w-[40%] mt-4 text-[17px]"
            size="large"
          >
            Cập nhật logo
          </Button>
        </div>
      </div>
    </div>
  );
}
