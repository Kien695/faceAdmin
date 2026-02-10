import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Button, Modal, Flex, Input, Rate, Select, Table, Space } from "antd";
import { MdOutlineSearch } from "react-icons/md";
import { BiFilterAlt } from "react-icons/bi";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import Swal from "sweetalert2";
import { Image, Upload } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddProduct from "../../components/AddProduct";
import { deleteData, getData, patchData } from "../../untils/api";
import { MyContext } from "../../App";
import { useNavigate, useSearchParams } from "react-router-dom";

import EditProduct from "../../components/EditProduct";
import DetailProduct from "../../components/DetailProduct";
import DeleteProduct from "../../components/DeleteProduct";
import DeleteInTrash from "../../components/DeleteInTrash";
import RestoreProduct from "../../components/RestoreProduct";
const columns = [
  { title: "Sản phẩm", dataIndex: "product" },
  { title: "Danh mục", dataIndex: "category" },

  { title: "Giá", dataIndex: "price" },
  { title: "Ngày xóa", dataIndex: "dateDelete" },
  { title: "Người xóa", dataIndex: "peopleDelete" },
  { title: "Hành động", dataIndex: "action" },
];

export default function Trash() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [dataProduct, setDataProduct] = useState([]);
  const [perPage, setPerPage] = useState();
  const [totalItem, setTotalItem] = useState();
  const [keyword, setKeyword] = useState("");
  const context = useContext(MyContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const navigate = useNavigate();

  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      const params = Object.fromEntries(prev.entries());
      return { ...params, page: newPage };
    });
  };

  const fetchData = async () => {
    try {
      const res = await getData(`/api/product/trash?page=${page}`);

      if (res.success) {
        setDataProduct(res.products);
        setPerPage(res.perPage);
        setTotalItem(res.totalItems);
      }
    } catch (error) {
      if (error.response) {
        context.openAlertBox("error", error.response.data.message);
      } else {
        context.openAlertBox("error", "Không thể kết nối server!");
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, [page]);
  const dataSource = dataProduct.map((item, index) => ({
    ...item,
    key: item._id || index,
    product: (
      <div className="flex gap-3 w-[250px] items-center">
        <img
          src={item.images?.[0]?.url || "cc"}
          alt=""
          className="w-[55px] rounded-md"
        />
        <div className="flex flex-col gap-1 leading-none">
          <div className="leading-none text-[14px] font-[500] line-clamp-2">
            {item.name}
          </div>
          <span className="text-[#ff5252]">{item.brand}</span>
        </div>
      </div>
    ),
    category: item.category.name,

    price: item.price,
    dateDelete: item.deletedBy
      ? dayjs(item.deletedBy.deletedAt).format("YYYY-MM-DD")
      : "",
    peopleDelete:
      item.deletedBy?.account_id?._id == context.userData._id
        ? "Bạn"
        : item.deletedBy?.account_id?.name || "Không xác định",
    action: (
      <Space size="small">
        <RestoreProduct
          onSuccess={() => {
            fetchData();
          }}
          trash={item}
        />
        <DeleteInTrash
          onSuccess={() => {
            fetchData();
          }}
          trash={item}
        />
      </Space>
    ),
  }));
  const start = async () => {
    if (!context?.userData?.role?.permissions.includes("product_delete")) {
      context.openAlertBox("error", "Bạn không có quyền xóa!");
      return;
    }
    Swal.fire({
      title: "Bạn chắc muốn xóa vĩnh viễn nó?",
      text: "Bạn sẽ không khôi phục lại được!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vâng, xóa nó!",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (selectedRowKeys.length === 0) return;
        setLoading(true);

        try {
          const res = await patchData("/api/product/change-multi", {
            type: "delete-hard-all",
            ids: selectedRowKeys,
          });
          if (res.success) {
            context.openAlertBox("success", res.message);

            fetchData();
            setSelectedRowKeys([]);
          } else {
            context.openAlertBox("error", res.message || "Xóa thất bại!");
          }
        } catch (error) {
          context.openAlertBox(
            "error",
            error.response?.data?.message || "Không thể kết nối server!",
          );
        } finally {
          setLoading(false);
        }
      }
    });
  };
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div className="bg-white p-2 rounded-md shadow-md">
      <div className="px-2 pb-6 text-[18px] font-[600] text-[#ff5252] uppercase">
        Sản phẩm đã xóa
      </div>
      <Flex gap="middle" vertical>
        <Flex
          align="center"
          justify="space-between"
          gap="middle"
          className="px-5"
        >
          <div className="flex items-center gap-2">
            <Button
              type="primary"
              onClick={start}
              disabled={!hasSelected}
              loading={loading}
            >
              Xóa vĩnh viễn
            </Button>

            {hasSelected ? `${selectedRowKeys.length} sản phẩm` : null}
          </div>
        </Flex>

        <Table
          rowKey="_id"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataSource}
          pagination={{
            current: page,
            total: totalItem,
            pageSize: perPage,
            onChange: handlePageChange,
          }}
          scroll={{
            x: "max-content", // cho phép scroll ngang khi bảng rộng hơn màn hình
          }}
        />
      </Flex>
    </div>
  );
}
