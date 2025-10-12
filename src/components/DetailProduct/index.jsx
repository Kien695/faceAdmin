import { Button, Modal, Rate } from "antd";
import React, { useState } from "react";
import dayjs from "dayjs";
import "./style.css";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import ZoomImage from "../ImageZoom";
import { useEffect } from "react";
import { getData } from "../../untils/api";
export default function DetailProduct({ product }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData(`/api/product/${product._id}`);

        if (res.success) {
          setFormData(res.product);
        }
      } catch (error) {
        if (error.response) {
          context.openAlertBox("error", error.response.data.message);
        } else {
          context.openAlertBox("error", "Không thể kết nối server!");
        }
      }
    };
    if (product._id) {
      fetchData();
    }
  }, [product?._id]);
  useEffect(() => {}, [formData]);

  return (
    <>
      <MdOutlineRemoveRedEye
        className="text-[16px] cursor-pointer"
        onClick={() => setOpen(true)}
      />
      <Modal
        title="Chi tiết sản phẩm"
        centered
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width="90%"
        styles={{
          body: {
            maxHeight: "75vh", // giới hạn chiều cao
            overflowY: "auto",
            padding: "10px", // bật thanh cuộn dọc}
          },
        }}
      >
        <div className="container ">
          <div className=" flex gap-5  p-4 bg-white rounded-md">
            <div className="imageZoom w-[30%]">
              <ZoomImage images={formData.images || []} />
            </div>
            <div className=" p-6 infoProduct w-[70%] flex flex-col gap-5">
              <div className="font-[600] text-[25px] text-[rgba(0,0,0,0.8)]">
                {formData.name}
              </div>
              <div className="info flex gap-3 text-[16px]">
                <span className="text-[rgba(0,0,0,0.5)] ">Thương hiệu: </span>
                {formData.brand}
              </div>
              <div className="info flex gap-3 text-[16px]">
                <span className="text-[rgba(0,0,0,0.5)]">Danh mục: </span>{" "}
                {formData.category?.name}
              </div>
              <div className="flex items-center gap-4 text-[16px]">
                <span className="text-[rgba(0,0,0,0.6)]">Khuyến mãi: </span>
                <span className="w-[70px] h-[30px]  bg-[#F45930] text-[13px] flex items-center justify-center text-white rounded-md">
                  Giảm {formData.discountPercentage}
                </span>
              </div>
              <div className="flex items-center  font-[500] text-[16px] gap-5">
                <div className="flex items-center gap-3">
                  <div className="priceOld line-through text-gray-500">
                    ${formData.price}
                  </div>
                  <div className="priceNew text-[#ff5252] ">
                    $
                    {formData.price -
                      formData.price * (formData.discountPercentage / 100)}
                  </div>
                </div>
                <div className="text-[16px]">
                  <span className="text-[rgba(0,0,0,0.5)]">Còn:</span>{" "}
                  <span className="text-[#ff5252]">
                    {formData.countInStock} sản phẩm
                  </span>
                </div>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: formData.description || "" }}
              ></div>

              <div className="flex items-center gap-3">
                <div>Kích thước:</div>
                {formData?.size?.length > 0
                  ? formData.size.map((size, index) => (
                      <div key={index} className="inline-block mr-1">
                        <Button color="primary" variant="solid">
                          {size}
                        </Button>
                      </div>
                    ))
                  : "Không có"}
              </div>
              <div className="flex items-center gap-3 text-[16px]">
                <span className="text-[rgba(0,0,0,0.5)]">
                  Ngày tạo sản phẩm:
                </span>
                <span>
                  {formData.dateCreated
                    ? dayjs(formData.dateCreated).format("YYYY-MM-DD")
                    : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
