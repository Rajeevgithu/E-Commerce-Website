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
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: [],
    category: "",
    brand: "",
  });

  /* ================= FETCH ================= */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data || []);
      } catch {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* ================= ACTIONS ================= */

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      description: "",
      images: [],
      category: "",
      brand: "",
    });
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      description: product.description || "",
      images: [], // only NEW images
      category: product.category || "",
      brand: product.brand || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert("Failed to delete product");
    }
  };

  /* ================= IMAGE ADD ================= */

  const handleImageAdd = (e) => {
    const files = Array.from(e.target.files);

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));

    e.target.value = "";
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);

    if (formData.category) data.append("category", formData.category);
    if (formData.brand) data.append("brand", formData.brand);

    formData.images.forEach((img) => {
      data.append("images", img);
    });

    try {
      let res;

      if (editingProduct) {
        res = await api.put(
          `/products/${editingProduct._id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        setProducts((prev) =>
          prev.map((p) =>
            p._id === editingProduct._id ? res.data : p
          )
        );
      } else {
        res = await api.post("/products", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setProducts((prev) => [...prev, res.data]);
      }

      setShowModal(false);
      setEditingProduct(null);
    } catch {
      alert("Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= FILTER ================= */

  const filteredProducts = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p className="text-gray-500">Loading products...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  /* ================= UI ================= */

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-sm text-gray-500">
            Manage all machinery and industrial products
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* SEARCH */}
      <div className="max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left">Product</th>
              <th className="px-6 py-4 text-left">Description</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 flex items-center gap-3">
  <img
    src={product.images?.[0] || "/placeholder.png"}
    alt={product.name}
    className="h-12 w-12 rounded-lg object-cover"
  />
  <span className="font-medium">{product.name}</span>
</td>


                <td className="px-6 py-4 text-gray-600 truncate max-w-sm">
                  {product.description}
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleEdit(product)}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl">
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Product Name"
                className="w-full border p-2 rounded"
                required
              />

              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Description"
                className="w-full border p-2 rounded"
                required
              />

              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full border p-2 rounded"
              >
                <option value="">Select Category</option>
                <option value="Consumable Items">Consumable Items</option>
                <option value="Testing Products">Testing Products</option>
                <option value="Paint & Coating">Paint & Coating</option>
              </select>

              <input
  type="file"
  accept="image/*"
  multiple
  onChange={handleImageAdd}
/>


              {formData.images.length > 0 && (
                <div className="grid grid-cols-5 gap-4">
                  {formData.images.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="h-28 w-full object-contain border rounded"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            images: formData.images.filter(
                              (_, i) => i !== index
                            ),
                          })
                        }
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  disabled={submitting}
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 disabled:opacity-60"
                >
                  {submitting ? "Saving..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
