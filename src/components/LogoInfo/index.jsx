import React from "react";
import logoUser from "../../assets/avatar-user.png";

import { Button, Dropdown, Space } from "antd";
import { CgLogOut } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
const items = [
  {
    key: "1",
    label: (
      <div className="">
        <div className="flex items-center gap-2">
          <img src={logoUser} alt="avatar" className="w-4 h-4 rounded-full" />
          <span className="text-[14px] font-[600]">Tấn Kiên</span>
        </div>
        <span className="text-[12px]">dp1.1a2kien@gmail.com</span>
      </div>
    ),
  },
  {
    type: "divider",
  },
  {
    key: "2",
    icon: <FaRegUser />,
    label: "Thông tin cá nhân",
  },
  {
    key: "15",
    icon: <CgLogOut />,
    label: "Đăng xuất",
  },
];
export default function LogoInfo() {
  return (
    <Dropdown menu={{ items }} placement="bottomRight" arrow>
      <div>
        <img src={logoUser} alt="" className="w-8 h-8 rounded-full" />
      </div>
    </Dropdown>
  );
}
