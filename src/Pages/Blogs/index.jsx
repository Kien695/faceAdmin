import React, { useEffect, useState } from "react";
import { Button, Flex, Table, Space, Modal, Image, Upload, Input } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import AddBlog from "../../components/AddBlog";
import { getData, patchData } from "../../untils/api";
import DeleteBlog from "../../components/DeleteBlog";
import EditBlog from "../../components/EditBlog";
import { useContext } from "react";
import { MyContext } from "../../App";
import Swal from "sweetalert2";
const columns = [
  { title: "Hình ảnh", dataIndex: "image" },
  { title: "Tiêu đề", dataIndex: "title" },
  { title: "Mô tả", dataIndex: "description" },
  { title: "Hành động", dataIndex: "action" },
];

export default function Blog() {
  const context = useContext(MyContext);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataBlog, getDataBLog] = useState([]);

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
      const res = await getData("/api/blog/");
      if (res.success) {
        getDataBLog(res.data);
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
    if (!context?.userData?.role?.permissions.includes("blog_delete")) {
      context.openAlertBox("error", "Bạn không có quyền xóa!");
      return;
    }
    Swal.fire({
      title: "Bạn chắc muốn xóa nó?",

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
          const res = await patchData("/api/blog/change-multi", {
            type: "delete-all",
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
  const dataSource = dataBlog.map((item) => ({
    ...item,
    key: item._id,
    image: (
      <img src={item.images} alt="banner" className="w-[300px] rounded-md" />
    ),
    title: <div className="w-[230px] font-[500]">{item.title}</div>,
    description: (
      <div
        className="line-clamp-3"
        dangerouslySetInnerHTML={{ __html: item.description || "" }}
      />
    ),
    action: (
      <Space size="middle">
        <EditBlog blog={item} onSuccess={() => fetchData()} />
        <DeleteBlog blog={item} onSuccess={() => fetchData()} />
      </Space>
    ),
  }));

  return (
    <div className="bg-white p-2 rounded-md shadow-md">
      <div className="px-2 pb-6 text-[18px] font-[600] text-[#ff5252] uppercase">
        Danh sách Blogs
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
            {hasSelected ? `Chọn ${selectedRowKeys.length}` : null}
          </div>
          <AddBlog onSuccess={() => fetchData()} />
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
