import React from "react";
import dayjs from "dayjs";
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";
import { MdOutlineSearch } from "react-icons/md";
import { Button, Input, Select } from "antd";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../../App";
import { useEffect } from "react";
import { deleteData, getData, postData } from "../../untils/api";
import { useState } from "react";
export default function Order() {
  const context = useContext(MyContext);
  const [isOpenCart, setIsOpenCart] = React.useState(null);
  const [orderData, setOrderData] = useState([]);
  const showOpenCart = (index) => {
    if (isOpenCart === index) {
      setIsOpenCart(null);
    } else {
      setIsOpenCart(index);
    }
  };
  const fetchData = async () => {
    try {
      const res = await getData("/api/orderAdmin/");
      if (res.success) {
        setOrderData(res.data);
      }
    } catch (error) {
      context.openAlertBox(
        "error",
        error.response?.data?.message || "Không thể kết nối server!",
      );
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

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
    <div className=" shadow-[0_0_10px_2px_rgba(0,0,0,0.1)] rounded-md">
      <div className="flex items-center justify-between rounded-md  w-full p-5 bg-white">
        <div className=" text-[18px] font-[500] text-[#ff5252] uppercase">
          Danh sách đơn hàng
        </div>
        <Input
          size="large"
          status="error"
          style={{ width: "300px" }}
          placeholder="Tìm kiếm..."
          prefix={<MdOutlineSearch />}
        />
      </div>
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
              <th className="px-6 py-3 whitespace-nowrap">Tiền thanh toán</th>
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
                  <td className="px-6 py-4 whitespace-nowrap">{item._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.paymentMethod == "cod"
                      ? "Thanh toán khi nhận hàng"
                      : "Đã thanh toán"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item?.userId?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item?.userId?.mobile}
                  </td>
                  <td className="px-6 py-4  whitespace-nowrap">
                    {item.delivery_address}
                  </td>
                  <td className="px-6 py-4">
                    {Number(item.totalAmount).toLocaleString("vi-VN") + " đ"}
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
                                <td className="px-6 py-4">{item1.quantity}</td>
                                <td className="px-6 py-4">
                                  {Number(item1.price).toLocaleString("vi-VN") +
                                    " đ"}
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
                                          value: "confirm",
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
    </div>
  );
}
