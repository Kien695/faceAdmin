import React, { useState } from "react";
import "./style.css";
import { Button, Modal, Flex, Input, Rate, Select, Table } from "antd";
import { MdOutlineSearch } from "react-icons/md";
import { BiFilterAlt } from "react-icons/bi";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
const columns = [
  { title: "Sản phẩm", dataIndex: "product" },
  { title: "Danh mục", dataIndex: "category" },
  { title: "Danh mục phụ", dataIndex: "subCategory" },
  { title: "Giá", dataIndex: "price" },
  { title: "Đã bán", dataIndex: "sale" },
  { title: "Còn lại", dataIndex: "stock" },
  { title: "Đánh giá", dataIndex: "rating" },
  { title: "Hành động", dataIndex: "action" },
];
const dataSource = Array.from({ length: 20 }).map((_, i) => ({
  key: i,
  product: `Women Wide Leg High-Rise Light Fade Stretchable Jeans`,
  category: "Fashion",
  subCategory: "Women",
  price: 300,
  sale: 45,
  stock: 100,
  rating: <Rate disabled defaultValue={2} style={{ fontSize: 15 }} />,
  action: "Thêm",
}));
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
export default function Product() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [open, setOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const start = () => {
    setLoading(true);

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
  //hình

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <div className="bg-white p-2 rounded-md shadow-md">
      <div className="px-2 pb-6 text-[18px] font-[600] text-[#ff5252]">
        Danh sách sản phẩm
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

            {hasSelected ? `Chọn ${selectedRowKeys.length} sản phẩm` : null}
          </div>
          <Flex vertical gap="middle" align="flex-start">
            {/* Responsive */}
            <Button
              color="danger"
              variant="solid"
              onClick={() => setOpen(true)}
            >
              Thêm sản phẩm
            </Button>
            <Modal
              title="Thêm sản phẩm"
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
                  <div>Tên sản phẩm</div>
                  <Input size="large" />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div>Danh mục</div>
                    <Select
                      size="large"
                      defaultValue="lucy"
                      style={{ width: 250 }}
                      options={[
                        { value: "jack", label: "Jack" },
                        { value: "lucy", label: "Lucy" },
                        { value: "Yiminghe", label: "yiminghe" },
                        {
                          value: "disabled",
                          label: "Disabled",
                          disabled: true,
                        },
                      ]}
                    />
                  </div>
                  <div>
                    <div>Danh mục cấp 2</div>
                    <Select
                      size="large"
                      defaultValue="lucy"
                      style={{ width: 250 }}
                      options={[
                        { value: "jack", label: "Jack" },
                        { value: "lucy", label: "Lucy" },
                        { value: "Yiminghe", label: "yiminghe" },
                        {
                          value: "disabled",
                          label: "Disabled",
                          disabled: true,
                        },
                      ]}
                    />
                  </div>
                  <div>
                    <div>Danh mục cấp 3</div>
                    <Select
                      size="large"
                      defaultValue="lucy"
                      style={{ width: 250 }}
                      options={[
                        { value: "jack", label: "Jack" },
                        { value: "lucy", label: "Lucy" },
                        { value: "Yiminghe", label: "yiminghe" },
                        {
                          value: "disabled",
                          label: "Disabled",
                          disabled: true,
                        },
                      ]}
                    />
                  </div>
                  <div>
                    <div>Giá</div>
                    <Input size="large" className="w-[250px]" />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div>Giảm giá</div>
                    <Input size="large" className="w-[250px]" />
                  </div>
                  <div>
                    <div>Nổi bật</div>
                    <Select
                      size="large"
                      defaultValue="Có"
                      style={{ width: 250 }}
                      options={[
                        { value: "true", label: "Có" },
                        { value: "false", label: "Không" },
                      ]}
                    />
                  </div>
                  <div>
                    <div>Thương hiệu</div>
                    <Input size="large" className="w-[250px]" />
                  </div>
                  <div>
                    <div>Kho</div>
                    <Input size="large" className="w-[250px]" />
                  </div>
                </div>
                <div className="flex items-center ">
                  <div>
                    <div>Kích thước</div>
                    <Select
                      size="large"
                      defaultValue="S"
                      style={{ width: 250 }}
                      options={[
                        { value: "s", label: "S" },
                        { value: "xl", label: "XL" },
                      ]}
                    />
                  </div>
                </div>
                <div>
                  <div>Mô tả sản phẩm</div>
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
                  <div>Upload ảnh</div>
                  <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                  >
                    {fileList.length >= 8 ? null : uploadButton}
                  </Upload>
                  {previewImage && (
                    <Image
                      wrapperStyle={{ display: "none" }}
                      preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) =>
                          !visible && setPreviewImage(""),
                      }}
                      src={previewImage}
                    />
                  )}
                </div>
              </div>
            </Modal>
          </Flex>
        </Flex>
        <div className="flex items-end justify-between">
          <div className=" w-[80%] flex items-end min-h-[60px]">
            <Button
              color="danger"
              variant="solid"
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2"
            >
              <BiFilterAlt />
              Lọc
              {showFilter ? <FaAngleLeft /> : <FaAngleRight />}
            </Button>
            {showFilter && (
              <div className=" ml-4 flex gap-8">
                <div className="flex flex-col gap-1">
                  <div className="font-[500] text-[15px]">Theo danh mục</div>
                  <Select
                    defaultValue="lucy"
                    style={{ width: 120 }}
                    options={[
                      { value: "jack", label: "Jack" },
                      { value: "lucy", label: "Lucy" },
                      { value: "Yiminghe", label: "yiminghe" },
                      { value: "disabled", label: "Disabled", disabled: true },
                    ]}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="font-[500] text-[15px]">
                    Theo danh mục phụ
                  </div>
                  <Select
                    defaultValue="lucy"
                    style={{ width: 120 }}
                    options={[
                      { value: "jack", label: "Jack" },
                      { value: "lucy", label: "Lucy" },
                      { value: "Yiminghe", label: "yiminghe" },
                      { value: "disabled", label: "Disabled", disabled: true },
                    ]}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="font-[500] text-[15px]">
                    Theo danh mục phụ cấp 3
                  </div>

                  <Select
                    defaultValue="lucy"
                    style={{ width: 120 }}
                    options={[
                      { value: "jack", label: "Jack" },
                      { value: "lucy", label: "Lucy" },
                      { value: "Yiminghe", label: "yiminghe" },
                      { value: "disabled", label: "Disabled", disabled: true },
                    ]}
                  />
                </div>
              </div>
            )}
          </div>

          <Input
            size="large"
            status="error"
            style={{ width: "200px" }}
            placeholder="Tìm kiếm..."
            prefix={<MdOutlineSearch />}
          />
        </div>

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 5 }}
        />
      </Flex>
    </div>
  );
}
