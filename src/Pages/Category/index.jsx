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
  useEffect(() => {
    fetchData();
  }, []);

  const dataSource = data.map((item, index) => ({
    key: item._id || index,
    image: <img src={item.images} className="w-[20%]" />,
    categoryName: item.name,
    action: (
      <Space size="middle">
        <EditCategory
          category={item} // truyền toàn bộ object category
          onSuccess={() => {
            fetchData();
          }}
        />
        <DeleteCategory category={item._id} onSuccess={() => fetchData()} />
      </Space>
    ),
  }));

  return (
    <div className="bg-white p-2 rounded-md shadow-md">
      <div className="px-2 pb-6 text-[18px] font-[600] text-[#ff5252] uppercase">
        Danh mục sản phẩm
      </div>
      <Flex gap="middle" vertical>
        <Flex align="center" justify="end" gap="middle" className="px-5">
          <AddCategory
            onSuccess={(newCategory) => {
              setData((prev) => [...prev, newCategory]); //thêm trực tiếp vào danh sách
            }}
          />
        </Flex>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          scroll={{
            x: "max-content", // cho phép scroll ngang khi bảng rộng hơn màn hình
          }}
        />
      </Flex>
    </div>
  );
}
