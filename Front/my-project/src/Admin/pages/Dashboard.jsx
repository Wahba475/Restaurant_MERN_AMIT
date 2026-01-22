import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  UtensilsCrossed,
  CalendarCheck,
  TrendingUp,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    bookings: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("adminToken");
    return { Authorization: `Bearer ${token}` };
  };

  const fetchData = async () => {
    try {
      // Parallel data fetching for dashboard stats
      const [menuRes, ordersRes, bookingsRes, usersRes] = await Promise.all([
        axios.get("http://localhost:3000/api/admin/menu", {
          headers: getAuthHeaders(),
        }),
        axios.get("http://localhost:3000/api/admin/orders", {
          headers: getAuthHeaders(),
        }),
        axios.get("http://localhost:3000/api/admin/bookings", {
          headers: getAuthHeaders(),
        }),
        axios.get("http://localhost:3000/api/admin/users", {
          headers: getAuthHeaders(),
        }),
      ]);

      // Calculate revenue (sum of order totals)
      const totalRevenue = ordersRes.data.reduce(
        (acc, order) => acc + (order.totalAmount || 0),
        0,
      );

      setStats({
        revenue: totalRevenue,
        orders: ordersRes.data.length,
        bookings: bookingsRes.data.length,
        users: usersRes.data.length,
      });
    } catch (error) {
      console.error("Dashboard Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const statCards = [
    {
      label: "Total Revenue",
      value: `$${stats.revenue.toFixed(2)}`,
      icon: TrendingUp,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Total Orders",
      value: stats.orders,
      icon: UtensilsCrossed,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Total Bookings",
      value: stats.bookings,
      icon: CalendarCheck,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Total Users",
      value: stats.users,
      icon: Users,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto font-['Oswald']">
      <div className="mb-8">
        <h1 className="text-3xl font-medium text-black uppercase tracking-tight">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-1 text-sm tracking-wide">
          Real-time overview of your restaurant
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-500 tracking-wide">
              {stat.label}
            </h3>
            <p className="text-2xl font-medium text-gray-900 mt-1 tracking-wide">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
