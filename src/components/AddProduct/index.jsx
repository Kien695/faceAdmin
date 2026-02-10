import { Editor } from "@tinymce/tinymce-react";
import { Button, Image, Input, Modal, Select, Spin, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useContext, useState } from "react";
import { MyContext } from "../../App";
import { postData } from "../../untils/api";
import { CgProductHunt } from "react-icons/cg";
import { FaPlus } from "react-icons/fa6";

export default function AddProduct({ onSuccess }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const context = useContext(MyContext);
  const handleClick = () => {
    if (!context?.userData?.role?.permissions.includes("product_create")) {
      context.openAlertBox("error", "Bạn không có quyền thêm danh mục!");
      return;
    } else {
      setOpen(true);
    }
  };
  //hình
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
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

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: [],
    brand: "",
    price: "",
    discountPercentage: "",
    countInStock: "",
    rating: "",
    category: "",
    isFeatured: false,
    size: [],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();

    // append các trường khác
    Object.keys(formData).forEach((key) => {
      if (key === "images") return;

      const value = formData[key];

      if (key === "price") {
        data.append("price", Number(value) * 1000);
      } else if (Array.isArray(value)) {
        value.forEach((item) => data.append(`${key}[]`, item));
      } else {
        data.append(key, value); // append bình thường cho string/number
      }
    });

    // append file thực từ fileList
    fileList.forEach((file) => {
      if (file.originFileObj) {
        data.append("images", file.originFileObj);
      }
    });

    try {
      const res = await postData("/api/product/create", data);
      if (res.success) {
        context.openAlertBox("success", res.message);
        setFormData({
          name: "",
          description: "",
          images: [],
          brand: "",
          price: "",
          discountPercentage: "",
          category: "",
          catId: "",
          countInStock: "",
          rating: "",
          isFeatured: false,
          size: [],
        });
        if (onSuccess) {
          onSuccess();
        }
        setOpen(false);
      }
    } catch (error) {
      if (error.response) {
        context.openAlertBox("error", error.response.data.message);
      } else {
        context.openAlertBox("error", "Không thể kết nối server!");
      }
    } finally {
      setLoading(false); // luôn chạy
    }
  };
  return (
    <>
      <Button color="danger" variant="solid" onClick={handleClick}>
        <span className="hidden sm:inline">Thêm sản phẩm</span>
        {/* Hiện dấu + khi màn hình < sm */}
        <span className="sm:hidden text-[20px] flex gap-1 items-center justify-center">
          <FaPlus />
          <CgProductHunt />
        </span>
      </Button>
      <Modal
        title="Thêm sản phẩm"
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
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <div className="text-[15px]">Tên sản phẩm</div>
              <Input size="large" name="name" onChange={handleChange} />
            </div>

            <div className="flex items-center flex-wrap gap-8">
              <div>
                <div className="text-[15px]">Danh mục</div>
                <Select
                  size="large"
                  value={formData.category}
                  style={{ width: 250 }}
                  options={options}
                  onChange={(value, option) => {
                    setFormData((prev) => ({
                      ...prev,
                      category: value,
                    }));
                  }}
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="text-[15px]">Giá</div>
                <Input
                  size="large"
                  name="price"
                  className="w-[250px]"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[15px]">Giảm giá</div>
                <Input
                  size="large"
                  name="discountPercentage"
                  className="w-[250px]"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[15px]">Nổi bật</div>
                <Select
                  size="large"
                  defaultValue="Có"
                  style={{ width: 250 }}
                  options={[
                    { value: "true", label: "Có" },
                    { value: "false", label: "Không" },
                  ]}
                  onChange={(value) => {
                    setFormData((prev) => ({
                      ...prev,
                      isFeatured: value,
                    }));
                  }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[15px]">Thương hiệu</div>
                <Input
                  size="large"
                  name="brand"
                  className="w-[250px]"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[15px]">Kho</div>
                <Input
                  size="large"
                  name="countInStock"
                  className="w-[250px]"
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="text-[15px]">Kích thước</div>
                <Select
                  mode="multiple"
                  allowClear
                  size="large"
                  style={{ width: 250 }}
                  options={[
                    { value: "M", label: "M" },
                    { value: "S", label: "S" },
                    { value: "L", label: "L" },
                    { value: "XL", label: "XL" },
                  ]}
                  onChange={(values) => {
                    setFormData((prev) => ({
                      ...prev,
                      size: values,
                    }));
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-[15px]">Mô tả sản phẩm</div>
              <Editor
                apiKey="0i4qgvltt8xiuzo0ebuptffq6jiefu5i2annb2aysu6abom0"
                value={formData.description}
                onEditorChange={(content) => {
                  setFormData((prev) => ({ ...prev, description: content }));
                }}
                init={{
                  height: 300,
                  plugins:
                    "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                  toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-[15px]">Upload ảnh</div>
              <Upload
                listType="picture-card"
                fileList={fileList}
                beforeUpload={() => false} // không upload tự động
                onPreview={handlePreview}
                onChange={({ fileList: newFileList }) => {
                  setFileList(newFileList); // để Upload render preview
                  setFormData((prev) => ({
                    ...prev,
                    images: newFileList.map((file) => ({
                      url: file.url || file.uploadResponse?.url,
                      public_id:
                        file.public_id || file.uploadResponse?.public_id,
                    })),
                  }));
                }}
              >
                {formData.images.length >= 5 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button onClick={() => setOpen(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit" disabled={loading}>
                {loading ? (
                  <div className="flex gap-2">
                    <Spin /> Đang xử lí
                  </div>
                ) : (
                  "Thêm mới"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
