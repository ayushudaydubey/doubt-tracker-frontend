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
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      await axiosInstance.post("/doubts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(" Doubt submitted successfully!");
      setSubmitted(true);
      reset();

      setTimeout(() => {
        navigate("/dashboard/student");
      }, 1200);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || " Failed to submit doubt"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 px-4 pt-24 pb-10 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl border border-orange-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-orange-600 mb-6">
          Submit Your Doubt
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          encType="multipart/form-data"
        >
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Title
            </label>
            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="Enter a brief title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              placeholder="Describe your doubt in detail..."
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Attach Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
            />
          </div>

          <button
            type="submit"
            disabled={submitted}
            className={`w-full text-white py-3 rounded-lg font-semibold shadow-md transition duration-300 ${
              submitted
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {submitted ? "Doubt Submitted" : "Submit Doubt"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDoubt;
