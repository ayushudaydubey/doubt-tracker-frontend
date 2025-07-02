import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../services/api";

const MentorDashboard = () => {
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const doubtsPerPage = 6;

  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        const res = await axiosInstance.get("/all-doubts");
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setDoubts(sorted);
      } catch (err) {
        console.error("Failed to load doubts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoubts();
  }, []);

  const getStatusTag = (doubt) => {
    if (doubt.response?.text) {
      return { label: "SOLVED", className: "bg-green-500" };
    } else {
      return { label: "NOT CLEARED", className: "bg-red-500" };
    }
  };

  const indexOfLast = currentPage * doubtsPerPage;
  const indexOfFirst = indexOfLast - doubtsPerPage;
  const currentDoubts = doubts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(doubts.length / doubtsPerPage);

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 px-4 pt-26 pb-10">
      <h2 className="text-3xl font-semibold text-orange-500 mb-8 text-left">
        Mentor Doubts Dashboard
      </h2>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="w-12 h-12 border-4 border-orange-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : doubts.length === 0 ? (
        <p className="text-gray-600 text-center">No doubts available.</p>
      ) : (
        <>
       
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {currentDoubts.map((doubt) => {
              const { label, className } = getStatusTag(doubt);
              return (
                <div
                  key={doubt._id}
                  className="bg-white rounded-2xl shadow-lg p-6  relative"
                >
                  <span
                    className={`absolute top-3 right-3 text-xs font-semibold text-white px-3 py-1 rounded-full ${className}`}
                  >
                    {label}
                  </span>

                  <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                    {doubt.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                    {doubt.description}
                  </p>

                  {doubt.image && (
                    <img
                      src={doubt.image}
                      alt="doubt"
                      className="rounded-lg mb-3 h-40 w-full object-cover"
                    />
                  )}

                  <p className="text-xs text-gray-500 mb-2">
                    Submitted:{" "}
                    {new Date(doubt.createdAt).toLocaleDateString()}
                  </p>

                  <div className="mt-4 flex gap-4 text-sm font-medium">
                    <Link
                      to={`/doubts/mentor/${doubt._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10 gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-orange-200 hover:bg-orange-300 text-sm disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-4 py-2 rounded-lg text-sm ${
                  currentPage === i + 1
                    ? "bg-orange-500 text-white"
                    : "bg-white border"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-orange-200 hover:bg-orange-300 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MentorDashboard;
