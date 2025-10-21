import React, { useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useContext } from "react";
import { MyContext } from "../../App";
import { getData, postData, putData } from "../../untils/api";
import { Button, Input, Select, Spin } from "antd";
import { MdDriveFolderUpload } from "react-icons/md";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

export default function MyAccount() {
  const context = useContext(MyContext);
  const [preview, setPreview] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [provinces, setProvinces] = React.useState([]);
  const [districts, setDistricts] = React.useState([]);
  const [wards, setWards] = React.useState([]);
  const [selectedProvince, setSelectedProvince] = React.useState(null);
  const [selectedDistrict, setSelectedDistrict] = React.useState(null);
  const [selectedWard, setSelectedWard] = React.useState(null);
  const [formInput, setFormInput] = React.useState({
    name: "",
    mobile: "",
    dateOfBirth: "",
    province: "",
    district: "",
    ward: "",
  });
  useEffect(() => {
    if (context?.userData) {
      setFormInput({
        name: context.userData.name || "",
        mobile: context.userData.mobile || "",
        dateOfBirth: context.userData.dateOfBirth || "",
        province: context.userData.province || "",
        district: context.userData.district || "",
        ward: context.userData.ward || "",
      });
    }
  }, [context?.userData]);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleUpload = async (file) => {
    try {
      // tạo preview để show ngay
      setPreview(URL.createObjectURL(file));
      setLoading(true);

      const formData = new FormData();
      formData.append("avatar", file);

      const response = await postData("/api/userAdmin/user-avatar", formData);

      if (response && response._id) {
        // update thẳng context luôn, khỏi gọi lại API get user detail
        context.setUserData((prev) => ({
          ...prev,
          avatar: response.avatar,
        }));

        // Reset preview để quay lại dùng avatar từ DB
        setPreview(null);
        context.openAlertBox("success", "Cập nhật avatar thành công");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      context.openAlertBox("error", "Upload thất bại");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // lấy tỉnh
    axios
      .get("https://provinces.open-api.vn/api/v1/?depth=1")
      .then((res) => {
        setProvinces(res.data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      // lấy quận/huyện cho tỉnh đã chọn
      axios
        .get(
          `https://provinces.open-api.vn/api/v1/p/${selectedProvince}?depth=2`
        )
        .then((res) => {
          setDistricts(res.data.districts || []);
          setWards([]); // reset ward
        })
        .catch(console.error);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      // lấy phường/xã
      axios
        .get(
          `https://provinces.open-api.vn/api/v1/d/${selectedDistrict}?depth=2`
        )
        .then((res) => {
          setWards(res.data.wards || []);
        })
        .catch(console.error);
    }
  }, [selectedDistrict]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await putData(
        `/api/userAdmin/${context?.userData?._id}`,
        formInput,
        {
          withCredentials: true,
        }
      );
      if (res.success) {
        context.openAlertBox("success", res.message);
      } else {
        context.openAlertBox("error", res.message);
      }
    } catch (error) {
      if (error.response) {
        context.openAlertBox("error", error.response.data.message);
      }
      throw error;
    }
  };

  return (
    <div className="flex justify-center py-4 px-2">
      <div className="w-full max-w-[850px] rounded-md shadow-lg border border-gray-300 bg-white p-4 flex flex-col gap-5">
        {/* Tiêu đề */}
        <div className="text-center text-[20px] sm:text-[22px] text-[#ff5252] font-semibold uppercase mb-3">
          Thông tin cá nhân
        </div>

        <hr />

        <div className="flex flex-col sm:flex-row mt-5 gap-5">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-2 sm:w-[22%] border-b sm:border-b-0 sm:border-r border-gray-400 pb-4 sm:pb-0">
            <div className="relative w-[100px] h-[100px]">
              <img
                src={preview || context?.userData?.avatar}
                alt="avatar"
                className="w-full h-full rounded-full object-cover"
              />
              {loading ? (
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.7)] rounded-full flex items-center justify-center z-50">
                  <Spin />
                </div>
              ) : (
                <label className="absolute inset-0 bg-[rgba(0,0,0,0.0)] hover:bg-[rgba(0,0,0,0.7)] rounded-full flex items-center justify-center cursor-pointer transition-all opacity-100">
                  <MdDriveFolderUpload className="text-white text-[25px]" />
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) =>
                      e.target.files?.[0] && handleUpload(e.target.files[0])
                    }
                  />
                </label>
              )}
            </div>
            <div className="text-[#ff5252] font-bold text-[16px]">
              Admin chính
            </div>
          </div>

          {/* Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Họ tên */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-3">
                <div>Họ tên:</div>
                <Input
                  value={formInput.name}
                  name="name"
                  size="large"
                  className="w-full sm:w-[78%]"
                  onChange={handleInput}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-3">
                <div>Email:</div>
                <Input
                  disabled
                  value={context?.userData?.email}
                  size="large"
                  className="w-full sm:w-[78%]"
                />
              </div>

              {/* Số điện thoại */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-3">
                <div>Số điện thoại:</div>
                <PhoneInput
                  defaultCountry="ua"
                  name="mobile"
                  value={formInput.mobile}
                  onChange={(value) =>
                    setFormInput((prev) => ({ ...prev, mobile: value }))
                  }
                  className="w-full sm:w-[78%]"
                />
              </div>

              {/* Ngày sinh */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-3">
                <div>Ngày sinh:</div>
                <Input
                  type="date"
                  name="dateOfBirth"
                  value={
                    formInput.dateOfBirth
                      ? dayjs(formInput.dateOfBirth).format("YYYY-MM-DD")
                      : ""
                  }
                  size="large"
                  className="w-full sm:w-[78%]"
                  onChange={handleInput}
                />
              </div>

              {/* Ngày tạo tài khoản */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-3">
                <div>Ngày tạo tài khoản:</div>
                <Input
                  value={
                    context?.userData?.createdAt
                      ? dayjs(context?.userData?.createdAt).format("YYYY-MM-DD")
                      : ""
                  }
                  disabled
                  size="large"
                  className="w-full sm:w-[78%]"
                />
              </div>

              {/* Quê quán */}
              <div className="flex flex-col gap-2">
                <div>Quê quán:</div>
                <div className="flex flex-col sm:flex-row sm:gap-2 gap-3">
                  <Select
                    placeholder="Chọn tỉnh/thành phố"
                    value={formInput.province}
                    onChange={(value, option) => {
                      setFormInput({ ...formInput, province: option.label });
                      setSelectedProvince(value);
                    }}
                    options={provinces.map((p) => ({
                      value: p.code,
                      label: p.name,
                    }))}
                    className="w-full sm:w-[200px]"
                  />
                  <Select
                    placeholder="Chọn quận/huyện"
                    value={formInput.district}
                    onChange={(value, option) => {
                      setFormInput({ ...formInput, district: option.label });
                      setSelectedDistrict(value);
                    }}
                    options={districts.map((d) => ({
                      value: d.code,
                      label: d.name,
                    }))}
                    className="w-full sm:w-[200px]"
                  />
                  <Select
                    placeholder="Chọn phường/xã"
                    value={formInput.ward}
                    onChange={(value, option) =>
                      setFormInput({ ...formInput, ward: option.label })
                    }
                    options={wards.map((w) => ({
                      value: w.code,
                      label: w.name,
                    }))}
                    className="w-full sm:w-[200px]"
                  />
                </div>
              </div>

              {/* Button submit */}
              <div className="flex justify-center mt-4">
                <Button
                  size="large"
                  htmlType="submit"
                  type="primary"
                  danger
                  className="w-full sm:w-[200px] bg-gray-500 shadow-lg shadow-gray-500/50"
                >
                  Lưu thay đổi
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
