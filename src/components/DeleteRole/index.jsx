import React, { useContext } from "react";
import { MyContext } from "../../App";
import Swal from "sweetalert2";
import { deleteData } from "../../untils/api";
import { RiDeleteBinLine } from "react-icons/ri";
export default function DeleteRole({ role, onSuccess }) {
  const context = useContext(MyContext);
  const handleDelete = async () => {
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
          const res = await deleteData(`/api/role/deleted/${role._id}`);
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
