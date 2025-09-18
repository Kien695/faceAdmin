import React, { useState } from "react";
import { Button, Flex, Table, Space, Modal, Image, Upload } from "antd";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
const columns = [
  { title: "Hình ảnh", dataIndex: "image" },
  { title: "Hành động", dataIndex: "action" },
];
const dataSource = [
  {
    image: (
      <img
        src="https://serviceapi.spicezgold.com/download/1755503364377_1721277298204_banner.jpg"
        alt="banner"
        style={{ width: "300px", height: "auto", borderRadius: "8px" }}
      />
    ),
    action: (
      <Space size="middle">
        <CiEdit className="text-[20px] cursor-pointer" />
        <RiDeleteBin6Line className="text-[20px] cursor-pointer" />
      </Space>
    ),
  },
  {
    image: (
      <img
        src="https://serviceapi.spicezgold.com/download/1755503364377_1721277298204_banner.jpg"
        alt="banner"
        style={{ width: "300px", height: "auto", borderRadius: "8px" }}
      />
    ),
    action: (
      <Space size="middle">
        <CiEdit className="text-[20px] cursor-pointer" />
        <RiDeleteBin6Line className="text-[20px] cursor-pointer" />
      </Space>
    ),
  },
  {
    image: (
      <img
        src="https://serviceapi.spicezgold.com/download/1755503364377_1721277298204_banner.jpg"
        alt="banner"
        style={{ width: "300px", height: "auto", borderRadius: "8px" }}
      />
    ),
    action: (
      <Space size="middle">
        <CiEdit className="text-[20px] cursor-pointer" />
        <RiDeleteBin6Line className="text-[20px] cursor-pointer" />
      </Space>
    ),
  },
];

export default function BannerListTwo() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const uploadButton = (
    <div className="flex flex-col items-center justify-center border border-dashed hover:border-red-500 border-gray-300 rounded-md p-4 cursor-pointer text-gray-500">
      <PlusOutlined className="text-xl" />
      <div className="mt-2">Upload</div>
    </div>
  );
  return (
    <div className="bg-white p-2 rounded-md shadow-md">
      <div className="px-2 pb-6 text-[18px] font-[600] text-[#ff5252]">
        Danh sách Banners
      </div>
      <Flex gap="middle" vertical>
        <Flex
          align="center"
          justify="space-between"
          gap="middle"
          className="px-5"
        >
          <div className="flex items-center gap-2">
            <Button
              type="primary"
              onClick={start}
              disabled={!hasSelected}
              loading={loading}
            >
              Xóa tất cả
            </Button>
            {hasSelected ? `Chọn ${selectedRowKeys.length} Banner` : null}
          </div>
          <Flex vertical gap="middle" align="flex-start">
            {/* Responsive */}
            <Button
              color="danger"
              variant="solid"
              onClick={() => setOpen(true)}
            >
              Thêm Banner
            </Button>
            <Modal
              title="Thêm Banner List"
              centered
              open={open}
              onOk={() => setOpen(false)}
              onCancel={() => setOpen(false)}
              width="90%"
              bodyStyle={{
                maxHeight: "75vh", // giới hạn chiều cao
                overflowY: "auto",
                padding: "10px", // bật thanh cuộn dọc
              }}
            >
              <div className="flex flex-col gap-4">
                <div>
                  <div className="text-[15px] mb-2">Upload Banner</div>
                  <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture"
                    maxCount={1}
                  >
                    {uploadButton}
                  </Upload>
                </div>
              </div>
            </Modal>
          </Flex>
        </Flex>

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataSource}
        />
      </Flex>
    </div>
  );
}
