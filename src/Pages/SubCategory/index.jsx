import React, { useState } from "react";
import "./style.css";

import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import AddSubCategory from "../../components/AddSubCategory";
import { Flex, Menu } from "antd";
import { MyContext } from "../../App";
import { useContext } from "react";
import { useMemo } from "react";

import { RiArrowRightSLine, RiArrowDownSLine } from "react-icons/ri";

const CategoryList = ({ categories, level = 0 }) => {
  const [expanded, setExpanded] = useState({}); // lưu trạng thái mở/đóng

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <ul>
      {categories.map((cat) => {
        const hasChildren = cat.children?.length > 0;
        const isOpen = expanded[cat._id];

        return (
          <li key={`${cat._id}-${level}`} className="mb-2">
            <div
              onClick={() => hasChildren && toggleExpand(cat._id)}
              className={`flex justify-between items-center p-2 rounded cursor-pointer ${
                level === 0 ? "bg-gray-100 text-[15px] font-[500]" : "bg-white"
              }`}
            >
              <div className="flex items-center gap-2">
                {/* icon mũi tên chỉ hiện khi có children */}

                <span className="ml-10">{"-- ".repeat(level) + cat.name}</span>
              </div>

              <div className="flex gap-3 text-gray-600">
                <div className="flex gap-2">
                  <button>
                    <RiEdit2Line className="text-[17px]" />
                  </button>
                  <button>
                    <RiDeleteBin5Line className="text-[17px]" />
                  </button>
                </div>
                {hasChildren && (
                  <span className="text-gray-600">
                    {isOpen ? (
                      <RiArrowDownSLine className="text-[18px]" />
                    ) : (
                      <RiArrowRightSLine className="text-[18px]" />
                    )}
                  </span>
                )}
              </div>
            </div>

            {/* render children khi đang mở */}
            {isOpen && hasChildren && (
              <CategoryList categories={cat.children} level={level + 1} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default function SubCategory() {
  const context = useContext(MyContext);

  // Không cần categoryTree nữa vì API đã trả về children
  const categories = context.catData || [];

  return (
    <div className="bg-white p-2 rounded-md shadow-md">
      <div className="px-2 py-4 text-[20px] font-[600] text-[#ff5252]">
        Danh mục phụ sản phẩm
      </div>
      <Flex gap="middle" vertical>
        <AddSubCategory />
        <div>
          <CategoryList categories={categories} />
        </div>
      </Flex>
    </div>
  );
}
