import React, { useContext, useEffect, useState } from "react";
import { Button, Flex, Space, Table, Tag } from "antd";
import { RiDeleteBinLine } from "react-icons/ri";

import AddRole from "../../components/AddRole";
import { getData } from "../../untils/api";
import { MyContext } from "../../App";
import EditRole from "../../components/EditRole";
import DeleteRole from "../../components/DeleteRole";
const columns = [
  {
    title: "Nhóm quyền",
    dataIndex: "role",
  },
  {
    title: "Mô tả ngắn",
    dataIndex: "description",
  },
  {
    title: "Hành động",
    dataIndex: "action",
  },
];

export default function Role() {
  const [dataRole, setData] = useState([]);
  const context = useContext(MyContext);
  const fetChData = async (e) => {
    try {
      const res = await getData("/api/role/");
      if (res.success) {
        setData(res.data);
      }
    } catch (error) {
      if (error.response) {
        context.openAlertBox("error", error.response.data.message);
      } else {
        context.openAlertBox("error", "Không thể kết nối server!");
      }
    }
  };
  useEffect(() => {
    fetChData();
  }, []);
  const data = dataRole.map((item) => ({
    key: item._id,
    role: item.title,
    description: (
      <div
        className="line-clamp-3"
        dangerouslySetInnerHTML={{ __html: item.description || "" }}
      />
    ),
    action: (
      <Space size="middle">
        <EditRole role={item} onSuccess={() => fetChData()} />
        <DeleteRole role={item} onSuccess={() => fetChData()} />
      </Space>
    ),
  }));
  return (
    <div className="bg-white p-2 rounded-md shadow-md">
      <div className="px-2 pb-6 text-[18px] font-[600] text-[#ff5252]">
        Danh sách nhóm quyền
      </div>
      <Flex gap="middle" vertical>
        <AddRole onSuccess={() => fetChData()} />
        <Table columns={columns} dataSource={data} />;
      </Flex>
    </div>
  );
}
