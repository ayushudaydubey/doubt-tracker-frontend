import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../services/api";
import { toast } from "react-toastify";

const StudentDashboard = () => {
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        const res = await axiosInstance.get("/doubts");
        setDoubts(res.data);
      } catch (err) {
        console.error("Failed to load student doubts:", err);
        toast.error("Failed to fetch doubts");
      } finally {
        setLoading(false);
      }
    };
    fetchDoubts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doubt?")) return;

    try {
      await axiosInstance.delete(`/doubts/${id}`);
      setDoubts((prev) => prev.filter((d) => d._id !== id));
      toast.success("Doubt deleted successfully");
    } catch (err) {
      console.error("Failed to delete doubt:", err);
      toast.error("Error deleting doubt");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "resolved":
        return "bg-green-500";
      case "in-progress":
        return "bg-orange-500";
      default:
        return "bg-red-500";
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 px-4 pt-28">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold text-orange-500 mb-4 md:mb-0">
          Your Submitted Doubts
        </h2>
        <Link
          to="/doubts/create"
          className="bg-orange-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-orange-600 transition"
        >
           Create New Doubt
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : doubts.length === 0 ? (
        <p className="text-gray-600 text-center">No doubts submitted yet.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {doubts.map((doubt) => (
            <div
              key={doubt._id}
              className="bg-white rounded-2xl shadow-lg p-6 "
            >
              <h3 className="text-xl font-semibold mb-2">{doubt.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {doubt.description?.slice(0, 15)}...
              </p>

              {doubt.image && (
                <img
                  src={doubt.image}
                  alt="doubt"
                  className="rounded-lg mb-3 h-40 w-full object-cover"
                />
              )}

              <p className="text-xs text-gray-500 mb-2">
                Submitted: {new Date(doubt.createdAt).toLocaleDateString()}
              </p>

              <span
                className={`text-white px-3 py-1 text-xs rounded-full ${getStatusColor(
                  doubt.status
                )}`}
              >
                {doubt.status.toUpperCase()}
              </span>

              <div className="mt-4 flex gap-4 text-sm font-medium">
                <Link
                  to={`/doubts/student/${doubt._id}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>
                {doubt.status !== "resolved" && (
                  <>
                    <Link
                      to={`/doubts/edit/${doubt._id}`}
                      className="text-orange-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(doubt._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
