import React, { useState } from "react";
import "./style.css";

import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import AddSubCategory from "../../components/AddSubCategory";
import { Button, Flex, Menu, Select } from "antd";
import { MyContext } from "../../App";
import { useContext } from "react";
import { useMemo } from "react";

import { RiArrowRightSLine, RiArrowDownSLine } from "react-icons/ri";
import DeleteCategory from "../../components/DeleteCategory";
import { getData, putData } from "../../untils/api";

const CategoryList = ({
  categories,
  level = 0,
  fetchData,
  options,
  context,
}) => {
  const [expanded, setExpanded] = useState({}); // lưu trạng thái mở/đóng
  const [editingId, setEditingId] = useState(null);
  const [parentId, setParentId] = useState(null);
  const [name, setName] = useState("");
  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const handleSubmit = async (e, catId) => {
    e.preventDefault();

    const formData = {
      parentId,
      name,
    };

    try {
      const res = await putData(`/api/category/updateSub/${catId}`, formData);
      if (res.success) {
        context.openAlertBox("success", res.message);
        fetchData();
        setEditingId(null);
      }
    } catch (error) {
      if (error.response) {
        context.openAlertBox("error", error.response.data.message);
      } else {
        context.openAlertBox("error", "Không thể kết nối server!");
      }
    }
  };
  return (
    <ul>
      {categories.map((cat) => {
        const hasChildren = cat.children?.length > 0;
        const isOpen = expanded[cat._id];
        const isRoot = !cat.parentId; // true nếu là danh mục chính
        const isEditing = editingId === cat._id;
        return (
          <li key={`${cat._id}-${level}`}>
            <div
              className={`flex justify-between items-center p-2 rounded ${
                level === 0
                  ? "bg-gray-300 text-[15px] text-[#ff5252] font-[500] mb-2"
                  : "bg-gray-100 mb-1"
              }`}
            >
              {isEditing ? (
                <div className="ml-10 flex gap-2">
                  <form onSubmit={(e) => handleSubmit(e, cat._id)}>
                    <div className="flex gap-2">
                      <Select
                        value={cat.parentCatName}
                        style={{ width: 170 }}
                        options={options}
                        onChange={(value) => setParentId(value)}
                      />

                      <input
                        type="text"
                        defaultValue={cat.name}
                        className="border px-2 py-1 rounded"
                        onChange={(e) => setName(e.target.value)}
                      />
                      <Button
                        htmlType="submit"
                        color="cyan"
                        variant="solid"
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        Cập nhật
                      </Button>
                    </div>
                  </form>
                  <Button
                    color="danger"
                    variant="solid"
                    onClick={() => setEditingId(null)}
                  >
                    Hủy
                  </Button>
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="ml-10">
                    {"-- ".repeat(level) + cat.name}
                  </span>
                </div>
              )}

              <div className="flex gap-3 text-gray-600 items-center">
                <div className="flex gap-2">
                  {/* chỉ hiện khi là danh mục con */}
                  {level > 0 && !isEditing && (
                    <>
                      <button>
                        <RiEdit2Line
                          className="text-[17px]"
                          onClick={() => setEditingId(cat._id)}
                        />
                      </button>
                      <button>
                        <DeleteCategory
                          category={cat._id}
                          onSuccess={fetchData}
                        />
                      </button>
                    </>
                  )}
                </div>

                {hasChildren && (
                  <button
                    type="button"
                    onClick={() => toggleExpand(cat._id)}
                    className="text-gray-600"
                  >
                    {isOpen ? (
                      <RiArrowDownSLine className="text-[18px]" />
                    ) : (
                      <RiArrowRightSLine className="text-[18px]" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* render children khi đang mở */}
            {isOpen && hasChildren && (
              <CategoryList
                categories={cat.children}
                level={level + 1}
                fetchData={fetchData}
                options={options}
                context={context}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default function SubCategory() {
  const [loading, setLoading] = useState(false);

  const context = useContext(MyContext);

  const categories = context.catData || [];
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
  const options = buildOptions(categories);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getData("/api/category/");

      if (res.success) {
        context.setCatData(res.data);
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
    <div className="bg-white p-2 rounded-md shadow-md">
      <div className="px-2 py-4 text-[20px] font-[600] text-[#ff5252] uppercase">
        Danh mục phụ sản phẩm
      </div>
      <Flex gap="middle" vertical>
        <AddSubCategory />
        <div>
          <CategoryList
            categories={categories}
            fetchData={fetchData}
            options={options}
            context={context}
          />
        </div>
      </Flex>
    </div>
  );
}
