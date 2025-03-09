import React, { useEffect, useState } from "react";
import ProductService from "../../services/product.service";
import Swal from "sweetalert2";

const index = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await ProductService.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await ProductService.deleteProduct(id);
        fetchProducts();
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the product.", "error");
      }
    }
  };

  const handleEdit = (product) => {
    setEditProduct({
      ...product,
      existingImage: product.image,
    });
    setSelectedFile(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditProduct((prevProduct) => ({
          ...prevProduct,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", editProduct.name);
    formData.append("description", editProduct.description);
    formData.append("price", editProduct.price);
    formData.append("category", editProduct.category);

    if (selectedFile) {
      formData.append("file", selectedFile);
    } else {
      formData.append("existingImage", editProduct.existingImage);
    }

    try {
      await ProductService.updateProduct(editProduct._id, formData);
      setEditProduct(null);

      // Reload products
      fetchProducts();

      Swal.fire("Updated!", "Product updated successfully.", "success");
    } catch (error) {
      Swal.fire("Error!", "Failed to update the product.", "error");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Manage Products</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg">
            <thead>
              <tr className="bg-red text-white">
                <th className="p-3 border">Image</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Description</th>
                <th className="p-3 border">Price (THB)</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-3">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="text-center">
                    <td className="p-3 border">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover mx-auto rounded-md"
                      />
                    </td>
                    <td className="p-3 border">{product.name}</td>
                    <td className="p-3 border">{product.category}</td>
                    <td className="p-3 border">{product.description}</td>
                    <td className="p-3 border whitespace-nowrap">
                      {product.price} THB
                    </td>

                    <td className="p-3 border">
                      <div className="flex justify-center space-x-2">
                        <button
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red text-white px-3 py-1 rounded"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {editProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            <label className="block">Product Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-3"
              value={editProduct.name}
              onChange={(e) =>
                setEditProduct({ ...editProduct, name: e.target.value })
              }
            />

            <label className="block">Category</label>
            <select
              className="w-full border p-2 rounded mb-3"
              value={editProduct.category}
              onChange={(e) =>
                setEditProduct({ ...editProduct, category: e.target.value })
              }
            >
              <option value="Gadgets">Gadgets</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
              <option value="Swag">Swag</option>
            </select>

            <label className="block">Description</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-3"
              value={editProduct.description}
              onChange={(e) =>
                setEditProduct({ ...editProduct, description: e.target.value })
              }
            />

            <label className="block">Price (THB)</label>
            <input
              type="number"
              className="w-full border p-2 rounded mb-3"
              value={editProduct.price}
              onChange={(e) =>
                setEditProduct({ ...editProduct, price: e.target.value })
              }
            />

            <label className="block">Upload Image</label>
            <input
              type="file"
              className="w-full border p-2 rounded mb-3"
              onChange={handleImageUpload}
            />
            <img
              src={editProduct.imagePreview || editProduct.existingImage}
              alt="Product Preview"
              className="w-32 h-32 object-cover mx-auto rounded-md mb-3"
            />

            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setEditProduct(null)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default index;
