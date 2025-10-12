import React, { useContext } from "react";
import Swal from "sweetalert2";
import { FaHandsHoldingCircle } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteData } from "../../untils/api";
import { MyContext } from "../../App";

export default function DeleteProduct({ product, onSuccess }) {
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
          const res = await deleteData(
            `/api/product/deleteProduct/${product._id}`
          );
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
    <>
      <RiDeleteBin6Line
        className="text-[16px] cursor-pointer"
        onClick={handleDelete}
      />
    </>
  );
}
