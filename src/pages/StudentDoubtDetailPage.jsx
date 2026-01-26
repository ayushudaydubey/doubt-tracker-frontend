import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../services/api";
import { toast } from "react-toastify";

const StudentDoubtDetailPage = () => {
  const { id } = useParams();
  const [doubt, setDoubt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msgText, setMsgText] = useState("");
  const [msgFile, setMsgFile] = useState(null);
  const [openImage, setOpenImage] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("user"));

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-orange-600 font-medium">Loading doubt details...</p>
        </div>
      </div>
    );
  }

  if (!doubt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="text-center bg-white rounded-xl shadow-lg p-8">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-500 text-lg font-semibold">Doubt not found</p>
          <p className="text-gray-500 mt-2">The requested doubt could not be located.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:pt-24 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-sm border-b-2 border-orange-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-orange-600">
              Doubt Details
            </h2>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-semibold self-start sm:self-auto ${
              doubt.status === "resolved" 
                ? "bg-green-100 text-green-700" 
                : doubt.response 
                  ? "bg-blue-100 text-blue-700"
                  : "bg-yellow-100 text-yellow-700"
            }`}>
              {doubt.status === "resolved" ? "✓ Resolved" : doubt.response ? "In Progress" : "Pending"}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-b-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8">
            {/* Left Column - Image */}
            {doubt.image && (
              <div className="order-1 lg:order-1">
                <div className="relative rounded-xl overflow-hidden shadow-md bg-gray-100 h-96 lg:h-[520px]">
                  <img
                    src={doubt.image}
                    alt="Doubt"
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => setOpenImage(doubt.image)}
                  />
                </div>
              </div>
            )}

            {/* Right Column - Details */}
            <div className={`order-2 lg:order-2 space-y-4 sm:space-y-6 ${!doubt.image ? 'lg:col-span-2' : ''}`}>
              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Posted: {new Date(doubt.createdAt).toLocaleString()}</span>
              </div>

              {/* Title */}
              <div className="bg-gradient-to-r from-orange-50 to-transparent p-4 rounded-lg border-l-4 border-orange-500">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 leading-tight">
                  {doubt.title}
                </h3>
              </div>

              {/* Description */}
              <div className="prose max-w-none">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {doubt.description}
                </p>
              </div>

              {/* Mentor Response */}
              {doubt.response ? (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 rounded-xl shadow-inner border border-green-200">
                  <div className="flex items-start gap-3 mb-4">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h4 className="text-lg sm:text-xl font-semibold text-green-700">
                      Mentor Response
                    </h4>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-sm">
                    <div className="bg-white bg-opacity-60 p-3 rounded-lg">
                      <p className="text-gray-500 text-xs mb-1">Mentor</p>
                      <p className="font-medium text-gray-800">{doubt.mentor?.name || "N/A"}</p>
                    </div>
                    <div className="bg-white bg-opacity-60 p-3 rounded-lg">
                      <p className="text-gray-500 text-xs mb-1">Email</p>
                      <p className="font-medium text-gray-800 truncate">{doubt.mentor?.email || "N/A"}</p>
                    </div>
                    <div className="bg-white bg-opacity-60 p-3 rounded-lg">
                      <p className="text-gray-500 text-xs mb-1">Contact</p>
                      <p className="font-medium text-gray-800">{doubt.mentor?.mobile || "N/A"}</p>
                    </div>
                  </div>

                  <div className="bg-white bg-opacity-60 p-4 rounded-lg">
                    <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
                      {doubt.response?.text || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500 mt-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Responded: {new Date(doubt.response?.repliedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm sm:text-base text-yellow-800">
                    Waiting for mentor response...
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Conversation Section */}
          {doubt.messages && doubt.messages.length > 0 && (
            <div className="border-t border-gray-200 bg-gray-50 p-4 sm:p-6 lg:p-8">
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Conversation
              </h4>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 max-h-80 overflow-y-auto">
                <ul className="divide-y divide-gray-100">
                  {doubt.messages.map((m, idx) => (
                    <li key={m._id || m.createdAt || idx} className="p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          m.role === 'student' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {m.role === 'student' ? 'S' : 'M'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-xs sm:text-sm font-semibold text-gray-700 capitalize">
                              {m.role}
                            </span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">
                              {new Date(m.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm sm:text-base text-gray-800 leading-relaxed break-words">
                            {m.text}
                          </p>
                          {m.image && (
                            <div className="mt-2">
                              <img
                                src={m.image}
                                alt="Attachment"
                                className="w-40 h-28 sm:w-56 sm:h-40 object-cover rounded-lg border border-gray-200 cursor-pointer"
                                onClick={() => setOpenImage(m.image)}
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

          {/* Image Zoom Modal for student view */}
          {openImage && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
              onClick={() => setOpenImage(null)}
            >
              <div className="relative p-4" onClick={(e) => e.stopPropagation()}>
                <button
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md"
                  onClick={() => setOpenImage(null)}
                >
                  ✕
                </button>
                <img src={openImage} alt="Zoom" className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg object-contain" />
              </div>
            </div>
          )}

          {/* Message Input for Student */}
          {currentUser?.role === "student" && doubt.status !== "resolved" && (
            <div className="border-t border-gray-200 bg-white p-4 sm:p-6 lg:p-8">
              <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">Send a Message</h4>
              <div className="space-y-3">
                <textarea
                  value={msgText}
                  onChange={(e) => setMsgText(e.target.value)}
                  rows={4}
                  className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Write a message to the mentor..."
                />
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => setMsgFile(e.target.files[0] || null)}
                    className="text-xs sm:text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 file:cursor-pointer cursor-pointer"
                  />
                  <button
                    onClick={async () => {
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
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg text-sm sm:text-base whitespace-nowrap"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Close Ticket Button */}
          {doubt.status !== "resolved" && currentUser?.role === "student" && (
            <div className="border-t border-gray-200 bg-gray-50 p-4 sm:p-6 lg:p-8">
              <button
                onClick={async () => {
                  if (!window.confirm("Are you sure you want to close this ticket?")) return;
                  try {
                    const res = await axiosInstance.post(`/doubts/${id}/resolve`);
                    setDoubt(res.data);
                    toast.success("Ticket closed successfully");
                  } catch (err) {
                    console.error(err);
                    toast.error("Failed to close ticket");
                  }
                }}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Close Ticket
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDoubtDetailPage;