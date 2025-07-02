import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../services/api";
import { toast } from "react-toastify";

const StudentDoubtDetailPage = () => {
  const { id } = useParams();
  const [doubt, setDoubt] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!doubt) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">Doubt not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 px-4 pt-24">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          Doubt Details
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          {doubt.image && (
            <div className="md:w-1/2">
              <img
                src={doubt.image}
                alt="Doubt"
                className="w-full h-auto rounded-lg shadow-md object-cover"
              />
            </div>
          )}

          <div className="md:w-1/2 space-y-4">
            <p className="text-sm text-gray-500">
              <strong>Posted:</strong>{" "}
              {new Date(doubt.createdAt).toLocaleString()}
            </p>

            <h3 className="text-xl font-semibold text-gray-800">
              {doubt.title}
            </h3>

            <p className="text-gray-700">{doubt.description}</p>

            {doubt.response ? (
              <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-inner">
                <h4 className="text-lg font-semibold text-green-600 mb-2">
                  Mentor Response
                </h4>
                <p>
                  <strong>Mentor:</strong> {doubt.mentor?.name || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {doubt.mentor?.email || "N/A"}
                </p>
                <p>
                  <strong>Contact:</strong> {doubt.mentor?.mobile || "N/A"}
                </p>
                <p className="mt-2">
                  <strong>Response:</strong> {doubt.response?.text || "N/A"}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  <strong>Responded At:</strong>{" "}
                  {new Date(doubt.response?.repliedAt).toLocaleString()}
                </p>
              </div>
            ) : (
              <p className="mt-4 italic text-gray-600">
                No response yet from a mentor.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDoubtDetailPage;
