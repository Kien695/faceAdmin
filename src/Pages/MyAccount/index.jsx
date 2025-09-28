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
    <div className="flex justify-center py-4">
      <div className="flex gap-10">
        <div className="w-[850px] rounded-md shadow-lg border border-2 borer-gray-300 bg-white px-2 py-4">
          <div className="text-[20px] text-[#ff5252] font-[600] mb-3 text-center">
            Thông tin cá nhân
          </div>

          <hr />
          <div className="flex mt-5 ">
            <div className="w-[22%] border-r border-gray-400 flex flex-col items-center justify-center gap-2">
              <div className="relative w-[100px] h-[100px]">
                <img
                  src={preview ? preview : context?.userData?.avatar}
                  alt="avatar"
                  className="w-full h-full rounded-full object-cover"
                />

                {loading ? (
                  <div
                    className="overlay rounded-full absolute top-0 left-0 w-full h-full
                          z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center
                          cursor-pointer  transition-all opacity-80"
                  >
                    <Spin />
                  </div>
                ) : (
                  <div
                    className="overlay rounded-full absolute top-0 left-0 w-full h-full
                          z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center
                          cursor-pointer opacity-0 transition-all hover:opacity-80"
                  >
                    <MdDriveFolderUpload className="text-white text-[25px]" />
                    <input
                      type="file"
                      accept="image/*"
                      name="avatar"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleUpload(e.target.files[0]);
                        }
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="text-[#ff5252] font-[700] text-[16px]">
                Admin chính
              </div>
            </div>

            <div className="flex-1">
              <form onSubmit={handleSubmit}>
                <div className=" flex flex-col gap-4 px-5 ">
                  <div className="flex gap-3 justify-between">
                    <div className="flex items-end">Họ tên:</div>
                    <Input
                      value={formInput.name}
                      type="text"
                      name="name"
                      size="large"
                      style={{ width: "78%" }}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="flex gap-3 justify-between">
                    <div className="flex items-end">Email:</div>
                    <Input
                      disabled
                      value={context?.userData?.email}
                      style={{ width: "78%" }}
                      size="large"
                    />
                  </div>

                  <div className="flex gap-12">
                    <div className="flex items-end">Số điện thoại: </div>
                    <PhoneInput
                      defaultCountry="ua"
                      name="mobile"
                      value={formInput.mobile}
                      onChange={(value) =>
                        setFormInput((prev) => ({
                          ...prev,
                          mobile: value, // trực tiếp gán value
                        }))
                      }
                    />
                  </div>
                  <div className="flex gap-3 justify-between">
                    <div className="flex items-end">Ngày sinh: </div>
                    <Input
                      value={
                        formInput.dateOfBirth
                          ? dayjs(formInput.dateOfBirth).format("YYYY-MM-DD")
                          : ""
                      }
                      name="dateOfBirth"
                      style={{ width: "78%" }}
                      type="date"
                      size="large"
                      onChange={handleInput}
                    />
                  </div>
                  <div className="flex gap-3 justify-between">
                    <div className="flex items-end">Ngày tạo tài khoản: </div>
                    <Input
                      value={
                        context?.userData?.createdAt
                          ? dayjs(context?.userData?.createdAt).format(
                              "YYYY-MM-DD"
                            )
                          : ""
                      }
                      style={{ width: "78%" }}
                      disabled
                      size="large"
                    />
                  </div>
                  <div>
                    <div className="mb-2">Quê quán: </div>
                    <div className="flex gap-2">
                      <Select
                        style={{ width: 200 }}
                        placeholder="Chọn tỉnh/thành phố"
                        value={formInput.province} // gắn value vào state
                        onChange={(value, option) => {
                          setFormInput({
                            ...formInput,

                            province: option.label, // để lưu tên
                          });
                          setSelectedProvince(value); // fetch quận/huyện theo code
                        }}
                        options={provinces.map((p) => ({
                          value: p.code,
                          label: p.name,
                        }))}
                      />

                      <Select
                        style={{ width: 200 }}
                        placeholder="Chọn quận/huyện"
                        value={formInput.district}
                        onChange={(value, option) => {
                          setFormInput({
                            ...formInput,

                            district: option.label,
                          });
                          setSelectedDistrict(value);
                        }}
                        options={districts.map((d) => ({
                          value: d.code,
                          label: d.name,
                        }))}
                      />

                      <Select
                        style={{ width: 200 }}
                        placeholder="Chọn phường/xã"
                        value={formInput.ward}
                        onChange={(value, option) => {
                          setFormInput({
                            ...formInput,

                            ward: option.label,
                          });
                        }}
                        options={wards.map((w) => ({
                          value: w.code,
                          label: w.name,
                        }))}
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      size="large"
                      htmlType="submit"
                      type="primary"
                      danger
                      className="bg-gray-500 shadow-lg shadow-gray-500/50 w-[200px]"
                    >
                      Lưu thay đổi
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
