import React from "react";
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";
import { MdOutlineSearch } from "react-icons/md";
import { Button, Input, Select } from "antd";
import { Link } from "react-router-dom";
export default function Order() {
  const [isOpenCart, setIsOpenCart] = React.useState(null);
  const showOpenCart = (index) => {
    if (isOpenCart === index) {
      setIsOpenCart(null);
    } else {
      setIsOpenCart(index);
    }
  };
  return (
    <div className=" shadow-[0_0_10px_2px_rgba(0,0,0,0.1)] rounded-md">
      <div className="flex items-center justify-between rounded-md  w-full p-5 bg-white">
        <div className=" text-[18px] font-[500] text-[#ff5252] ">
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
  );
}
