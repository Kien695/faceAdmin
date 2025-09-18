import { Button, Input } from "antd";
import React from "react";
import logo from "../../assets/1750047766437_logo.jpg";
import icon from "../../assets/icon.svg";
import { CiLogin } from "react-icons/ci";
import { RiRegisteredLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
export default function Register() {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  return (
    <div className="p-5 mb-6">
      <div className="flex items-center justify-between">
        <img src={logo} alt="" />
        <div className="flex gap-5">
          <NavLink to="/login">
            {({ isActive }) => (
              <Button type="dashed" danger={isActive}>
                <CiLogin />
                Đăng nhập
              </Button>
            )}
          </NavLink>
          <NavLink to="/register">
            {({ isActive }) => (
              <Button type="dashed" danger={isActive}>
                <RiRegisteredLine />
                Đăng kí
              </Button>
            )}
          </NavLink>
        </div>
      </div>

      <div className="flex flex-col items-center gap-5 mt-6 ">
        <img src={icon} alt="" className="w-[50px]" />
        <div className="flex flex-col items-center leading-tight text-[30px] font-bold">
          <div>Xin chào! </div>
          <div> Hãy tham gia cùng chúng tôi ngay hôm nay</div>
        </div>

        <Button
          size="large"
          type="primary"
          ghost
          danger
          className="w-[300px] text-[18px] !text-black font-[400] items-center flex"
        >
          Tiếp tục với google <FcGoogle className="!text-[25px]" />
        </Button>
        <div className="flex items-center w-[400px]">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-500 text-sm">HOẶC</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <form action="">
          <div className="flex flex-col gap-3">
            <div>
              <div>Họ tên</div>
              <Input
                className="w-[400px] mt-1"
                size="large"
                placeholder="Nhập họ tên"
              />
            </div>
            <div>
              <div>Email</div>
              <Input
                className="w-[400px] mt-1"
                size="large"
                placeholder="Nhập email"
              />
            </div>
            <div>
              <div>Mật khẩu</div>
              <Input.Password
                className="w-[400px] mt-1"
                size="large"
                placeholder="Nhập mật khẩu"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </div>

            <div className="flex text-[14px]  items-center justify-between">
              <div>Bạn đã có tài khoản?</div>
              <Link to="/login" className="font-[600]">
                Đăng nhập
              </Link>
            </div>
            <Button type="primary" danger size="large">
              Đăng kí
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
