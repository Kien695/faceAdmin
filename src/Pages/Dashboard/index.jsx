import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import image from "../../assets/shop-illustration.webp";
import { Button, Select } from "antd";
import { FaUsers } from "react-icons/fa";
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";
import { IoStatsChart } from "react-icons/io5";
import { TiShoppingCart } from "react-icons/ti";
import { FaProductHunt } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { Column } from "@ant-design/plots";
export default function Dashboard() {
  const [isOpenCart, setIsOpenCart] = React.useState(null);
  const showOpenCart = (index) => {
    if (isOpenCart === index) {
      setIsOpenCart(null);
    } else {
      setIsOpenCart(index);
    }
  };
  const itemsChat = [
    {
      name: "Doanh số",
      Month: "Tháng 1",
      value: 9000000,
    },
    {
      name: "Doanh số",
      Month: "Tháng 2",
      value: 2880000,
    },
    {
      name: "Doanh số",
      Month: "Tháng 3",
      value: 3930000,
    },
    {
      name: "Doanh số",
      Month: "Tháng 4",
      value: 8140000,
    },
    {
      name: "Doanh số",
      Month: "Tháng 5",
      value: 4700000,
    },
    {
      name: "Doanh số",
      Month: "Tháng 6",
      value: 2030000,
    },
    {
      name: "Doanh số",
      Month: "Tháng 7",
      value: 2400000,
    },
    {
      name: "Doanh số",
      Month: "Tháng 8",
      value: 3560000,
    },
    {
      name: "Doanh số",
      Month: "Tháng 9",
      value: 1240000,
    },
    {
      name: "Doanh số",
      Month: "Tháng 10",
      value: 2320000,
    },
    {
      name: "Doanh số",
      Month: "Tháng 11",
      value: 3450000,
    },
    {
      name: "Doanh số",
      Month: "Tháng 12",
      value: 3400000,
    },
  ];
  const config = {
    data: itemsChat,
    xField: "Month",
    yField: "value",
    colorField: "name",
    group: true,
    style: {
      inset: 5,
    },
  };
  return (
    <>
      <div className="flex items-center border border-1 border-gray-200 p-6 rounded-lg shadow-md bg-[#f1faff]">
        <div className="w-[80%] flex flex-col gap-4 pl-8">
          <div className="font-bold text-[30px] leading-tight">
            Xin chào, <br />
            <span className="text-[#ff5252]">Tấn Kiên</span>
          </div>

          <div className="text-[18px]">
            Dưới đấy là số thiệu thống kê của của cửa hàng bạn
          </div>
          <Button
            type="primary"
            className="w-1/5 mt-2 flex items-center justify-center"
          >
            + Thêm sản phẩm
          </Button>
        </div>
        <div className="w-[20%]">
          <img src={image} alt="" className="w-full" />
        </div>
      </div>
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper mt-5"
      >
        <SwiperSlide>
          <Link>
            <div className="flex gap-2 shadow-lg hover:bg-[#289974] items-center justify-between bg-green-600 rounded-md text-[white] px-2 py-8">
              <div className="flex items-center gap-3">
                <FaUsers className="text-[30px]" />
                <div className="flex flex-col  gap-1 text-[18px] ">
                  <div>Tổng người dùng</div>
                  <span className="font-bold">200</span>
                </div>
              </div>
              <IoStatsChart className="text-[30px] " />
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link>
            <div className="flex gap-2 shadow-lg items-center justify-between bg-red-600 hover:bg-[#ff1522] rounded-md text-[white] px-2 py-8">
              <div className="flex items-center gap-3">
                <TiShoppingCart className="text-[30px]" />
                <div className="flex flex-col  gap-1 text-[18px] ">
                  <div>Tổng đơn hàng</div>
                  <span className="font-bold">500</span>
                </div>
              </div>
              <IoStatsChart className="text-[30px] " />
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link>
            <div className="flex gap-2 shadow-lg items-center justify-between bg-blue-600 hover:bg-[#2f7cee] rounded-md text-[white] px-2 py-8">
              <div className="flex items-center gap-3">
                <FaProductHunt className="text-[30px]" />
                <div className="flex flex-col  gap-1 text-[18px] ">
                  <div>Tổng sản phẩm</div>
                  <span className="font-bold">200</span>
                </div>
              </div>
              <IoStatsChart className="text-[30px] " />
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link>
            <div className="flex gap-2 shadow-lg items-center justify-between bg-purple-600  hover:bg-purple-500 rounded-md text-[white] px-2 py-8">
              <div className="flex items-center gap-3">
                <BiCategory className="text-[30px]" />
                <div className="flex flex-col  gap-1 text-[18px] ">
                  <div>Tổng danh mục</div>
                  <span className="font-bold">200</span>
                </div>
              </div>
              <IoStatsChart className="text-[30px] " />
            </div>
          </Link>
        </SwiperSlide>
      </Swiper>
      <div className=" mt-5 shadow-[0_0_10px_2px_rgba(0,0,0,0.1)] rounded-md">
        <div className="flex  text-[18px] font-[500] text-[#ff5252] rounded-md  w-full p-5 bg-white">
          Đơn hàng gần đây
        </div>
        <div className="relative overflow-x-auto  sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-150 dark:bg-gray-700 dark:text-gray-500">
              <tr>
                <th className="px-3 py-3"></th>
                <th className="px-6 py-3">Mã đặt hàng</th>
                <th className="px-6 py-3 whitespace-nowrap">
                  Phương thức thanh toán
                </th>
                <th className="px-6 py-3 whitespace-nowrap">Họ tên</th>
                <th className="px-6 py-3 whitespace-nowrap">Số điện thoại</th>
                <th className="px-6 py-3 whitespace-nowrap">Địa chỉ</th>
                <th className="px-6 py-3 whitespace-nowrap">Thanh toán</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3 whitespace-nowrap">Mã người dùng</th>
                <th className="px-6 py-3 whitespace-nowrap">
                  Trạng thái đơn hàng
                </th>
                <th className="px-6 py-3 whitespace-nowrap">Ngày đặt</th>
                <th className="px-6 py-3 whitespace-nowrap">Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <td className="px-3 py-3 text-[15px] font-[600]">
                  <div
                    onClick={() => showOpenCart(0)}
                    className="text-[12px] p-2 bg-[rgba(0,0,0,0.1)] rounded-full"
                  >
                    {isOpenCart === 0 ? <TfiAngleDown /> : <TfiAngleUp />}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  68bb9582228db479bbedf3c2
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  Thanh toán khi nhận hàng
                </td>
                <td className="px-6 py-4 whitespace-nowrap">Tấn Kiên</td>
                <td className="px-6 py-4 whitespace-nowrap">123456789</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  Đức Phổ, Quảng Ngãi
                </td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  dp1.1a2kien@gmail.com
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  12345567777777777777bb
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Select
                    defaultValue="pending"
                    style={{ width: 140 }}
                    options={[
                      { value: "pending", label: "Đang chờ xử lí" },
                      { value: "delivered", label: "Đã giao" },
                      { value: "Confirm", label: "Xác nhận" },
                    ]}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">09-06-2025</td>

                <td className="px-6 py-4">
                  <Link className=" flex items-center font-medium text-red-600 ">
                    Xóa
                  </Link>
                </td>
              </tr>
              {isOpenCart === 0 && (
                <tr>
                  <td colSpan="7">
                    <div className=" ml-5 relative overflow-x-auto border-2 text-gray-500 mb-2 ">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-150 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Mã sản phẩm
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Tên sản phẩm
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Hình ảnh
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Số lượng
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Giá
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Tổng tiền
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                            <td className="px-6 py-4 ">
                              68bb953e228db479bbedf391
                            </td>
                            <td className="px-6 py-4 ">
                              Women Wide Leg High-Rise Light Fade Stretchable
                              Jeans
                            </td>
                            <td className="px-6 py-4">
                              <img
                                src="https://serviceapi.spicezgold.com/download/1753722939206_125c18d6-592d-4082-84e5-49707ae9a4fd1749366193911-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-1.jpg"
                                alt=""
                                className="w-[40px]"
                              />
                            </td>
                            <td className="px-6 py-4">2</td>
                            <td className="px-6 py-4">$999</td>
                            <td className="px-6 py-4">$1998</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <td className="px-3 py-3 text-[15px] font-[600]">
                  <div
                    onClick={() => showOpenCart(1)}
                    className="text-[12px] p-2 bg-[rgba(0,0,0,0.1)] rounded-full"
                  >
                    {isOpenCart === 1 ? <TfiAngleDown /> : <TfiAngleUp />}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  68bb9582228db479bbedf3c2
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  Thanh toán khi nhận hàng
                </td>
                <td className="px-6 py-4 whitespace-nowrap">Tấn Kiên</td>
                <td className="px-6 py-4 whitespace-nowrap">123456789</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  Đức Phổ, Quảng Ngãi
                </td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  dp1.1a2kien@gmail.com
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  12345567777777777777bb
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Select
                    defaultValue="pending"
                    style={{ width: 140 }}
                    options={[
                      { value: "pending", label: "Đang chờ xử lí" },
                      { value: "delivered", label: "Đã giao" },
                      { value: "Confirm", label: "Xác nhận" },
                    ]}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">09-06-2025</td>

                <td className="px-6 py-4">
                  <Link className="font-medium text-red-600  ">Xóa</Link>
                </td>
              </tr>
              {isOpenCart === 1 && (
                <tr>
                  <td colSpan="7">
                    <div className="ml-5 relative overflow-x-auto border-2 text-gray-500 mb-2">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-150 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Mã sản phẩm
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Tên sản phẩm
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Hình ảnh
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Số lượng
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Giá
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Tổng tiền
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                            <td className="px-6 py-4 ">
                              68bb953e228db479bbedf391
                            </td>
                            <td className="px-6 py-4 ">
                              Women Wide Leg High-Rise Light Fade Stretchable
                              Jeans
                            </td>
                            <td className="px-6 py-4">
                              <img
                                src="https://serviceapi.spicezgold.com/download/1753722939206_125c18d6-592d-4082-84e5-49707ae9a4fd1749366193911-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-1.jpg"
                                alt=""
                                className="w-[40px]"
                              />
                            </td>
                            <td className="px-6 py-4">2</td>
                            <td className="px-6 py-4">$999</td>
                            <td className="px-6 py-4">$1998</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-3 flex flex-col gap-2 bg-white rounded-lg shadow-[0_0_10px_2px_rgba(0,0,0,0.1)] mt-6">
        <div className="text-[20px] text-[#ff5252] font-[600]">
          Doanh số bán hàng
        </div>

        <Column {...config} />
      </div>
    </>
  );
}
