import React, { useContext, useEffect, useState } from "react";
import { Button, Flex, Input, Modal, Space, Table, Upload } from "antd";
import AddCategory from "../../components/AddCategory";
import Item from "antd/es/list/Item";

import { MyContext } from "../../App";
import { getData } from "../../untils/api";
import EditCategory from "../../components/EditCategory";
import DeleteCategory from "../../components/DeleteCategory";

const columns = [
  { title: "Hình ảnh", dataIndex: "image" },
  { title: "Tên danh mục", dataIndex: "categoryName" },
  { title: "Hành động", dataIndex: "action" },
];

export default function Category() {
  const context = useContext(MyContext);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getData("/api/category/");
      console.log(res);
      if (res.success) {
        setData(res.data);
        context.setCatData(res.data);
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

  const dataSource = context.catData?.map((item, index) => ({
    key: item._id || index,
    image: <img src={item.images} className="w-[20%]" />,
    categoryName: item.name,
    action: (
      <Space size="middle">
        <EditCategory
          category={item} // truyền toàn bộ object category
          onSuccess={(updatedCategory) => {
            setData((prev) =>
              prev.map((cat) =>
                cat._id === updatedCategory._id ? updatedCategory : cat
              )
            );
          }}
        />
        <DeleteCategory category={item} onSuccess={() => fetchData()} />
      </Space>
    ),
  }));

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div className="bg-white p-2 rounded-md shadow-md">
      <div className="px-2 pb-6 text-[18px] font-[600] text-[#ff5252]">
        Danh mục sản phẩm
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

            {hasSelected ? `Chọn ${selectedRowKeys.length} danh mục` : null}
          </div>

          <AddCategory
            onSuccess={(newCategory) => {
              setData((prev) => [...prev, newCategory]); //thêm trực tiếp vào danh sách
            }}
          />
        </Flex>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataSource}
          loading={loading}
        />
      </Flex>
    </div>
  );
}
