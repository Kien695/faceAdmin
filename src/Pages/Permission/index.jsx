import { Checkbox, Button } from "antd";
import { useState } from "react";

export default function Permission() {
  return (
    <div className="relative overflow-x-auto ">
      <div className="mb-4 text-end">
        <Button type="primary" danger>
          Cập nhật
        </Button>
      </div>
      <table className="w-full text-sm shadow-lg border border-gray-200  text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3">
              Admin chính
            </th>
            <th scope="col" className="px-6 py-3">
              Admin phụ 1
            </th>
            <th scope="col" className="px-6 py-3">
              Admin phụ 2
            </th>
          </tr>
        </thead>
        <tbody>
          {/* sản phẩm */}
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <td class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Sản phẩm
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Thêm
            </th>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Sửa
            </th>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Xóa
            </th>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
          </tr>
          {/* danh mục */}
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <td className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Danh mục
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Thêm
            </th>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Sửa
            </th>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Xóa
            </th>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
          </tr>
          {/* đơn hàng */}
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <td class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Đơn hàng
            </td>
          </tr>

          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Cập nhật trạng thái
            </th>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Xóa
            </th>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
          </tr>
          {/* người dùng */}
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <td class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Người dùng
            </td>
          </tr>

          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Xóa
            </th>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
          </tr>
          {/* trang Blogs */}
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <td class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Trang Blogs
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Thêm
            </th>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Sửa
            </th>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Xóa
            </th>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
          </tr>
          {/* nhóm quyền */}
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <td class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Nhóm quyền
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Thêm
            </th>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Sửa
            </th>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Xóa
            </th>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
            <td class="px-6 py-2">
              <Checkbox></Checkbox>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
