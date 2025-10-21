import React, { useContext, useEffect } from "react";
import avatar from "../../assets/avatar-user.png";
import { Button, Dropdown, Space } from "antd";
import { CgLogOut } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import { MyContext } from "../../App";
import { postData } from "../../untils/api";
import { Link, useNavigate } from "react-router-dom";

export default function LogoInfo() {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await postData(
        `/api/userAdmin/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.success) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        context.openAlertBox("success", res?.message || "Đăng xuất thành công");
        context.setIsLogin(false);
        context.setUserData(null);
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        context.openAlertBox("error", error.response.data.message);
      } else {
        context.openAlertBox("error", "Đăng xuất không thành công");
      }
    }
  };
  const items = [
    {
      key: "1",
      label: (
        <div className="">
          <div className="flex items-center gap-2">
            {context?.userData?.avatar ? (
              <img
                src={context?.userData?.avatar}
                alt="avatar"
                className="w-4 h-4 rounded-full"
              />
            ) : (
              <img
                src={avatar}
                alt="default user"
                className="rounded-md w-[16px]"
              />
            )}

            <span className="text-[14px] font-[600]">
              {context?.userData?.name}
            </span>
          </div>
          <span className="text-[12px]">{context?.userData?.email}</span>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      icon: <FaRegUser />,
      label: <Link to="/profile">Thông tin cá nhân</Link>,
    },
    {
      key: "3",
      icon: <CgLogOut />,
      label: "Đăng xuất",
      onClick: handleLogout,
    },
  ];
  return (
    <Dropdown
      menu={{ items }}
      placement="bottomRight"
      arrow
      trigger={["click"]}
    >
      <div>
        {context?.userData?.avatar ? (
          <img
            src={context?.userData?.avatar}
            alt=""
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <img
            src={avatar}
            alt="default user"
            className="rounded-md w-[28px]"
          />
        )}
      </div>
    </Dropdown>
  );
}
