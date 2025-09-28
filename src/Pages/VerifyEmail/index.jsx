import { Button, Input } from "antd";
import React from "react";
import logo from "../../assets/1750047766437_logo.jpg";
import icon from "../../assets/EmailVerify.png";
import { CiLogin } from "react-icons/ci";
import { RiRegisteredLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import OtpInputs from "../../components/inputOTP";
import { postData } from "../../untils/api";
import { useContext } from "react";
import { MyContext } from "../../App";
export default function VerifyEmail() {
  const navigate = useNavigate();
  const context = useContext(MyContext);
  const [otp, setOtp] = React.useState("");

  const handleComplete = (code) => {
    setOtp(code);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await postData("/api/userAdmin/verifyEmail", {
        email: localStorage.getItem("userEmail"),
        otp: otp,
      });

      // kiểm tra status BE trả về
      if (res.success) {
        context.openAlertBox("success", res.message);
        localStorage.removeItem("userEmail");
        navigate("/register");
      } else {
        context.openAlertBox("error", res.message || "Mã OTP không chính xác!");
      }
    } catch (error) {
      if (error.response) {
        context.openAlertBox("error", error.response.data.message);
      } else {
        context.openAlertBox("error", "Không thể kết nối server!");
      }
    }
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
          <span className="text-[#ff5252]">
            {localStorage.getItem("userEmail")}
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <OtpInputs length={6} onComplete={handleComplete} />
            <Button type="primary" danger size="large" htmlType="submit">
              Xác nhận
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
