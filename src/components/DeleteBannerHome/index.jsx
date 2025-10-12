import React from "react";
import Swal from "sweetalert2";
import { useContext } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MyContext } from "../../App";
import { deleteData } from "../../untils/api";
export default function DeleteBannerHome({ banner, onSuccess }) {
  const context = useContext(MyContext);
  const handleDelete = () => {
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
          const res = await deleteData(`/api/banner/delete/${banner}`);
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
    <RiDeleteBin6Line
      className="text-[20px] cursor-pointer"
      onClick={handleDelete}
    />
  );
}
