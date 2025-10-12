import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { Button, Modal, Flex, Input, Rate, Select, Table, Space } from "antd";
import { MdOutlineSearch } from "react-icons/md";
import { BiFilterAlt } from "react-icons/bi";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

import { Image, Upload } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddProduct from "../../components/AddProduct";
import { getData } from "../../untils/api";
import { MyContext } from "../../App";
import { useNavigate, useSearchParams } from "react-router-dom";

import EditProduct from "../../components/EditProduct";
import DetailProduct from "../../components/DetailProduct";
import DeleteProduct from "../../components/DeleteProduct";
const columns = [
  { title: "Sản phẩm", dataIndex: "product" },
  { title: "Danh mục", dataIndex: "category" },

  { title: "Giá", dataIndex: "price" },
  { title: "Đã bán", dataIndex: "sale" },
  { title: "Còn lại", dataIndex: "stock" },
  { title: "Đánh giá", dataIndex: "rating" },
  { title: "Hành động", dataIndex: "action" },
];

export default function Product() {
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
  const search = searchParams.get("keyword") || "";
  const page = parseInt(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || "";
  const rate = searchParams.get("rate") || "";
  const sortKey = searchParams.get("sortKey") || "";
  const sortValue = searchParams.get("sortValue") || "";
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setSearchParams((prev) => {
        const params = Object.fromEntries(prev.entries());
        return { ...params, page: 1, keyword };
      });
    }
  };
  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      const params = Object.fromEntries(prev.entries());
      return { ...params, page: newPage };
    });
  };
  const handleCategoryChange = (value) => {
    setSearchParams((prev) => {
      const params = Object.fromEntries(prev.entries()); // giữ lại keyword, page, v.v.
      if (value) {
        params.category = value; // cập nhật danh mục được chọn
      } else {
        delete params.category; // nếu chọn "Tất cả" thì xóa param category
      }
      return params;
    });
  };
  const handleRateChange = (value) => {
    setSearchParams((prev) => {
      const params = Object.fromEntries(prev.entries());
      if (value) {
        params.rate = value;
      } else {
        delete params.rate;
      }
      return params;
    });
  };
  const handleSortChange = (value) => {
    setSearchParams((prev) => {
      const params = Object.fromEntries(prev.entries());
      if (value) {
        const [sortKey, sortValue] = value.split("-");
        params.sortKey = sortKey;
        params.sortValue = sortValue;
      }
      return params;
    });
  };
  const fetchData = async () => {
    try {
      const res = await getData(
        `/api/product?page=${page}&keyword=${search}&category=${category}&rate=${rate}&sortKey=${sortKey}&sortValue=${sortValue}`
      );

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

  // Gọi khi page/searchParams thay đổi
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchData();
    }, 400); // debounce tránh gọi API liên tục khi đang gõ
    return () => clearTimeout(delayDebounce);
  }, [searchParams.toString()]);

  const dataSource = dataProduct.map((item, index) => ({
    key: item._id || index,
    product: (
      <div className="flex gap-3 w-[320px] items-center">
        <img
          src={item.images?.[0]?.url || "cc"}
          alt=""
          className="w-[55px] rounded-md"
        />
        <div className="flex flex-col gap-1">
          <div className="leading-none text-[14px] font-[500] line-clamp-2">
            {item.name}
          </div>
          <span className="text-[#ff5252]">{item.brand}</span>
        </div>
      </div>
    ),
    category: item.category.name,

    price: item.price,
    sale: item.discountPercentage,
    stock: item.countInStock,
    rating: <Rate disabled value={item.rating} style={{ fontSize: 13 }} />,
    action: (
      <Space size="small">
        <EditProduct product={item} onSuccess={() => fetchData()} />
        <DetailProduct product={item} />
        <DeleteProduct product={item} onSuccess={() => fetchData()} />
      </Space>
    ),
  }));
  const start = () => {
    setLoading(true);

    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const options = [
    { value: "", label: "Tất cả" }, //  thêm giá trị rỗng cho “Tất cả”
    ...context.catData.map((item) => ({
      value: item.name, // gửi name để server dễ lọc
      label: item.name,
    })),
  ];

  return (
    <div className="bg-white p-2 rounded-md shadow-md">
      <div className="px-2 pb-6 text-[18px] font-[600] text-[#ff5252]">
        Danh sách sản phẩm
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
              Xóa tất cả
            </Button>

            {hasSelected ? `Chọn ${selectedRowKeys.length} sản phẩm` : null}
          </div>
          <Flex vertical gap="middle" align="flex-start">
            {/* Responsive */}
            <AddProduct onSuccess={() => fetchData()} />
          </Flex>
        </Flex>
        <div className="flex items-end justify-between px-6">
          <div className="flex gap-6">
            <div className=" w-[80%] flex items-end min-h-[60px]">
              <Button
                color="danger"
                variant="solid"
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center gap-2"
              >
                <BiFilterAlt />
                Lọc
                {showFilter ? <FaAngleLeft /> : <FaAngleRight />}
              </Button>
              {showFilter && (
                <div className=" ml-2 flex gap-3">
                  <div className="flex flex-col gap-1">
                    <div className="font-[500] text-[15px]">Theo danh mục</div>
                    <Select
                      value={category || ""}
                      style={{ width: 120 }}
                      onChange={handleCategoryChange}
                      options={options}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="font-[500] text-[15px]">Theo đánh giá</div>
                    <Select
                      value={rate || ""}
                      style={{ width: 120 }}
                      onChange={handleRateChange}
                      options={[
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                        { value: "3", label: "3" },
                        { value: "4", label: "4" },
                        { value: "5", label: "5" },
                        { value: "", label: "Tất cả" },
                      ]}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className=" w-[80%] flex items-end min-h-[60px]">
              <Button
                color="danger"
                variant="solid"
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-2"
              >
                <BiFilterAlt />
                Xăp xếp
                {showSort ? <FaAngleLeft /> : <FaAngleRight />}
              </Button>
              {showSort && (
                <div className=" ml-2 flex gap-8">
                  <div className="flex flex-col gap-1">
                    <div className="font-[500] text-[15px]">Theo giá</div>
                    <Select
                      style={{ width: 130 }}
                      onChange={handleSortChange}
                      defaultValue="Giá giảm dần"
                      value={
                        sortKey && sortValue
                          ? `${sortKey}-${sortValue}`
                          : undefined
                      }
                      options={[
                        { value: "price-asc", label: "Giá tăng dần" },
                        { value: "price-desc", label: "Giá giảm dần" },
                      ]}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <Space>
              <Input
                size="large"
                placeholder="Tìm kiếm..."
                value={keyword}
                style={{ width: 250 }}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button
                type="primary"
                htmlType="submit"
                icon={<MdOutlineSearch />}
              ></Button>
            </Space>
          </form>
        </div>

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataSource}
          pagination={{
            current: page,
            total: totalItem,
            pageSize: perPage,
            onChange: handlePageChange,
          }}
        />
      </Flex>
    </div>
  );
}
