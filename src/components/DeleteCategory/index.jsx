import React, { useContext } from "react";
import { FaHandsHoldingCircle } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteData } from "../../untils/api";
import { MyContext } from "../../App";

export default function DeleteCategory({ category, onSuccess }) {
  const context = useContext(MyContext);
  const handleDelete = async () => {
    try {
      const res = await deleteData(`/api/category/delete/${category._id}`);
      if (res.success) {
        context.openAlertBox("success", res.message);
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      if (error) {
        context.openAlertBox("error", error.response.data.message);
      } else {
        context.openAlertBox("error", "Không thể kết nối server!");
      }
    }
  };
  return (
    <>
      <RiDeleteBinLine
        className="text-[16px] cursor-pointer"
        onClick={handleDelete}
      />
    </>
  );
}
