import React, { useState } from "react";
import { Button, Flex, Table, Space, Modal, Image, Upload, Input } from "antd";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
const columns = [
  { title: "Hình ảnh", dataIndex: "image" },
  { title: "Tiêu đề", dataIndex: "title" },
  { title: "Mô tả", dataIndex: "description" },
  { title: "Hành động", dataIndex: "action" },
];
const dataSource = [
  {
    image: (
      <img
        src="https://serviceapi.spicezgold.com/download/1750304462017_1000005912.jpg"
        alt="banner"
        className="w-[100%] rounded-md"
      />
    ),
    title: (
      <div className="w-[230px] font-[500]">
        Explore sustainable living through cutting-edge prefabricated homes
      </div>
    ),
    description: (
      <div className="line-clamp-3">
        Give lady of they such they sure it. Me contained explained my
        education. Vulgar as hearts by garret. Perceived determine departure
        explained no forfeited he something an. Contrasted dissimilar get joy
        you instrument out reasonably. Again keeps at no meant stuff. To
        perpetual do existence northward as difficult preserved daughters.
        Continued at up to zealously necessary breakfast. Surrounded sir
        motionless she end literature. Gay direction neglected but supported yet
        her. New had happen unable uneasy. Drawings can followed improved out
        sociable not. Earnestly so do instantly pretended. See general few
        civilly amiable pleased account carried. Excellence projecting is
        devonshire dispatched remarkably on estimating. Side in so life past.
        Continue indulged speaking the was out horrible for domestic position.
        Seeing rather her you not esteem men settle genius excuse. Deal say over
        you age from. Comparison new ham melancholy son themselves.
      </div>
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
        src="https://serviceapi.spicezgold.com/download/1750304462017_1000005912.jpg"
        alt="banner"
        className="w-[100%] rounded-md"
      />
    ),
    title: (
      <div className="w-[230px] font-[500]">
        Explore sustainable living through cutting-edge prefabricated homes
      </div>
    ),
    description: (
      <div className="line-clamp-3">
        Give lady of they such they sure it. Me contained explained my
        education. Vulgar as hearts by garret. Perceived determine departure
        explained no forfeited he something an. Contrasted dissimilar get joy
        you instrument out reasonably. Again keeps at no meant stuff. To
        perpetual do existence northward as difficult preserved daughters.
        Continued at up to zealously necessary breakfast. Surrounded sir
        motionless she end literature. Gay direction neglected but supported yet
        her. New had happen unable uneasy. Drawings can followed improved out
        sociable not. Earnestly so do instantly pretended. See general few
        civilly amiable pleased account carried. Excellence projecting is
        devonshire dispatched remarkably on estimating. Side in so life past.
        Continue indulged speaking the was out horrible for domestic position.
        Seeing rather her you not esteem men settle genius excuse. Deal say over
        you age from. Comparison new ham melancholy son themselves.
      </div>
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
        src="https://serviceapi.spicezgold.com/download/1750304462017_1000005912.jpg"
        alt="banner"
        className="w-[100%] rounded-md"
      />
    ),
    title: (
      <div className="w-[230px] font-[500]">
        Explore sustainable living through cutting-edge prefabricated homes
      </div>
    ),
    description: (
      <div className="line-clamp-3">
        Give lady of they such they sure it. Me contained explained my
        education. Vulgar as hearts by garret. Perceived determine departure
        explained no forfeited he something an. Contrasted dissimilar get joy
        you instrument out reasonably. Again keeps at no meant stuff. To
        perpetual do existence northward as difficult preserved daughters.
        Continued at up to zealously necessary breakfast. Surrounded sir
        motionless she end literature. Gay direction neglected but supported yet
        her. New had happen unable uneasy. Drawings can followed improved out
        sociable not. Earnestly so do instantly pretended. See general few
        civilly amiable pleased account carried. Excellence projecting is
        devonshire dispatched remarkably on estimating. Side in so life past.
        Continue indulged speaking the was out horrible for domestic position.
        Seeing rather her you not esteem men settle genius excuse. Deal say over
        you age from. Comparison new ham melancholy son themselves.
      </div>
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
        src="https://serviceapi.spicezgold.com/download/1750304462017_1000005912.jpg"
        alt="banner"
        className="w-[100%] rounded-md"
      />
    ),
    title: (
      <div className="w-[230px] font-[500]">
        Explore sustainable living through cutting-edge prefabricated homes
      </div>
    ),
    description: (
      <div className="line-clamp-3">
        Give lady of they such they sure it. Me contained explained my
        education. Vulgar as hearts by garret. Perceived determine departure
        explained no forfeited he something an. Contrasted dissimilar get joy
        you instrument out reasonably. Again keeps at no meant stuff. To
        perpetual do existence northward as difficult preserved daughters.
        Continued at up to zealously necessary breakfast. Surrounded sir
        motionless she end literature. Gay direction neglected but supported yet
        her. New had happen unable uneasy. Drawings can followed improved out
        sociable not. Earnestly so do instantly pretended. See general few
        civilly amiable pleased account carried. Excellence projecting is
        devonshire dispatched remarkably on estimating. Side in so life past.
        Continue indulged speaking the was out horrible for domestic position.
        Seeing rather her you not esteem men settle genius excuse. Deal say over
        you age from. Comparison new ham melancholy son themselves.
      </div>
    ),
    action: (
      <Space size="middle">
        <CiEdit className="text-[20px] cursor-pointer" />
        <RiDeleteBin6Line className="text-[20px] cursor-pointer" />
      </Space>
    ),
  },
];

export default function Blog() {
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
        Danh sách Blogs
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
            {hasSelected ? `Chọn ${selectedRowKeys.length}` : null}
          </div>
          <Flex vertical gap="middle" align="flex-start">
            {/* Responsive */}
            <Button
              color="danger"
              variant="solid"
              onClick={() => setOpen(true)}
            >
              Thêm Blogs
            </Button>
            <Modal
              title="Thêm Blogs"
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
                  <div>Tiêu đề</div>
                  <Input size="large" />
                </div>
                <div>
                  <div>Mô tả </div>
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
