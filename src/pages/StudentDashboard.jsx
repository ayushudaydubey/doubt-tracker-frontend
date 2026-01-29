import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../services/api";
import { toast } from "react-toastify";

const StudentDashboard = () => {
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [doubtsPerPage, setDoubtsPerPage] = useState(12);
  const [totalDoubts, setTotalDoubts] = useState(0);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        setLoading(true);
        const params = { page: currentPage, limit: doubtsPerPage };
        if (filterStatus !== 'all') params.status = filterStatus;
        const res = await axiosInstance.get('/doubts', { params });
        setDoubts(res.data.data || []);
        setTotalDoubts(res.data.meta?.total || 0);
      } catch {
        toast.error("Failed to fetch doubts");
      } finally {
        setLoading(false);
      }
    };
    fetchDoubts();
  }, [currentPage, doubtsPerPage, filterStatus]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;
    try {
      await axiosInstance.delete(`/doubts/${id}`);
      // refetch current page
      const params = { page: currentPage, limit: doubtsPerPage };
      if (filterStatus !== 'all') params.status = filterStatus;
      const res = await axiosInstance.get('/doubts', { params });
      setDoubts(res.data.data || []);
      setTotalDoubts(res.data.meta?.total || 0);
      toast.success("Ticket deleted successfully");
    } catch {
      toast.error("Delete failed");
    }
  };

  const getStatusTag = (doubt) => {
    if (doubt.status === "resolved") 
      return { label: "SOLVED", className: "bg-gradient-to-r from-green-500 to-emerald-600", icon: "✓" };
    if (doubt.status === "in-progress") 
      return { label: "IN PROGRESS", className: "bg-gradient-to-r from-orange-500 to-amber-600", icon: "⟳" };
    return { label: "PENDING", className: "bg-gradient-to-r from-red-500 to-rose-600", icon: "!" };
  };

  const indexOfLast = currentPage * doubtsPerPage;
  const indexOfFirst = indexOfLast - doubtsPerPage;
  const currentDoubts = doubts; // server paginates
  const totalPages = Math.ceil(totalDoubts / doubtsPerPage) || 1;

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-200 pt-20 pb-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-3 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-1">
              My Tickets
            </h2>
            <p className="text-gray-400 text-xs">Track and manage your doubt tickets</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-gray-800/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-700">
              <span className="text-gray-400 text-xs">Total:</span>
              <span className="text-green-400 font-bold text-sm ml-1.5">{doubts.length}</span>
            </div>
            <Link
              to="/doubts/create"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 group"
            >
              <svg className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Raise New Ticket
            </Link>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center min-h-[400px]">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
            <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin absolute top-0 left-0" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="mt-3 text-gray-400 text-sm animate-pulse">Loading your tickets...</p>
        </div>
      ) : doubts.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-900/50 rounded-2xl border border-gray-800 mx-3">
          <div className="text-5xl mb-3">🎫</div>
          <p className="text-gray-500 text-base">No tickets found.</p>
          <p className="text-gray-600 text-xs mt-1">Create your first ticket to get started!</p>
          <Link
            to="/doubts/create"
            className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Ticket
          </Link>
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="max-w-7xl mx-auto px-3 mb-2 flex items-center gap-2 flex-wrap">
            <div className="flex gap-2">
              {[
                { key: 'all', label: 'All' },
                { key: 'unresolved', label: 'Pending' },
                { key: 'in-progress', label: 'In Progress' },
                { key: 'resolved', label: 'Solved' },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => { setFilterStatus(tab.key); setCurrentPage(1); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${filterStatus === tab.key ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          {/* Cards Flexbox Layout */}
          <div className="max-w-7xl mx-auto px-3">
            <div className="flex flex-wrap gap-2">
              {currentDoubts.map((doubt) => {
                const { label, className, icon } = getStatusTag(doubt);
                const isResolved = doubt.status === "resolved";
                
                return (
                  <div 
                    key={doubt._id} 
                    className="group bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-1 w-[calc(25%-6px)] min-w-[180px] flex-shrink-0"
                  >
                    {/* Status Badge */}
                    <div className="p-2 pb-0 flex justify-between items-start">
                      <span className={`inline-flex items-center gap-1 text-[9px] font-bold text-white px-2 py-0.5 rounded-full ${className} shadow-lg`}>
                        <span>{icon}</span>
                        {label}
                      </span>
                      <span className="text-[9px] text-gray-500 bg-gray-800/70 px-1.5 py-0.5 rounded-full">
                        {new Date(doubt.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    {/* Image Section - Compact Square */}
                    {doubt.image && (
                      <div className="px-2 pt-1.5">
                        <div className="relative aspect-square w-full rounded-md overflow-hidden bg-gray-800 border border-gray-700 group-hover:border-green-500/30 transition-all">
                          <img 
                            src={doubt.image} 
                            alt="ticket preview" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="p-2">
                      <h3 className="text-xs font-bold mb-1 text-green-400 line-clamp-2 group-hover:text-green-300 transition-colors leading-tight">
                        {doubt.title}
                      </h3>

                      <p className="text-[10px] text-gray-400 mb-2 line-clamp-2 leading-relaxed">
                        {doubt.description}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex gap-1.5 flex-wrap">
                        <Link 
                          to={`/doubts/student/${doubt._id}`} 
                          className="inline-flex items-center gap-1 text-[10px] font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 px-2 py-1 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
                        >
                          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View
                        </Link>

                        {!isResolved && (
                          <button 
                            onClick={() => handleDelete(doubt._id)}
                            className="inline-flex items-center gap-1 text-[10px] font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 px-2 py-1 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30"
                          >
                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Bottom Accent Line */}
                    <div className="h-0.5 bg-gradient-to-r from-transparent via-green-500/20 to-transparent group-hover:via-green-500/50 transition-all"></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enhanced Pagination */}
          {totalPages > 1 && (
            <div className="max-w-7xl mx-auto mt-6 flex justify-center items-center gap-2 flex-wrap px-3">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 flex items-center gap-1.5"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Prev
              </button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => {
                  const pageNum = i + 1;
                  const isActive = currentPage === pageNum;
                  
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={i}
                        onClick={() => goToPage(pageNum)}
                        className={`min-w-[32px] px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 scale-110"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700 hover:border-orange-500/50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                    return <span key={i} className="px-1.5 text-gray-600 text-xs">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 flex items-center gap-1.5"
              >
                Next
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* Page Info */}
          <div className="text-center mt-4">
            <p className="text-[10px] text-gray-500">
              Showing <span className="text-green-400 font-semibold">{indexOfFirst + 1}</span> to{" "}
              <span className="text-green-400 font-semibold">{Math.min(indexOfLast, doubts.length)}</span> of{" "}
              <span className="text-green-400 font-semibold">{doubts.length}</span> tickets
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentDashboard;