import React, { useContext, useState } from "react";
import { Button, Flex, Table, Space, Modal, Image, Upload } from "antd";
import Swal from "sweetalert2";
import AddBannerHome from "../../components/AddBannerHome";
import { getData, postData } from "../../untils/api";
import { useEffect } from "react";
import DeleteBannerHome from "../../components/DeleteBannerHome";
import EditBannerHome from "../../components/EditBannerHome";
import { MyContext } from "../../App";
const columns = [
  { title: "Hình ảnh", dataIndex: "image" },
  { title: "Hành động", dataIndex: "action" },
];

export default function BannerHome() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bannerData, getBannerData] = useState([]);
  const context = useContext(MyContext);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const fetchData = async () => {
    try {
      const res = await getData("/api/banner");
      if (res.success) {
        getBannerData(res.data);
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
  }, []);
  const start = async () => {
    if (!context?.userData?.role?.permissions.includes("banner_delete")) {
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
        if (selectedRowKeys.length === 0) return;
        setLoading(true);

        try {
          const res = await postData("/api/banner/delete-all", {
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
            error.response?.data?.message || "Không thể kết nối server!"
          );
        } finally {
          setLoading(false);
        }
      }
    });
  };
  const dataSource = bannerData.map((item) => ({
    ...item,
    key: item._id,
    image: (
      <img src={item.images} alt="banner" className="w-[300px] rounded-md" />
    ),
    action: (
      <Space size="middle">
        <EditBannerHome banner={item} onSuccess={() => fetchData()} />
        <DeleteBannerHome banner={item._id} onSuccess={() => fetchData()} />
      </Space>
    ),
  }));

  return (
    <div className="bg-white p-2 rounded-md shadow-md">
      <div className="px-2 pb-6 text-[18px] font-[600] text-[#ff5252] uppercase">
        Danh sách Banners Home
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
            {hasSelected ? `Chọn ${selectedRowKeys.length} Banner` : null}
          </div>
          <AddBannerHome onSuccess={() => fetchData()} />
        </Flex>

        <Table
          rowKey="_id"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataSource}
        />
      </Flex>
    </div>
  );
}
