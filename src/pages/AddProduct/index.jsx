import React, { useState } from "react";
import Swal from "sweetalert2";
import ProductService from "../../services/product.service";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    price: "",
    category: "",
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("file", formData.image);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    try {
      await ProductService.addProduct(formDataToSend);
      Swal.fire({
        title: "Success!",
        text: "Product added successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">🛒 Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            placeholder="Enter product name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            placeholder="Enter product description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-medium">Upload Image</label>
          <input
            type="file"
            name="image"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 w-full h-auto max-h-64 object-cover rounded-lg border"
            />
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 font-medium">Price (THB)</label>
          <input
            type="number"
            name="price"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium">Category</label>
          <select
            name="category"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Gadgets">Gadgets</option>
            <option value="Clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
            <option value="Swag">Swag</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Add Product ✅
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
