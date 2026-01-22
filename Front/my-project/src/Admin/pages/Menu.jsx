import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Plus, Trash2, Edit, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";

export default function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const getAuthHeaders = () => {
    const token = localStorage.getItem("adminToken");
    return { Authorization: `Bearer ${token}` };
  };

  const fetchMenu = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/admin/menu", {
        headers: getAuthHeaders(),
      });
      setItems(data);
    } catch (error) {
      toast.error("Failed to load menu", { duration: 1000 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`http://localhost:3000/api/admin/menu/${deleteId}`, {
        headers: getAuthHeaders(),
      });
      toast.success("Item deleted", { duration: 1000 });
      setItems(items.filter((item) => item._id !== deleteId));
    } catch (error) {
      toast.error("Delete failed", { duration: 1000 });
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto font-['Oswald']">
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Item"
        description="Are you sure you want to delete this menu item? This action cannot be undone."
        confirmText="Delete"
        isDestructive={true}
      />

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-medium text-gray-900 tracking-wide uppercase">
            Menu Management
          </h1>
          <p className="text-gray-500 mt-1 tracking-wide">
            Manage your restaurant's dishes
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/menu/new")}
          className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition active:scale-95 text-base font-medium tracking-wide shadow-lg shadow-black/10"
        >
          <Plus className="w-5 h-5" />
          Add Item
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 text-gray-500 uppercase text-sm tracking-widest border-b border-gray-100">
              <tr>
                <th className="p-5 font-normal">Image</th>
                <th className="p-5 font-normal">Name</th>
                <th className="p-5 font-normal">Category</th>
                <th className="p-5 font-normal">Price</th>
                <th className="p-5 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="p-12 text-center text-gray-400 flex flex-col items-center"
                  >
                    <span className="mb-2 tracking-wide">No items found</span>
                    <button
                      onClick={() => navigate("/admin/menu/new")}
                      className="text-black text-base hover:underline font-medium tracking-wide"
                    >
                      Create one?
                    </button>
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50/80 transition-colors group"
                  >
                    <td className="p-4 pl-5">
                      <div className="h-16 w-16 bg-gray-100 rounded-lg overflow-hidden border border-gray-100">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-gray-300 text-xs font-semibold">
                            N/A
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-medium text-gray-900 text-lg tracking-wide">
                      {item.name}
                    </td>
                    <td className="p-4">
                      <span className="inline-flex px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-600 uppercase tracking-widest">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-gray-900 text-lg tracking-wide">
                      ${Number(item.price).toFixed(2)}
                    </td>
                    <td className="p-4 pr-5 text-right space-x-1">
                      <button
                        onClick={() => navigate(`/admin/menu/${item._id}/edit`)}
                        className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setDeleteId(item._id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
