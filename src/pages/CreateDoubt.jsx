import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const CreateDoubt = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data) => {
    if (submitted) {
      toast.info("You have already submitted this doubt.");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      await axiosInstance.post("/doubts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Doubt submitted successfully!");
      setSubmitted(true);
      reset();

      setTimeout(() => navigate("/dashboard/student"), 1200);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to submit doubt");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-200 pt-20 pb-10 px-3 flex items-center justify-center">
      
      {/* Card */}
      <div className="w-full max-w-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-xl hover:shadow-green-500/10 transition-all">

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Ask your question 
          </h2>
          <p className="text-xs text-gray-400 mt-1">
        Learn faster with answers from our mentors
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="p-6 space-y-4"
        >
          {/* Title */}
          <div>
            <label className="text-xs font-semibold text-gray-300 mb-1 block">
              Doubt Title
            </label>
            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="e.g. React useEffect dependency issue"
              className="w-full px-4 py-2.5 rounded-lg bg-gray-800/60 border border-gray-700 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-gray-300 mb-1 block">
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              rows={5}
              placeholder="Explain your problem in detail..."
              className="w-full px-4 py-2.5 rounded-lg bg-gray-800/60 border border-gray-700 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition resize-none"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="text-xs font-semibold text-gray-300 mb-1 block">
              Attach Screenshot (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="w-full text-xs text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:bg-gray-800 file:text-green-400
                hover:file:bg-gray-700
                file:font-semibold transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitted}
            className={`w-full mt-2 py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 ${
              submitted
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 hover:shadow-lg hover:shadow-green-500/30"
            }`}
          >
            {submitted ? "Ticket Raised  ✓" : "Raise Ticket "}
          </button>
        </form>

        {/* Footer Accent */}
        <div className="h-1 bg-gradient-to-r from-transparent via-green-500/40 to-transparent rounded-b-2xl" />
      </div>
    </div>
  );
};

export default CreateDoubt;
