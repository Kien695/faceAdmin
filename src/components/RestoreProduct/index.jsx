import React, { useContext } from "react";
import Swal from "sweetalert2";
import { FaHandsHoldingCircle } from "react-icons/fa6";

import { deleteData, patchData } from "../../untils/api";
import { MyContext } from "../../App";
import { Button } from "antd";

export default function RestoreProduct({ trash, onSuccess }) {
  const context = useContext(MyContext);
  const handleRestore = async () => {
    if (!context?.userData?.role?.permissions.includes("product_delete")) {
      context.openAlertBox("error", "Bạn không có quyền khôi phục!");
      return;
    }
    Swal.fire({
      title: "Bạn chắc muốn khôi phục nó?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Chấp nhận!",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await patchData(`/api/product/restore/${trash._id}`);
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
      <Button size="small" variant="solid" onClick={handleRestore}>
        Khôi phục
      </Button>
    </>
  );
}
