import React, { useContext, useEffect, useState } from "react";
import { Button, Flex, Table } from "antd";
import dayjs from "dayjs";
import { getData } from "../../untils/api";
import { MyContext } from "../../App";
import { useSearchParams } from "react-router-dom";
const columns = [
  { title: "Họ tên", dataIndex: "name" },
  { title: "Số điện thoại", dataIndex: "phone" },
  { title: "Ngày tạo", dataIndex: "createAt" },
  { title: "Hành động", dataIndex: "action" },
];

export default function User() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, getUser] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [totalItem, setTotalItem] = useState();
  const [perPage, setPerPage] = useState();
  const context = useContext(MyContext);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const page = parseInt(searchParams.get("page")) || 1;
  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      const params = Object.fromEntries(prev.entries());
      return { ...params, page: newPage };
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData(`/api/user?page=${page}`);
        if (res.success) {
          getUser(res.data);

          setTotalItem(res.totalItems);
          setPerPage(res.perPage);
        }
      } catch (error) {
        if (error.response) {
          context.openAlertBox("error", error.response.data.message);
        } else {
          context.openAlertBox("error", "Không thể kết nối server!");
        }
      }
    };
    fetchData();
  }, []);

  const dataSource = user.map((item) => ({
    key: item._id,
    name: (
      <div className="flex w-[200px] gap-3">
        <div className="w-[25%] rounded-md">
          <img src={item.avatar} alt="user" className="rounded-md" />
        </div>
        <div className="flex flex-col gap-1 leading-none">
          <div className="font-[500] text-[15px]">{item.name}</div>
          <div>{item.email}</div>
        </div>
      </div>
    ),
    phone: item.mobile,
    createAt: dayjs(item.createAt).format("YYYY-MM-DD"),
    action: (
      <Button color="danger" variant="solid">
        Xóa
      </Button>
    ),
  }));
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
      <div className="px-2 pb-6 text-[18px] font-[600] text-[#ff5252]">
        Danh sách người dùng
      </div>
      <Flex gap="middle" vertical>
        <Flex align="center" gap="middle">
          <Button
            type="primary"
            onClick={start}
            disabled={!hasSelected}
            loading={loading}
          >
            Xóa tất cả
          </Button>
          {hasSelected ? `Chọn ${selectedRowKeys.length} người dùng` : null}
        </Flex>
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
