import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
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
import AddProduct from "../../components/AddProduct";
import { deleteData, getData, postData } from "../../untils/api";
import { useContext } from "react";
import { MyContext } from "../../App";
export default function Dashboard() {
  const context = useContext(MyContext);
  const [isOpenCart, setIsOpenCart] = React.useState(null);
  const [isOrder, setIsOrder] = useState(1);
  const [data, setData] = useState({});
  const [revenue, setRevenue] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [year, getYear] = useState();
  const showOpenCart = (index) => {
    if (isOpenCart === index) {
      setIsOpenCart(null);
    } else {
      setIsOpenCart(index);
    }
  };
  //
  const handleChange = (value) => {
    getYear(value);
  };
  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: 8 }, (_, i) => {
    const year = currentYear - i;
    return {
      value: year,
      label: year.toString(),
    };
  });

  //get dashboard
  const fetchData = async () => {
    try {
      const res = await getData(`/api/dashboard?year=${year}`);

      if (res.success) {
        setData(res.data);
        setRevenue(res.revenue);
        setOrderData(res.order);
      }
    } catch (error) {
      if (error.response) {
        context.openAlertBox("error", error.response.data.message);
      } else {
        context.openAlertBox("error", "Không thể kết nối server!");
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, [year]);

  const config = {
    data: revenue,
    xField: "Month",
    yField: "value",
    colorField: "name",
    group: true,
    style: {
      inset: 5,
    },
  };
  const handleChangeStatus = async (value, orderId, productId, size) => {
    try {
      const res = await postData("/api/orderAdmin/changeStatus", {
        orderId: orderId,
        size: size,
        action: value,
        productId: productId,
      });
      if (res.success) {
        context.openAlertBox(
          "success",
          res.message || "Cập nhật trạng thái thành công!",
        );
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
    }
  };
  const handleDelete = async (orderId, productId, size, action) => {
    try {
      const res = await deleteData("/api/orderAdmin/deleteOrder", {
        orderId: orderId,
        productId: productId,
        size: size,
        action: action,
      });
      if (res.success) {
        context.openAlertBox("success", res.message);
        fetchData();
      }
    } catch (error) {
      context.openAlertBox("error", "Lỗi!");
    }
  };
  return (
    <>
      <div className="flex items-center border border-1 border-gray-200 p-6 rounded-lg shadow-md bg-[#f1faff]">
        <div className="w-[80%] flex flex-col gap-4 pl-8  ">
          <div className="font-bold text-[25px] sm:text-[30px] leading-tight max-md:flex max-md:justify-center">
            Xin chào, <br />
            <span className="text-[#ff5252]">{context?.userData?.name}</span>
          </div>

          <div className="sm:text-[18px] text-[15px]">
            Dưới đấy là số thiệu thống kê của của cửa hàng bạn
          </div>
          <div className="mt-2 flex  justify-center md:justify-start">
            <AddProduct />
          </div>
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
        breakpoints={{
          0: {
            // màn hình rất nhỏ (<400px)
            slidesPerView: 1,
          },
          570: {
            // màn hình nhỏ hơn tablet
            slidesPerView: 2,
          },
          850: {
            // màn hình nhỏ hơn tablet
            slidesPerView: 3,
          },
          1024: {
            // màn hình lớn (desktop)
            slidesPerView: 4,
          },
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper mt-5"
      >
        <SwiperSlide>
          <Link to="/users">
            <div className="flex gap-2 shadow-lg hover:bg-[#289974] items-center justify-between bg-green-600 rounded-md text-[white] px-7 sm:px-6 md:px-2  py-8">
              <div className="flex items-center gap-4 md:gap-3">
                <FaUsers className="text-[35px] md:text-[30px]" />
                <div className="flex flex-col  gap-1 text-[24px] md:text-[20px]">
                  <div>Tổng người dùng</div>
                  <span className="font-bold">{data?.user?.total}</span>
                </div>
              </div>
              <IoStatsChart className="text-[35px] md:text-[30px]" />
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/orders">
            <div className="flex gap-2 shadow-lg items-center justify-between bg-red-600 hover:bg-[#ff1522] rounded-md text-[white] px-7 sm:px-6 md:px-2 py-8">
              <div className="flex items-center gap-4 md:gap-3">
                <TiShoppingCart className="text-[35px] md:text-[30px]" />
                <div className="flex flex-col  gap-1 text-[24px] md:text-[20px]">
                  <div>Tổng đơn hàng</div>
                  <span className="font-bold">{data?.order?.total}</span>
                </div>
              </div>
              <IoStatsChart className="text-[35px] md:text-[30px]" />
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/products">
            <div className="flex gap-2 shadow-lg items-center justify-between bg-blue-600 hover:bg-[#2f7cee] rounded-md text-[white] px-7 sm:px-6 md:px-2 py-8">
              <div className="flex items-center gap-4 md:gap-3">
                <FaProductHunt className="text-[35px] md:text-[30px]" />
                <div className="flex flex-col  gap-1 text-[24px] md:text-[20px]">
                  <div>Tổng sản phẩm</div>
                  <span className="font-bold">{data?.products?.total}</span>
                </div>
              </div>
              <IoStatsChart className="text-[35px] md:text-[30px]" />
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/categories">
            <div className="flex gap-2 shadow-lg items-center justify-between bg-purple-600  hover:bg-purple-500 rounded-md text-[white] px-7 sm:px-6 md:px-2 py-8">
              <div className="flex items-center gap-4 md:gap-3">
                <BiCategory className="text-[35px] md:text-[30px]" />
                <div className="flex flex-col  gap-1 text-[24px] md:text-[20px]">
                  <div>Tổng danh mục</div>
                  <span className="font-bold">{data?.category?.total}</span>
                </div>
              </div>
              <IoStatsChart className="text-[35px] md:text-[30px]" />
            </div>
          </Link>
        </SwiperSlide>
      </Swiper>
      <div className=" mt-5 shadow-[0_0_10px_2px_rgba(0,0,0,0.1)] rounded-md">
        <div className="flex  text-[18px] font-[500] text-[#ff5252] rounded-md  w-full p-5 bg-white items-center justify-between">
          Đơn hàng gần đây
          <div
            onClick={() => setIsOrder(!isOrder)}
            className="text-[12px] p-2 bg-[rgba(0,0,0,0.1)] rounded-full"
          >
            {isOrder === 1 ? <TfiAngleDown /> : <TfiAngleUp />}
          </div>
        </div>
        {isOrder == 1 && (
          <div className="relative overflow-x-auto  sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-150 dark:bg-gray-700 dark:text-gray-500">
                <tr>
                  <th className="px-3 py-3"></th>
                  <th className="px-6 py-3">Mã đặt hàng</th>
                  <th className="px-6 py-3 whitespace-nowrap">
                    Trạng thái thanh toán
                  </th>
                  <th className="px-6 py-3 whitespace-nowrap">Họ tên</th>
                  <th className="px-6 py-3 whitespace-nowrap">Số điện thoại</th>
                  <th className="px-6 py-3 w-20 whitespace-nowrap">Địa chỉ</th>
                  <th className="px-6 py-3 whitespace-nowrap">
                    Tiền thanh toán
                  </th>
                  <th className="px-6 py-3">Email</th>

                  <th className="px-6 py-3 whitespace-nowrap">Ngày đặt</th>
                </tr>
              </thead>
              <tbody>
                {orderData?.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                      <td className="px-3 py-3 text-[15px] font-[600]">
                        <div
                          onClick={() => showOpenCart(index)}
                          className="text-[12px] p-2 bg-[rgba(0,0,0,0.1)] rounded-full"
                        >
                          {isOpenCart === 0 ? <TfiAngleDown /> : <TfiAngleUp />}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.paymentMethod == "cod"
                          ? "Thanh toán khi nhận hàng"
                          : "Đã thanh toán"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item?.userId?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item?.mobile}
                      </td>
                      <td className="px-6 py-4  whitespace-nowrap">
                        {item?.delivery_address}
                      </td>
                      <td className="px-6 py-4">
                        {Number(item.totalAmount).toLocaleString("vi-VN") +
                          " đ"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item?.userId?.email}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {dayjs(item.createdAt).format("YYYY-MM-DD")}
                      </td>
                    </tr>
                    {isOpenCart === index && (
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
                                  <th className="px-6 py-3 whitespace-nowrap">
                                    Trạng thái đơn hàng
                                  </th>
                                  <th className="px-6 py-3 whitespace-nowrap">
                                    Hành động
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {item?.productItems.map((item1, index) => (
                                  <tr
                                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                                    key={index}
                                  >
                                    <td className="px-6 py-4 ">
                                      {item1?.productId._id}
                                    </td>
                                    <td className="px-6 py-4 ">
                                      {item1?.productId.name}
                                    </td>
                                    <td className="px-6 py-4">
                                      <img
                                        src={item1?.productId?.images[0].url}
                                        alt=""
                                        className="w-[40px]"
                                      />
                                    </td>
                                    <td className="px-6 py-4">
                                      {item1.quantity}
                                    </td>
                                    <td className="px-6 py-4">
                                      {Number(item1.price).toLocaleString(
                                        "vi-VN",
                                      ) + " đ"}
                                    </td>
                                    <td className="px-6 py-4">
                                      {Number(
                                        item1.price * item1.quantity,
                                      ).toLocaleString("vi-VN") + " đ"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {item1?.order_status === "cancelled" ? (
                                        <span className="text-red-500 font-medium">
                                          Đơn hàng đã bị hủy
                                        </span>
                                      ) : (
                                        <Select
                                          defaultValue={item1?.order_status}
                                          style={{ width: 170 }}
                                          onChange={(value) =>
                                            handleChangeStatus(
                                              value,
                                              item._id,
                                              item1?.productId._id,
                                              item1?.size,
                                            )
                                          }
                                          options={[
                                            {
                                              value: "pending",
                                              label: "Đang chờ xử lí",
                                            },
                                            {
                                              value: "delivering",
                                              label: "Đang giao",
                                            },
                                            {
                                              value: "delivered",
                                              label: "Đã giao",
                                            },
                                          ]}
                                        />
                                      )}
                                    </td>
                                    <td className="px-6 py-4">
                                      <Button
                                        className=" flex items-center font-medium text-red-600 "
                                        disabled={
                                          item1.order_status !== "cancelled"
                                        }
                                        onClick={() =>
                                          handleDelete(
                                            item._id,
                                            item1?.productId._id,
                                            item1?.size,
                                            item1?.order_status,
                                          )
                                        }
                                      >
                                        Xóa
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col gap-2 bg-white rounded-lg shadow-[0_0_10px_2px_rgba(0,0,0,0.1)] mt-6">
        <div className="text-[20px] text-[#ff5252] font-[600]">
          Doanh số bán hàng năm{" "}
          <Select
            defaultValue={currentYear}
            style={{ width: 120 }}
            onChange={handleChange}
            options={years}
          />
        </div>
        {revenue.length > 0 ? (
          <Column {...config} />
        ) : (
          <div className="text-[16px] font-[500] text-gray-700 italic text-center">
            Năm nay chưa có doanh thu
          </div>
        )}
      </div>
    </>
  );
}
