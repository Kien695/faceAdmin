import { Button, Input, Spin } from "antd";
import React, { useContext, useRef } from "react";
import logo from "../../assets/1750047766437_logo.jpg";
import icon from "../../assets/icon.svg";
import { CiLogin } from "react-icons/ci";
import { RiRegisteredLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { postData } from "../../untils/api";
import { MyContext } from "../../App";
export default function Register() {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const inputRefs = {
    name: useRef(),
    email: useRef(),
    password: useRef(),
  };
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formInput, setFormInput] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formInput.name == "") {
      context.openAlertBox("error", "Vui lòng nhập họ tên!");
      inputRefs.name.current.focus();
      setLoading(false);
      return;
    }
    if (formInput.email == "") {
      context.openAlertBox("error", "Vui lòng nhập email!");
      inputRefs.email.current.focus();
      setLoading(false);
      return;
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formInput.email)) {
      context.openAlertBox("error", "Email không đúng định dạng!");
      inputRefs.email.current.focus();
      setLoading(false);
      return;
    }
    if (formInput.password == "") {
      context.openAlertBox("error", "Vui lòng nhập mật khẩu");
      inputRefs.password.current.focus();
      setLoading(false);
      return;
    }
    // Regex password
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[{\]};:'",.<>/?\\|]).{8,}$/;

    if (!passwordRegex.test(formInput.password)) {
      context.openAlertBox(
        "error",
        "Mật khẩu phải ≥ 8 ký tự, gồm 1 chữ hoa, 1 số và 1 ký tự đặc biệt",
      );
      inputRefs.password.current.focus();
      setLoading(false);
      return;
    }
    try {
      const res = await postData("/api/userAdmin/register", formInput);
      if (res.success) {
        context.openAlertBox("success", res?.message);
        localStorage.setItem("userEmail", formInput.email);
        setFormInput({ name: "", email: "", password: "" });
        navigate("/verify-email");
      }
    } catch (error) {
      context.openAlertBox("error", error.response.data.message);
    } finally {
      setLoading(false); // luôn chạy
    }
  };
  return (
    <div className="p-5 mb-6">
      <div className="flex md:flex-row flex-col md:gap-0 gap-4 items-center justify-between">
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
          <div className="text-center md:text-[27px] text-[22px]">
            Xin chào!{" "}
          </div>
          <div className="text-center md:text-[25px] text-[20px]">
            {" "}
            Hãy tham gia cùng chúng tôi ngay hôm nay
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <div>
              <div>Họ tên</div>
              <Input
                name="name"
                ref={inputRefs.name}
                className="w-[400px] mt-1"
                size="large"
                placeholder="Nhập họ tên"
                onChange={handleInput}
              />
            </div>
            <div>
              <div>Email</div>
              <Input
                className="w-[400px] mt-1"
                name="email"
                ref={inputRefs.email}
                size="large"
                placeholder="Nhập email"
                onChange={handleInput}
              />
            </div>
            <div>
              <div>Mật khẩu</div>
              <Input.Password
                className="w-[400px] mt-1"
                size="large"
                ref={inputRefs.password}
                name="password"
                placeholder="Nhập mật khẩu"
                onChange={handleInput}
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
            <Button
              type="primary"
              danger
              size="large"
              htmlType="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="flex gap-2">
                  <Spin /> Đang xử lí...
                </div>
              ) : (
                "Đăng kí"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
