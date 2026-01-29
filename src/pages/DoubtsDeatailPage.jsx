import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DoubtDetailPage = () => {
  const { id } = useParams();
  const [doubt, setDoubt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msgText, setMsgText] = useState("");
  const [msgFile, setMsgFile] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const images = useMemo(() => {
    if (!doubt) return [];
    const arr = [];
    if (doubt.image) arr.push(doubt.image);
    if (doubt.messages && doubt.messages.length) {
      doubt.messages.forEach((m) => {
        if (m.image) arr.push(m.image);
      });
    }
    return arr;
  }, [doubt]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") return setOpenIndex(null);
      if (e.key === "ArrowLeft") return setOpenIndex((i) => (i - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") return setOpenIndex((i) => (i + 1) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, images.length]);

  useEffect(() => {
    const fetchDoubt = async () => {
      try {
        const res = await axiosInstance.get(`/doubts/${id}`);
        setDoubt(res.data);
      } catch (err) {
        console.error("Error fetching doubt:", err);
        toast.error("Failed to load doubt details.");
      } finally {
        setLoading(false);
      }
    };
    fetchDoubt();
  }, [id]);

  const handleSendMessage = async () => {
    if (!msgText.trim() && !msgFile) return toast.warn("Enter message or attach image");
    try {
      const form = new FormData();
      form.append("text", msgText.trim());
      if (msgFile) form.append("image", msgFile);
      const res = await axiosInstance.post(`/doubts/${id}/messages`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setDoubt(res.data);
      setMsgText("");
      setMsgFile(null);
      toast.success("Message sent successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-black to-gray-900">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto" />
            <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin absolute top-0 left-1/2 -translate-x-1/2" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          </div>
          <p className="mt-4 text-gray-400 font-medium animate-pulse">Loading doubt details...</p>
        </div>
      </div>
    );
  }

  if (!doubt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-black to-gray-900 px-4">
        <div className="text-center bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8 max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-400 text-lg font-semibold mb-2">Doubt not found</p>
          <p className="text-gray-500">The requested doubt could not be located.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-200 px-3 py-20 pb-8">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Card */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-t-2xl shadow-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                Doubt Details - Mentor View
              </h2>
            </div>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold self-start sm:self-auto shadow-lg ${
              doubt.status === "resolved" 
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white" 
                : doubt.response 
                  ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white"
                  : "bg-gradient-to-r from-red-500 to-rose-600 text-white"
            }`}>
              {doubt.status === "resolved" ? (
                <>✓ Resolved</>
              ) : doubt.response ? (
                <>⟳ In Progress</>
              ) : (
                <>! Pending</>
              )}
            </span>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border-x border-gray-700/50 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 sm:p-6">
            {/* Left Column - Image */}
            {doubt.image && (
              <div className="order-1">
                <div className="relative rounded-xl overflow-hidden shadow-lg bg-gray-800 border border-gray-700 h-80 lg:h-[450px] group">
                  <img
                    src={doubt.image}
                    alt="Doubt"
                    className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                    onClick={() => {
                      const idx = images.findIndex((s) => s === doubt.image);
                      setOpenIndex(idx >= 0 ? idx : 0);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-lg text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to enlarge
                  </div>
                </div>
              </div>
            )}

            {/* Right Column - Details */}
            <div className={`order-2 space-y-4 ${!doubt.image ? 'lg:col-span-2' : ''}`}>
              {/* Student Information */}
              <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-700/30 rounded-xl p-4 backdrop-blur-sm">
                <h4 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Student Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="bg-gray-800/50 border border-gray-700/50 p-2.5 rounded-lg">
                    <span className="text-blue-400 font-medium block mb-1">Name</span>
                    <span className="text-gray-200">{doubt.student?.name || "N/A"}</span>
                  </div>
                  <div className="bg-gray-800/50 border border-gray-700/50 p-2.5 rounded-lg">
                    <span className="text-blue-400 font-medium block mb-1">Email</span>
                    <span className="text-gray-200 truncate block">{doubt.student?.email || "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 bg-gray-800/30 px-3 py-2 rounded-lg border border-gray-700/50">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Posted: {new Date(doubt.createdAt).toLocaleString()}</span>
              </div>

              {/* Title */}
              <div className="bg-gradient-to-r from-blue-500/10 to-transparent p-4 rounded-xl border-l-4 border-blue-500 shadow-lg shadow-blue-500/5">
                <h3 className="text-base sm:text-lg font-semibold text-blue-400 leading-tight">
                  {doubt.title}
                </h3>
              </div>

              {/* Description */}
              <div className="bg-gray-800/30 border border-gray-700/50 p-4 rounded-xl">
                <p className="text-sm text-gray-300 leading-relaxed">
                  {doubt.description}
                </p>
              </div>

              {/* Mentor Response (if exists) */}
              {doubt.response ? (
                <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-700/30 p-4 sm:p-5 rounded-xl shadow-lg backdrop-blur-sm">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/20 flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-base sm:text-lg font-semibold text-green-400">
                      Your Response
                    </h4>
                  </div>

                  <div className="bg-gray-800/50 border border-gray-700/50 p-3 rounded-lg">
                    <p className="text-sm text-gray-300 leading-relaxed mb-2">
                      {doubt.response?.text || "N/A"}
                    </p>
                    <p className="text-[10px] text-gray-500 flex items-center gap-1.5">
                      <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Responded: {new Date(doubt.response?.repliedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-orange-900/20 to-amber-900/20 border border-orange-700/30 rounded-lg p-3 flex items-start gap-2.5">
                  <svg className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-orange-300">
                    No initial response provided yet. You can respond via the conversation below.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Conversation Section */}
          {doubt.messages && doubt.messages.length > 0 && (
            <div className="border-t border-gray-700/50 bg-gray-900/30 p-4 sm:p-6">
              <h4 className="text-base sm:text-lg font-semibold text-gray-200 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Conversation
              </h4>
              <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl shadow-lg max-h-80 overflow-y-auto">
                <ul className="divide-y divide-gray-700/30">
                  {doubt.messages.map((m, idx) => (
                    <li key={m._id || m.createdAt || idx} className="p-3 hover:bg-gray-800/20 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                          m.role === 'student' 
                            ? 'bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/20' 
                            : 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/20'
                        }`}>
                          {m.role === 'student' ? 'S' : 'M'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-blue-400 capitalize">
                              {m.role}
                            </span>
                            <span className="text-xs text-gray-600">•</span>
                            <span className="text-xs text-gray-500">
                              {new Date(m.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300 leading-relaxed break-words">
                            {m.text}
                          </p>
                          {m.image && (
                            <div className="mt-2">
                              <img
                                src={m.image}
                                alt="Attachment"
                                className="w-32 h-24 sm:w-40 sm:h-32 object-cover rounded-lg border border-gray-700 cursor-pointer hover:border-blue-500/50 transition-colors"
                                onClick={() => {
                                  const idx = images.findIndex((s) => s === m.image);
                                  setOpenIndex(idx >= 0 ? idx : 0);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Image Gallery Modal */}
          {openIndex !== null && images.length > 0 && (
            <div
              className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setOpenIndex(null)}
            >
              <div className="relative p-4" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 rounded-full p-2 shadow-lg transition-all"
                  onClick={() => setOpenIndex(null)}
                  aria-label="Close image"
                >
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    className="bg-gray-800/90 hover:bg-gray-700 backdrop-blur-sm rounded-full p-3 shadow-lg transition-all text-white text-xl font-bold"
                    onClick={() => {
                      setOpenIndex((prev) => {
                        if (typeof prev !== 'number') return 0;
                        return (prev - 1 + images.length) % images.length;
                      });
                    }}
                    aria-label="Previous image"
                  >
                    ‹
                  </button>

                  <img src={images[openIndex] || ''} alt={`Image ${openIndex + 1}`} className="max-w-[80vw] max-h-[80vh] rounded-xl shadow-2xl object-contain border border-gray-700" />

                  <button
                    type="button"
                    className="bg-gray-800/90 hover:bg-gray-700 backdrop-blur-sm rounded-full p-3 shadow-lg transition-all text-white text-xl font-bold"
                    onClick={() => {
                      setOpenIndex((prev) => {
                        if (typeof prev !== 'number') return 0;
                        return (prev + 1) % images.length;
                      });
                    }}
                    aria-label="Next image"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Message Input for Mentor */}
          {currentUser?.role === "mentor" && doubt.status !== "resolved" && (
            <div className="border-t border-gray-700/50 bg-gray-900/30 p-4 sm:p-6">
              <h4 className="text-sm sm:text-base font-semibold text-gray-200 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                Send a Message
              </h4>
              <div className="space-y-3">
                <textarea
                  value={msgText}
                  onChange={(e) => setMsgText(e.target.value)}
                  rows={3}
                  className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-xl text-gray-200 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
                  placeholder="Write a message to the student..."
                />
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => setMsgFile(e.target.files[0] || null)}
                    className="text-xs text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-gray-800 file:text-blue-400 hover:file:bg-gray-700 file:border file:border-gray-700 cursor-pointer transition"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-blue-500/30 text-sm whitespace-nowrap flex items-center justify-center gap-2 group"
                  >
                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Mentor Actions */}
          {currentUser?.role === "mentor" && doubt.status !== "resolved" && (
            <div className="border-t border-gray-700/50 bg-gray-900/30 p-4 sm:p-6">
              <button
                onClick={async () => {
                  if (!window.confirm("Mark this doubt as resolved?")) return;
                  try {
                    const res = await axiosInstance.post(`/doubts/${id}/resolve`);
                    setDoubt(res.data);
                    toast.success("Doubt marked as resolved");
                  } catch (err) {
                    console.error(err);
                    toast.error("Failed to resolve doubt");
                  }
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-2 text-sm group"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Mark as Resolved
              </button>
            </div>
          )}

          {/* Resolved Status Message */}
          {doubt.status === "resolved" && (
            <div className="border-t border-gray-700/50 bg-gradient-to-r from-green-900/20 to-emerald-900/20 p-4 sm:p-6">
              <div className="flex items-center gap-3 text-green-400">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/20">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-semibold text-sm sm:text-base">
                  This doubt has been marked as resolved. No further actions can be taken.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Accent */}
        <div className="h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-b-2xl"></div>
      </div>
    </div>
  );
};

export default DoubtDetailPage;