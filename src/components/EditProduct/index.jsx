import { Button, Image, Input, Modal, Select, Spin, Upload } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { PlusOutlined } from "@ant-design/icons";
import { MyContext } from "../../App";
import { Editor } from "@tinymce/tinymce-react";
import { patchData } from "../../untils/api";
export default function EditProduct({ product, onSuccess }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const context = useContext(MyContext);
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
    name: product?.name,
    description: product?.description,
    images: product?.images || [],
    brand: product?.brand,
    price: product?.price,
    discountPercentage: product?.discountPercentage,
    countInStock: product?.countInStock,

    category: product?.category?._id,
    isFeatured: product?.isFeatured,
    size: product?.size,
  });
  // Khi có formData.images -> convert thành fileList cho Upload hiển thị
  useEffect(() => {
    if (formData.images && formData.images.length > 0) {
      setFileList(
        formData.images.map((img, i) => ({
          uid: img.public_id || `-${i}`,
          name: `image-${i}`,
          status: "done",
          url: img.url,
          public_id: img.public_id,
        }))
      );
    }
  }, [formData.images]);

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

    try {
      const data = new FormData();

      // append các trường khác
      Object.keys(formData).forEach((key) => {
        if (key !== "images") {
          data.append(key, formData[key]);
        }
      });

      // Gom ảnh cũ
      const oldImages = fileList
        .filter((file) => !file.originFileObj) // ảnh cũ
        .map((file) => ({
          url: file.url,
          public_id: file.public_id,
        }));
      data.append("oldImages", JSON.stringify(oldImages));

      // Ảnh mới
      fileList
        .filter((file) => file.originFileObj)
        .forEach((file) => data.append("images", file.originFileObj));

      // Gọi BE
      const res = await patchData(`/api/product/update/${product._id}`, data);

      if (res.success) {
        context.openAlertBox("success", res.message);

        // 🚀 Cập nhật lại formData + fileList từ ảnh Cloudinary trả về
        if (res.data?.images) {
          setFormData((prev) => ({
            ...prev,
            images: res.data.images,
          }));

          setFileList(
            res.data.images.map((img, i) => ({
              uid: img.public_id || `-${i}`,
              name: `image-${i}`,
              status: "done",
              url: img.url,
              public_id: img.public_id,
            }))
          );
        }

        if (onSuccess) onSuccess();
        setOpen(false);
      }
    } catch (error) {
      context.openAlertBox(
        "error",
        error.response
          ? error.response.data.message
          : "Không thể kết nối server!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AiFillEdit
        className="text-[16px] cursor-pointer"
        onClick={() => setOpen(true)}
      />
      <Modal
        title="Chỉnh sửa sản phẩm"
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
              <Input
                size="large"
                value={formData.name}
                name="name"
                onChange={handleChange}
              />
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
                  value={formData.price}
                  className="w-[250px]"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[15px]">Giảm giá</div>
                <Input
                  size="large"
                  value={formData.discountPercentage}
                  name="discountPercentage"
                  className="w-[250px]"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[15px]">Nổi bật</div>
                <Select
                  size="large"
                  value={formData.isFeatured ? "Có" : "Không"}
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
                  value={formData.brand}
                  className="w-[250px]"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[15px]">Kho</div>
                <Input
                  size="large"
                  name="countInStock"
                  value={formData.countInStock}
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
                  value={formData.size}
                  style={{ width: 250 }}
                  options={[
                    { value: "m", label: "M" },
                    { value: "s", label: "S" },
                    { value: "l", label: "L" },
                    { value: "xl", label: "XL" },
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
                      url:
                        file.url || // ảnh cũ có url từ server
                        (file.originFileObj
                          ? URL.createObjectURL(file.originFileObj) // ảnh mới chọn
                          : file.thumbUrl || null), // fallback preview của antd
                      public_id: file.public_id || null,
                    })),
                  }));
                }}
              >
                {fileList.length >= 5 ? null : uploadButton}
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
