import { Button, Flex, Modal, Space, Table } from "antd";
import React, { useContext, useState } from "react";
import dayjs from "dayjs";
import { MyContext } from "../../App";
import { getData, postData } from "../../untils/api";
import { useEffect } from "react";
const columns = [
  { title: "Họ tên", dataIndex: "name" },

  { title: "Ngày tạo", dataIndex: "createAt" },
  { title: "Hành động", dataIndex: "action" },
];

export default function AddUserAdmin({ onSuccess }) {
  const context = useContext(MyContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData(`/api/userAdmin/notApproved`);
        if (res.success) {
          setData(res.data);
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
  const dataSource = data.map((item) => ({
    key: item._id,
    name: (
      <div className="flex w-[200px] gap-3">
        <div className="flex flex-col gap-1 leading-none">
          <div className="font-[500] text-[15px]">{item.name}</div>
          <div>{item.email}</div>
        </div>
      </div>
    ),

    createAt: dayjs(item.createAt).format("YYYY-MM-DD"),
    action: (
      <Space size="middle">
        <Button
          color="danger"
          variant="solid"
          onClick={() => handleApproved(item._id)}
        >
          Chấp nhận
        </Button>
      </Space>
    ),
  }));
  const handleApproved = async (id) => {
    setLoading(true);
    try {
      const res = await postData(`/api/userAdmin/notApproved/${id}`, {
        approved: true,
      });
      if (res.success) {
        context.openAlertBox("success", res.message);
        setOpen(false);
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      if (error.response) {
        context.openAlertBox("error", error.response.data.message);
      } else {
        context.openAlertBox("error", "Không thể kết nối server!");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Flex vertical gap="middle" align="flex-start">
        {/* Responsive */}
        <Button type="primary" onClick={() => setOpen(true)}>
          Danh sách chờ phê duyệt
        </Button>
        <Modal
          centered
          open={open}
          onCancel={() => setOpen(false)}
          width="90%"
          footer={null} // ẩn nút Ok/Cancel mặc định
          styles={{
            body: {
              maxHeight: "75vh",
              overflowY: "auto",
              padding: "10px",
            },
          }}
        >
          <Table columns={columns} dataSource={dataSource} />
        </Modal>
      </Flex>
    </>
  );
}
