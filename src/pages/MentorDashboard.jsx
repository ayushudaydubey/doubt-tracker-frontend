import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../services/api";

const MentorDashboard = () => {
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [doubtsPerPage, setDoubtsPerPage] = useState(12);
  const [totalDoubts, setTotalDoubts] = useState(0);
  const [filterStatus, setFilterStatus] = useState('all');
  const [assignedOnly, setAssignedOnly] = useState(false);

  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        setLoading(true);
        const params = {
          page: currentPage,
          limit: doubtsPerPage,
        };
        if (filterStatus !== 'all') params.status = filterStatus;
        if (assignedOnly) params.assigned = 'mine';

        const res = await axiosInstance.get('/all-doubts', { params });
        setDoubts(res.data.data || []);
        setTotalDoubts(res.data.meta?.total || 0);
      } catch (err) {
        console.error("Failed to load doubts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoubts();
  }, [currentPage, doubtsPerPage, filterStatus, assignedOnly]);

  const getStatusTag = (doubt) => {
    if (doubt.status === "resolved") 
      return { label: "SOLVED", className: "bg-gradient-to-r from-green-500 to-emerald-600", icon: "✓" };
    if (doubt.status === "in-progress") 
      return { label: "IN PROGRESS", className: "bg-gradient-to-r from-orange-500 to-amber-600", icon: "⟳" };
    return { label: "PENDING", className: "bg-gradient-to-r from-red-500 to-rose-600", icon: "!" };
  };

  const indexOfLast = currentPage * doubtsPerPage;
  const indexOfFirst = indexOfLast - doubtsPerPage;
  const currentDoubts = doubts; // server already paginates
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
              Mentor Dashboard
            </h2>
            <p className="text-gray-400 text-xs">Manage and track all student doubts</p>
          </div>
          <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-700">
            <span className="text-gray-400 text-xs">Total Doubts:</span>
            <span className="text-green-400 font-bold text-sm">{doubts.length}</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center min-h-[400px]">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
            <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin absolute top-0 left-0" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="mt-3 text-gray-400 text-sm animate-pulse">Loading doubts...</p>
        </div>
      ) : doubts.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-900/50 rounded-2xl border border-gray-800 mx-3">
          <div className="text-5xl mb-3">📚</div>
          <p className="text-gray-500 text-base">No doubts available yet.</p>
          <p className="text-gray-600 text-xs mt-1">Check back later for student queries.</p>
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="max-w-7xl mx-auto px-3 mb-2 flex items-center justify-between gap-2 flex-wrap">
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

            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-300">Assigned to me</label>
              <input type="checkbox" checked={assignedOnly} onChange={(e) => { setAssignedOnly(e.target.checked); setCurrentPage(1); }} />
            </div>
          </div>

          {/* Cards Flexbox Layout */}
          <div className="max-w-7xl mx-auto px-3">
            <div className="flex flex-wrap gap-2">
              {currentDoubts.map((doubt) => {
                const { label, className, icon } = getStatusTag(doubt);
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
                            alt="doubt preview" 
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

                      {/* Action Button */}
                      <Link 
                        to={`/doubts/mentor/${doubt._id}`} 
                        className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 px-2 py-1 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 group/btn"
                      >
                        <span>View Details</span>
                        <svg className="w-2.5 h-2.5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
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
              <span className="text-green-400 font-semibold">{doubts.length}</span> doubts
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default MentorDashboard;