import React, { useContext, useRef, useState } from "react";
import { MyContext } from "../../App";
import { Button, Flex, Input, Modal, Select, Spin } from "antd";
import { getData, postData } from "../../untils/api";
export default function AddSubCategory() {
  const context = useContext(MyContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [formInput, setFormInput] = useState({
    name: "",
    parentCatName: null,
    parentId: null,
  });
  const inputRefs = {
    name: useRef(),
  };
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Hàm đệ quy duyệt cây
  const buildOptions = (categories, prefix = "") => {
    let result = [];

    categories.forEach((cat) => {
      // thêm chính nó
      result.push({
        value: cat._id,
        label: prefix + cat.name,
      });

      // nếu có con thì duyệt tiếp
      if (cat.children && cat.children.length > 0) {
        result = result.concat(buildOptions(cat.children, prefix + "-- "));
      }
    });

    return result;
  };
  const options = buildOptions(context?.catData || []);

  const handleSubmitSub = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formInput.name) {
      context.openAlertBox("error", "Vui lòng nhập tên danh mục");
      inputRefs.name.current.focus();
      setLoading(false);
      return;
    }
    if (selectedCategory == null) {
      context.openAlertBox("error", "Vui lòng chọn tên danh mục chính");
      setLoading(false);
      return;
    }
    const body = new FormData();
    body.append("name", formInput.name);
    body.append("parentCatName", selectedCategory.label);
    body.append("parentId", selectedCategory.value);
    try {
      const res = await postData("/api/category/create", body);
      if (res.success) {
        context.openAlertBox("success", res.message);

        const update = await getData("/api/category/");
        if (update.success) {
          context.setCatData(update.data);
        }

        setFormInput({ name: "", parentCatName: null, parentId: null });
        setOpen(false);
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
    <Flex className="px-5 flex justify-end">
      <Button color="danger" variant="solid" onClick={() => setOpen(true)}>
        Thêm danh mục phụ
      </Button>

      <Modal
        title="Thêm danh mục phụ"
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width="90%"
        footer={null}
        styles={{
          body: {
            maxHeight: "75vh",
            overflowY: "auto",
            padding: "10px",
          },
        }}
      >
        <hr />
        <div className="w-[80%]  mt-2">
          <form onSubmit={handleSubmitSub}>
            <div className="flex flex-col gap-2">
              <div className="text-[15px]">Tên danh mục</div>
              <Input
                size="large"
                name="name"
                ref={inputRefs.name}
                value={formInput.name}
                onChange={onChangeInput}
              />
            </div>
            <div className="flex flex-col gap-2 mt-3">
              <div className="text-[15px]">Danh mục chính</div>
              <Select
                size="large"
                placeholder="Chọn danh mục"
                options={options}
                value={selectedCategory}
                onChange={(value, option) => {
                  setSelectedCategory({ value, label: option.label });
                }}
              />
            </div>

            <div className="flex justify-center gap-3  mt-6">
              <Button onClick={() => setOpen(false)}>Hủy bỏ</Button>
              <Button type="primary" htmlType="submit" disabled={loading}>
                {loading ? (
                  <div className="flex gap-2">
                    <Spin /> Đang xử lí...
                  </div>
                ) : (
                  "Thêm mới"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </Flex>
  );
}
