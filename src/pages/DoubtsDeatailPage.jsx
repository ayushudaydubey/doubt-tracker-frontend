import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DoubtDetailPage = () => {
  const { id } = useParams();
  const [doubt, setDoubt] = useState(null);
  const [response, setResponse] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchDoubt = async () => {
      try {
        const res = await axiosInstance.get(`/doubts/${id}`);
        setDoubt(res.data);
      } catch (err) {
        toast.error(" Error loading doubt");
      }
    };

    fetchDoubt();
  }, [id]);

  const handleReply = async () => {
    if (!response.trim()) {
      return toast.warn(" Please enter a response.");
    }

    try {
      const res = await axiosInstance.post(`/doubts/${id}/reply`, {
        response: response.trim(),
      });
      setDoubt(res.data);
      setResponse("");
      toast.success(" Response submitted successfully");
    } catch (err) {
      toast.error(" Failed to submit response.");
    }
  };

  if (!doubt) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-orange-50 via-white to-orange-100 pt-24">
        <p className="text-orange-500 text-lg font-semibold animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-white px-4 sm:px-6 pt-24 pb-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* Doubt Image */}
        {doubt.image && (
          <div className="rounded-xl overflow-hidden shadow-xl border-2 border-orange-200 bg-white">
            <img
              src={doubt.image}
              alt="Doubt"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Doubt Details */}
        <div className="bg-white bg-opacity-80 backdrop-blur-lg px-6 sm:px-8 pt-20 pb-8 rounded-2xl shadow-xl border border-orange-300">
          <h1 className="text-2xl sm:text-3xl font-semibold text-orange-600 mb-4">
            {doubt.title}
          </h1>
          <p className="text-gray-700 mb-6">{doubt.description}</p>

          <div className="text-sm text-gray-600 space-y-1 mb-6">
            <p>
              <span className="font-semibold text-orange-600">Student:</span>{" "}
              {doubt.student?.name || "N/A"}
            </p>
            <p>
              <span className="font-semibold text-orange-600">Posted:</span>{" "}
              {new Date(doubt.createdAt).toLocaleString()}
            </p>
          </div>

          {doubt.response?.text ? (
            <div className="bg-orange-50 border border-orange-200 p-5 rounded-xl shadow-inner space-y-3">
              <h3 className="text-xl font-semibold text-orange-700">
                Mentor's Response
              </h3>
              <p className="text-gray-800 leading-relaxed">
                {doubt.response.text}
              </p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-semibold text-orange-600">Mentor:</span>{" "}
                  {doubt.response.mentor?.name}
                </p>
                <p>
                  <span className="font-semibold text-orange-600">Email:</span>{" "}
                  {doubt.response.mentor?.email}
                </p>
                <p>
                  <span className="font-semibold text-orange-600">Phone:</span>{" "}
                  {doubt.response.mentor?.mobile}
                </p>
                <p>
                  <span className="font-semibold text-orange-600">
                    Replied on:
                  </span>{" "}
                  {new Date(doubt.response?.repliedAt).toLocaleString()}
                </p>
              </div>
            </div>
          ) : currentUser?.role === "mentor" ? (
            <div className="space-y-4 mt-6">
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                rows={4}
                className="w-full p-4 border border-orange-300 rounded-lg resize-none focus:ring-2 focus:ring-orange-500 outline-none shadow-sm text-gray-800"
                placeholder="Write your helpful response here..."
              />
              <button
                onClick={handleReply}
                className="w-full bg-orange-600 text-white py-3 rounded-xl font-medium shadow-lg hover:bg-orange-700 transition duration-200"
              >
                Submit Response
              </button>
            </div>
          ) : (
            <div className="text-orange-500 font-medium mt-6">
              Awaiting mentor's response...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoubtDetailPage;
