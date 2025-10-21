import React, { useContext, useEffect, useState } from "react";
import { Button, Flex, Space, Table } from "antd";
import dayjs from "dayjs";
import { getData } from "../../untils/api";
import { MyContext } from "../../App";
import { useSearchParams } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import AddUserAdmin from "../../components/AddUserAdmin";
import avatar from "../../assets/avatar-user.png";
import EditUserAdmin from "../../components/EditUserAdmin";
import DeleteUserAdmin from "../../components/DeleteUserAdmin";
const columns = [
  { title: "Họ tên", dataIndex: "name" },
  { title: "Quyền", dataIndex: "role" },
  { title: "Ngày tạo", dataIndex: "createdAt" },
  { title: "Hành động", dataIndex: "action" },
];

export default function UserAdmin() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, getUser] = useState([]);
  const context = useContext(MyContext);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const fetchData = async () => {
    try {
      const res = await getData(`/api/userAdmin`);
      if (res.success) {
        getUser(res.data);
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
    fetchData();
  }, []);

  const dataSource = user.map((item) => ({
    key: item._id,
    name: (
      <div className="flex w-[200px] gap-3">
        {item.avatar ? (
          <img
            src={item.avatar}
            alt="user"
            className="w-[25%] rounded-md overflow-hidden"
          />
        ) : (
          <img
            src={avatar}
            alt="default user"
            className="rounded-md w-[36px]"
          />
        )}

        <div className="flex flex-col gap-1 leading-none">
          <div className="font-[500] text-[15px]">{item.name}</div>
          <div>{item.email}</div>
        </div>
      </div>
    ),
    role: item?.role?.title || "Chưa gán quyền",
    createdAt: dayjs(item.createdAt).format("YYYY-MM-DD"),
    action: (
      <Space size="middle">
        <EditUserAdmin
          admin={item}
          onSuccess={() => {
            fetchData();
          }}
        />
        <DeleteUserAdmin
          admin={item}
          onSuccess={() => {
            fetchData();
          }}
        />
      </Space>
    ),
  }));

  return (
    <div className="bg-white p-2 rounded-md shadow-md">
      <div className="px-2 pb-6 text-[18px] font-[600] text-[#ff5252] uppercase">
        Danh sách người người quản lý
      </div>
      <Flex gap="middle" vertical>
        <Flex justify="end" gap="middle" className="mr-8">
          <AddUserAdmin onSuccess={() => fetchData()} />
        </Flex>
        <Table
          columns={columns}
          dataSource={dataSource}
          scroll={{
            x: "max-content", // cho phép scroll ngang khi bảng rộng hơn màn hình
          }}
        />
      </Flex>
    </div>
  );
}
