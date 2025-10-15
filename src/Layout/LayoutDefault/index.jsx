import React, { useContext, useState } from "react";
import logo from "../../assets/images.jfif";
import brand from "../../assets/1750047766437_logo.jpg";

import "./style.css";
import {
  FaBlogger,
  FaCriticalRole,
  FaProductHunt,
  FaRegBell,
} from "react-icons/fa";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { MdOutlineCategory, MdOutlineDashboard } from "react-icons/md";
import { PiSlideshowFill } from "react-icons/pi";
import { Badge, Button, Dropdown, Layout, Menu, theme } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaUserGroup } from "react-icons/fa6";
import { IoBagCheckOutline, IoLogoBuffer } from "react-icons/io5";
import { CgLogOut } from "react-icons/cg";
import LogoInfo from "../../components/LogoInfo";
import { TfiControlEject } from "react-icons/tfi";
import { MyContext } from "../../App";
import { postData } from "../../untils/api";
const { Header, Sider, Content } = Layout;
const App = () => {
  const context = useContext(MyContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      ),
    },
  ];
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
  const item1s = [
    {
      key: "/",
      icon: <MdOutlineDashboard />,
      label: "Trang chủ",
    },
    {
      key: "/products",
      icon: <FaProductHunt />,
      label: "Sản phẩm",
    },

    {
      label: "Danh mục",
      icon: <MdOutlineCategory />,
      children: [
        { key: "/categories", label: "Danh mục chính" },
        { key: "/subCategories", label: "Danh mục phụ" },
      ],
    },
    { key: "/users", icon: <FaUserGroup />, label: "Người dùng" },
    { key: "/orders", icon: <IoBagCheckOutline />, label: "Đơn hàng" },
    {
      key: "8",
      label: "Banner",
      icon: <PiSlideshowFill />,
      children: [
        { key: "/bannerHome", label: "Banner home" },
        { key: "/bannerListOne", label: "Banner list 1" },
        { key: "/bannerListTwo", label: "Banner list 2" },
      ],
    },
    { key: "/blogs", icon: <FaBlogger />, label: "Blogs" },
    { key: "/logo", icon: <IoLogoBuffer />, label: "Logo cửa hàng" },
    { key: "/roles", icon: <TfiControlEject />, label: "Nhóm quyền" },
    { key: "/permission", icon: <FaCriticalRole />, label: "Phân quyền" },
    {
      key: "15",
      icon: <CgLogOut />,
      label: "Đăng xuất",
      onClick: handleLogout,
    },
  ];
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        width={280}
        collapsed={collapsed}
        theme="light"
        style={{
          borderRight: "1px solid #e5e7eb", // màu xám nhạt kiểu Tailwind border-gray-200
        }}
      >
        <div className="flex flex-col items-center gap-6 pt-2">
          <img
            src={collapsed ? logo : brand}
            className={collapsed ? "h-12 w-[60px]" : "h-12 w-[200px]"}
          />
          <Menu
            defaultSelectedKeys={["1"]}
            selectedKeys={[location.pathname]}
            onClick={(e) => navigate(e.key)}
            mode="inline"
            items={item1s}
          />
        </div>
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 18, width: 66, height: 66 }}
          />
          <div className="pr-8 flex items-center gap-8">
            <Dropdown
              menu={{ items, style: { padding: "10px" } }}
              placement="bottom"
            >
              <Badge count={4} size="small">
                <FaRegBell className="text-[22px]" />
              </Badge>
            </Dropdown>
            <LogoInfo />
          </div>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
