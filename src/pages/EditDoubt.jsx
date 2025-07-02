import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditDoubt = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);

  useEffect(() => {
    const fetchDoubt = async () => {
      try {
        const res = await axiosInstance.get(`/doubts/${id}`);
        const doubt = res.data;
        setTitle(doubt.title);
        setDescription(doubt.description);
        setImage(doubt.image);
      } catch (err) {
        console.error("Failed to fetch doubt:", err);
        toast.error(" Error loading doubt");
      }
    };

    fetchDoubt();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (newImageFile) formData.append("image", newImageFile);

      await axiosInstance.put(`/doubts/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(" Doubt updated successfully");
      navigate("/dashboard/student");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error(" Failed to update doubt");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 px-4 pt-24 pb-12 flex items-start justify-center">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-orange-200 p-8">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">
          Edit Your Doubt
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              placeholder="Enter doubt title"
            />
          </div>

   
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none"
              placeholder="Describe your doubt"
            />
          </div>

    
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Replace Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-700"
            />
          </div>

         
          {image && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
              <img
                src={image}
                alt="Preview"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/400x200?text=Image+not+available";
                }}
                className="w-full max-h-64 object-cover rounded-lg shadow-md"
              />
            </div>
          )}

       
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition duration-300 shadow-md"
          >
            Update Doubt
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDoubt;
