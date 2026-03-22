import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/images.jfif";
import brand from "../../assets/images.png";

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
import { FaTrashCanArrowUp, FaUserGroup } from "react-icons/fa6";
import { IoBagCheckOutline, IoLogoBuffer } from "react-icons/io5";
import { CgLogOut } from "react-icons/cg";
import LogoInfo from "../../components/LogoInfo";
import { TfiControlEject } from "react-icons/tfi";
import { MyContext } from "../../App";
import { postData } from "../../untils/api";
import { RiAdminLine } from "react-icons/ri";
const { Header, Sider, Content } = Layout;
const App = () => {
  const context = useContext(MyContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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
        },
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
    context?.userData?.role?.permissions.includes("product_view") && {
      key: "/products",
      icon: <FaProductHunt />,
      label: "Sản phẩm",
    },

    context?.userData?.role?.permissions.includes("category_view") && {
      label: "Danh mục",
      icon: <MdOutlineCategory />,
      children: [
        { key: "/categories", label: "Danh mục chính" },
        { key: "/subCategories", label: "Danh mục phụ" },
      ],
    },
    context?.userData?.role?.permissions.includes("user_view") && {
      key: "/users",
      icon: <FaUserGroup />,
      label: "Khách hàng",
    },
    context?.userData?.role?.permissions.includes("userAdmin_view") && {
      key: "/userAdmin",
      icon: <RiAdminLine />,
      label: "Người quản lí",
    },
    context?.userData?.role?.permissions.includes("view_order") && {
      key: "/orders",
      icon: <IoBagCheckOutline />,
      label: "Đơn hàng",
    },
    context?.userData?.role?.permissions.includes("banner_view") && {
      key: "8",
      label: "Banner",
      icon: <PiSlideshowFill />,
      children: [
        { key: "/bannerHome", label: "Banner home" },
        { key: "/bannerList", label: "Banner list " },
      ],
    },
    context?.userData?.role?.permissions.includes("blog_view") && {
      key: "/blogs",
      icon: <FaBlogger />,
      label: "Blogs",
    },
    context?.userData?.role?.permissions.includes("notification_view") && {
      key: "/notifications",
      icon: <FaRegBell />,
      label: "Thông báo",
    },
    { key: "/logo", icon: <IoLogoBuffer />, label: "Logo cửa hàng" },

    { key: "/trash", icon: <FaTrashCanArrowUp />, label: "Thùng rác" },
    context?.userData?.role?.permissions.includes("role_view") && {
      key: "/roles",
      icon: <TfiControlEject />,
      label: "Nhóm quyền",
    },
    context?.userData?.role?.permissions.includes("permission_view") && {
      key: "/permission",
      icon: <FaCriticalRole />,
      label: "Phân quyền",
    },
    {
      key: "15",
      icon: <CgLogOut />,
      label: "Đăng xuất",
      onClick: handleLogout,
    },
  ];
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = collapsed ? "auto" : "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [collapsed, isMobile]);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        width={240}
        collapsed={collapsed}
        theme="light"
        breakpoint="lg"
        collapsedWidth={isMobile ? 0 : 80}
        onBreakpoint={(broken) => {
          setIsMobile(broken);
          setCollapsed(broken); // tự ẩn khi mobile
        }}
        style={{
          borderRight: "1px solid #e5e7eb",
          position: isMobile ? "fixed" : "relative",

          zIndex: 1000,
          height: isMobile ? "100vh" : "100%",
          background: "white",
          overflowY: isMobile ? "scroll" : "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          overflowX: "hidden",
        }}
      >
        <div className="flex flex-col items-center gap-6 pt-2">
          <img
            src={collapsed ? logo : brand}
            className={
              collapsed ? "h-12 w-[60px] rounded-lg" : "h-12 w-[150px]"
            }
          />
          <Menu
            defaultSelectedKeys={["1"]}
            selectedKeys={[location.pathname]}
            onClick={(e) => {
              navigate(e.key);
              if (isMobile) setCollapsed(true); // auto đóng khi chọn menu
            }}
            mode="inline"
            items={item1s}
            style={{ paddingBottom: "40px" }}
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
          {isMobile && !collapsed && (
            <div
              onClick={() => setCollapsed(true)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.3)",
                zIndex: 999,
              }}
            />
          )}
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
