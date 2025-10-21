import React from "react";
import { useContext } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { MyContext } from "../../App";
import Swal from "sweetalert2";
import { deleteData } from "../../untils/api";
export default function DeleteUser({ user, onSuccess }) {
  const context = useContext(MyContext);
  const handleDelete = async () => {
    if (!context?.userData?.role?.permissions.includes("user_delete")) {
      context.openAlertBox("error", "Bạn không có quyền xóa!");
      return;
    }
    Swal.fire({
      title: "Bạn chắc muốn xóa nó?",
      text: "Bạn sẽ không khôi phục lại được!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vâng, xóa nó!",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteData(`/api/user/deleteUser/${user._id}`);
          if (res.success) {
            context.openAlertBox("success", res.message);
            if (onSuccess) onSuccess();
          }
        } catch (error) {
          if (error.response?.data?.message) {
            // có response từ server
            context.openAlertBox("error", error.response.data.message);
          } else {
            context.openAlertBox("error", "Không thể kết nối server!");
          }
        }
      }
    });
  };
  return (
    <RiDeleteBinLine
      className="text-[20px] cursor-pointer"
      onClick={handleDelete}
    />
  );
}
