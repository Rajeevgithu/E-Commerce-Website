import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, X } from "lucide-react";
import api from "../../api/axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    brand: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* -------------------- Actions -------------------- */

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
      brand: "",
    });
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: Array.isArray(product.image)
        ? product.image[0]
        : product.image,
      category: product.category || "",
      brand: product.brand || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.delete(`/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch {
      alert("Failed to delete product");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      image: [formData.image],
      category: formData.category,
      brand: formData.brand,
    };

    try {
      if (editingProduct) {
        const response = await api.put(
          `/products/${editingProduct._id}`,
          payload
        );
        setProducts(
          products.map((p) =>
            p._id === editingProduct._id ? response.data : p
          )
        );
      } else {
        const response = await api.post("/products", payload);
        setProducts([...products, response.data]);
      }

      setShowModal(false);
      setEditingProduct(null);
    } catch {
      alert("Failed to save product");
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* -------------------- UI -------------------- */

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Products
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage all machinery and industrial products
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 
          bg-indigo-600 text-white rounded-lg font-semibold 
          hover:bg-indigo-500 transition"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 
            rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left text-gray-600">
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">Description</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Created</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {loading && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  Loading products…
                </td>
              </tr>
            )}

            {!loading && filteredProducts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}

            {filteredProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        Array.isArray(product.image)
                          ? product.image[0]
                          : product.image
                      }
                      alt={product.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {product.category || "Uncategorized"}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-gray-600 max-w-sm truncate">
                  {product.description}
                </td>

                <td className="px-6 py-4 text-gray-900">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(product.price)}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {new Date(product.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-2 rounded-lg text-indigo-600 hover:bg-indigo-50"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {[
                ["Product Name", "name"],
                ["Description", "description"],
                ["Price", "price"],
                ["Image URL", "image"],
              ].map(([label, field]) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  {field === "description" ? (
                    <textarea
                      rows={3}
                      value={formData[field]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field]: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  ) : (
                    <input
                      type={field === "price" ? "number" : "text"}
                      value={formData[field]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field]: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      required={field !== "image"}
                    />
                  )}
                </div>
              ))}

              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="h-28 w-28 rounded-lg object-cover border"
                />
              )}

              <div className="flex justify-end gap-3 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-500"
                >
                  {editingProduct ? "Update Product" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
