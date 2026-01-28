import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../services/api";

const MentorDashboard = () => {
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const doubtsPerPage = 9;

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
    if (doubt.status === "resolved") 
      return { label: "SOLVED", className: "bg-gradient-to-r from-green-500 to-emerald-600", icon: "✓" };
    if (doubt.status === "in-progress") 
      return { label: "IN PROGRESS", className: "bg-gradient-to-r from-orange-500 to-amber-600", icon: "⟳" };
    return { label: "PENDING", className: "bg-gradient-to-r from-red-500 to-rose-600", icon: "!" };
  };

  const indexOfLast = currentPage * doubtsPerPage;
  const indexOfFirst = indexOfLast - doubtsPerPage;
  const currentDoubts = doubts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(doubts.length / doubtsPerPage);

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-200 px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-2">
              Mentor Dashboard
            </h2>
            <p className="text-gray-400 text-sm">Manage and track all student doubts</p>
          </div>
          <div className="flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700">
            <span className="text-gray-400 text-sm">Total Doubts:</span>
            <span className="text-green-400 font-bold text-lg">{doubts.length}</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center min-h-[400px]">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
            <div className="w-16 h-16 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin absolute top-0 left-0" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="mt-4 text-gray-400 animate-pulse">Loading doubts...</p>
        </div>
      ) : doubts.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-900/50 rounded-2xl border border-gray-800">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-gray-500 text-lg">No doubts available yet.</p>
          <p className="text-gray-600 text-sm mt-2">Check back later for student queries.</p>
        </div>
      ) : (
        <>
          {/* Cards Grid */}
          <div className="max-w-3xl mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {currentDoubts.map((doubt) => {
              const { label, className, icon } = getStatusTag(doubt);
              return (
                <div 
                  key={doubt._id} 
                  className="group bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Status Badge */}
                  <div className="p-3 pb-0 flex justify-between items-start">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold text-white px-2.5 py-1 rounded-full ${className} shadow-lg`}>
                      <span>{icon}</span>
                      {label}
                    </span>
                    <span className="text-[10px] text-gray-500 bg-gray-800/70 px-2 py-1 rounded-full">
                      {new Date(doubt.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  {/* Image Section - Square */}
                  {doubt.image && (
                    <div className="px-3 pt-2">
                      <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gray-800 border border-gray-700 group-hover:border-green-500/30 transition-all">
                        <img 
                          src={doubt.image} 
                          alt="doubt preview" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    </div>
                  )}

                  {/* Content Section */}
                  <div className="p-3">
                    <h3 className="text-sm font-bold mb-1.5 text-green-400 line-clamp-2 group-hover:text-green-300 transition-colors leading-tight">
                      {doubt.title}
                    </h3>

                    <p className="text-xs text-gray-400 mb-3 line-clamp-2 leading-relaxed">
                      {doubt.description}
                    </p>

                    {/* Action Button */}
                    <Link 
                      to={`/doubts/mentor/${doubt._id}`} 
                      className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 px-3 py-1.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 group/btn"
                    >
                      <span>View Details</span>
                      <svg className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="h-1 bg-gradient-to-r from-transparent via-green-500/20 to-transparent group-hover:via-green-500/50 transition-all"></div>
                </div>
              );
            })}
          </div>

          {/* Enhanced Pagination */}
          {totalPages > 1 && (
            <div className="max-w-7xl mx-auto mt-10 flex justify-center items-center gap-2 flex-wrap">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Prev
              </button>

              <div className="flex gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => {
                  const pageNum = i + 1;
                  const isActive = currentPage === pageNum;
                  
                  // Show first, last, current, and nearby pages
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={i}
                        onClick={() => goToPage(pageNum)}
                        className={`min-w-[40px] px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 scale-110"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700 hover:border-orange-500/50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                    return <span key={i} className="px-2 text-gray-600">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 flex items-center gap-2"
              >
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* Page Info */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              Showing <span className="text-green-400 font-semibold">{indexOfFirst + 1}</span> to{" "}
              <span className="text-green-400 font-semibold">{Math.min(indexOfLast, doubts.length)}</span> of{" "}
              <span className="text-green-400 font-semibold">{doubts.length}</span> doubts
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default MentorDashboard;