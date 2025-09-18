import React from "react";
import { Space, Table, Tag } from "antd";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
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
const data = [
  {
    role: "Admin chính",
    description: "Có quyền thực hiện mọi chức năng",
    action: (
      <Space size="middle">
        <CiEdit className="text-[16px]" />
        <RiDeleteBinLine className="text-[16px]" />
      </Space>
    ),
  },
  {
    role: "Admin phụ",
    description: "Có quyền thực hiện các chức năng được phân quyền",
    action: (
      <Space size="middle">
        <CiEdit className="text-[16px]" />
        <RiDeleteBinLine className="text-[16px]" />
      </Space>
    ),
  },
  {
    role: "Cộng tác viên",
    description: "Có quyền thực hiện các chức năng được phân quyền",
    action: (
      <Space size="middle">
        <CiEdit className="text-[16px]" />
        <RiDeleteBinLine className="text-[16px]" />
      </Space>
    ),
  },
];
const Role = () => <Table columns={columns} dataSource={data} />;
export default Role;
