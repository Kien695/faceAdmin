import { Checkbox, Button } from "antd";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import { patchData } from "../../untils/api";

export default function Permission() {
  const context = useContext(MyContext);
  const [permissionData, setPermissionData] = useState([]);
  useEffect(() => {
    if (context?.roleData?.length) {
      setPermissionData(
        context.roleData.map((item) => ({
          id: item._id,
          permissions: item.permissions || [],
        })),
      );
    }
  }, [context?.roleData]);
  const handlePermissionChange = (roleId, permission) => {
    setPermissionData((prev) =>
      prev.map((role) => {
        if (role.id === roleId) {
          const exists = role.permissions.includes(permission);
          return {
            ...role,
            permissions: exists
              ? role.permissions.filter((p) => p !== permission)
              : [...role.permissions, permission],
          };
        }
        return role;
      }),
    );
  };
  const handleSubmit = async () => {
    try {
      const res = await patchData("/api/role/permissions", permissionData);
      if (res.success) {
        context.openAlertBox("success", res.message);
        setTimeout(() => {
          window.location.reload();
        }, 150);
      }
    } catch (err) {
      console.error(err);
      context.openAlertBox("error", "Cập nhật phân quyền thất bại");
    }
  };
  return (
    <div className="relative overflow-x-auto ">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-lg font-[500] uppercase text-[#ff5252]">
          Phân quyền
        </div>
        <Button type="primary" danger onClick={handleSubmit}>
          Cập nhật
        </Button>
      </div>
      <table className="w-full text-sm shadow-lg border border-gray-200  text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-black uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Hạng mục
            </th>
            {context?.roleData.map((item) => (
              <th scope="col" className="px-6 py-3" key={item._id}>
                {item.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* sản phẩm */}
          <tr className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <td
              className="px-6 py-2 font-medium text-red-600 whitespace-nowrap dark:text-white "
              colSpan={parseInt(context?.roleData.length) + 1}
            >
              Sản phẩm
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Xem
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("product_view")}
                  onChange={() =>
                    handlePermissionChange(item._id, "product_view")
                  }
                />
              </td>
            ))}
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Thêm
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("product_create")}
                  onChange={() =>
                    handlePermissionChange(item._id, "product_create")
                  }
                />
              </td>
            ))}
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Sửa
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("product_edit")}
                  onChange={() =>
                    handlePermissionChange(item._id, "product_edit")
                  }
                />
              </td>
            ))}
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Xóa
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("product_delete")}
                  onChange={() =>
                    handlePermissionChange(item._id, "product_delete")
                  }
                />
              </td>
            ))}
          </tr>
          {/* danh mục */}
          <tr className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <td
              className="px-6 py-2 font-medium text-red-600 whitespace-nowrap dark:text-white"
              colSpan={parseInt(context?.roleData.length) + 1}
            >
              Danh mục
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Xem
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("category_view")}
                  onChange={() =>
                    handlePermissionChange(item._id, "category_view")
                  }
                />
              </td>
            ))}
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Thêm
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("category_create")}
                  onChange={() =>
                    handlePermissionChange(item._id, "category_create")
                  }
                />
              </td>
            ))}
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Sửa
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("category_edit")}
                  onChange={() =>
                    handlePermissionChange(item._id, "category_edit")
                  }
                />
              </td>
            ))}
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Xóa
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("category_delete")}
                  onChange={() =>
                    handlePermissionChange(item._id, "category_delete")
                  }
                />
              </td>
            ))}
          </tr>
          {/* đơn hàng */}
          <tr className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <td
              colSpan={parseInt(context?.roleData.length) + 1}
              className="px-6 py-2 font-medium text-red-600 whitespace-nowrap dark:text-white"
            >
              Đơn hàng
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Xem
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("view_order")}
                  onChange={() =>
                    handlePermissionChange(item._id, "view_order")
                  }
                />
              </td>
            ))}
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Cập nhật trạng thái
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("update_order")}
                  onChange={() =>
                    handlePermissionChange(item._id, "update_order")
                  }
                />
              </td>
            ))}
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Xóa
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("delete_order")}
                  onChange={() =>
                    handlePermissionChange(item._id, "delete_order")
                  }
                />
              </td>
            ))}
          </tr>
          {/* người dùng */}
          <tr className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <td
              colSpan={parseInt(context?.roleData.length) + 1}
              className="px-6 py-2 font-medium text-red-600 whitespace-nowrap dark:text-white"
            >
              Người dùng
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Xem
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("user_view")}
                  onChange={() => handlePermissionChange(item._id, "user_view")}
                />
              </td>
            ))}
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Xóa
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("user_delete")}
                  onChange={() =>
                    handlePermissionChange(item._id, "user_delete")
                  }
                />
              </td>
            ))}
          </tr>
          {/* người quản lí*/}
          <tr className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <td
              colSpan={parseInt(context?.roleData.length) + 1}
              className="px-6 py-2 font-medium text-red-600 whitespace-nowrap dark:text-white"
            >
              Người quản lí
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Xem
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("userAdmin_view")}
                  onChange={() =>
                    handlePermissionChange(item._id, "userAdmin_view")
                  }
                />
              </td>
            ))}
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Xóa
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("userAdmin_delete")}
                  onChange={() =>
                    handlePermissionChange(item._id, "userAdmin_delete")
                  }
                />
              </td>
            ))}
          </tr>
          {/* banner home*/}
          <tr className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <td
              colSpan={parseInt(context?.roleData.length) + 1}
              className="px-6 py-2 font-medium text-red-600 whitespace-nowrap dark:text-white"
            >
              Banner Home
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Xem
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("banner_view")}
                  onChange={() =>
                    handlePermissionChange(item._id, "banner_view")
                  }
                />
              </td>
            ))}
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Xóa
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("banner_delete")}
                  onChange={() =>
                    handlePermissionChange(item._id, "banner_delete")
                  }
                />
              </td>
            ))}
          </tr>
          {/* trang Blogs */}
          <tr className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <td
              colSpan={parseInt(context?.roleData.length) + 1}
              className="px-6 py-2 font-medium text-red-600 whitespace-nowrap dark:text-white"
            >
              Trang Blogs
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Xem
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("blog_view")}
                  onChange={() => handlePermissionChange(item._id, "blog_view")}
                />
              </td>
            ))}
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Thêm
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("blog_create")}
                  onChange={() =>
                    handlePermissionChange(item._id, "blog_create")
                  }
                />
              </td>
            ))}
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Sửa
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("blog_edit")}
                  onChange={() => handlePermissionChange(item._id, "blog_edit")}
                />
              </td>
            ))}
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Xóa
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("blog_delete")}
                  onChange={() =>
                    handlePermissionChange(item._id, "blog_delete")
                  }
                />
              </td>
            ))}
          </tr>
          {/* thông báo */}
          {/* sản phẩm */}
          <tr className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <td
              className="px-6 py-2 font-medium text-red-600 whitespace-nowrap dark:text-white "
              colSpan={parseInt(context?.roleData.length) + 1}
            >
              Thông báo
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Xem
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("notification_view")}
                  onChange={() =>
                    handlePermissionChange(item._id, "notification_view")
                  }
                />
              </td>
            ))}
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Thêm
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("notification_create")}
                  onChange={() =>
                    handlePermissionChange(item._id, "notification_create")
                  }
                />
              </td>
            ))}
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Sửa
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("notification_edit")}
                  onChange={() =>
                    handlePermissionChange(item._id, "notification_edit")
                  }
                />
              </td>
            ))}
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Xóa
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("notification_delete")}
                  onChange={() =>
                    handlePermissionChange(item._id, "notification_delete")
                  }
                />
              </td>
            ))}
          </tr>
          {/* nhóm quyền */}
          <tr className="bg-gray border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <td
              colSpan={parseInt(context?.roleData.length) + 1}
              className="px-6 py-2 font-medium text-red-600 whitespace-nowrap dark:text-white"
            >
              Nhóm quyền
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Xem
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("role_view")}
                  onChange={() => handlePermissionChange(item._id, "role_view")}
                />
              </td>
            ))}
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Thêm
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("role_create")}
                  onChange={() =>
                    handlePermissionChange(item._id, "role_create")
                  }
                />
              </td>
            ))}
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Sửa
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("role_edit")}
                  onChange={() => handlePermissionChange(item._id, "role_edit")}
                />
              </td>
            ))}
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Xóa
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("role_delete")}
                  onChange={() =>
                    handlePermissionChange(item._id, "role_delete")
                  }
                />
              </td>
            ))}
          </tr>
          {/* phân quyền */}
          <tr className="bg-gray border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <td
              colSpan={parseInt(context?.roleData.length) + 1}
              className="px-6 py-2 font-medium text-red-600 whitespace-nowrap dark:text-white"
            >
              Phân quyền
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Xem
            </th>
            {context?.roleData.map((item) => (
              <td className="px-6 py-2" key={item._id}>
                <Checkbox
                  checked={permissionData
                    .find((p) => p.id === item._id)
                    ?.permissions.includes("permission_view")}
                  onChange={() =>
                    handlePermissionChange(item._id, "permission_view")
                  }
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
