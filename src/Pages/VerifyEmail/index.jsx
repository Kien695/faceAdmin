import { Button, Input } from "antd";
import React from "react";
import logo from "../../assets/1750047766437_logo.jpg";
import icon from "../../assets/EmailVerify.png";
import { CiLogin } from "react-icons/ci";
import { RiRegisteredLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import OtpInputs from "../../components/inputOTP";
export default function VerifyEmail() {
  const [otp, setOtp] = React.useState("");
  const handleComplete = (code) => {
    setOtp(code);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("OTP nhập:", otp);
    // call API xác minh OTP ở đây
  };
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
        <div className="flex flex-col items-center">
          <img src={icon} alt="" className="w-[200px]" />
          <div className=" items-center  text-[30px] font-bold">
            <div> Vui lòng nhập mã OTP</div>
          </div>
        </div>
        <div className="text-[14px]">
          Mã OTP vừa gửi đến:{" "}
          <span className="text-[#ff5252]">dp1.1a2kien@gmail.com</span>
        </div>

        <form action="">
          <div className="flex flex-col gap-5">
            <OtpInputs length={6} onComplete={handleComplete} />
            <Button type="primary" danger size="large">
              Xác nhận
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
