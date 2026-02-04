import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../services/api";

const MentorRegister = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post("/register-mentor", data);
      toast.success("Mentor registered successfully");
      reset();
      setTimeout(() => navigate("/auth/mentor-login"), 1000);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to register mentor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 pt-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl p-8 space-y-6 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-green-500 text-center">
          Mentor Registration
        </h2>

        {/* Name */}
        <div>
          <label className="text-sm text-gray-300">Name</label>
          <input
            type="text"
            placeholder="Your full name"
            {...register("name", { required: "Name is required" })}
            className={`mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 border text-gray-200 focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-700 focus:ring-green-500"
            }`}
          />
          {errors.name && (
            <p className="text-xs text-red-400 mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            placeholder="example@email.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email address",
              },
            })}
            className={`mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 border text-gray-200 focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-700 focus:ring-green-500"
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-400 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-sm text-gray-300">Password</label>
          <input
            type="password"
            placeholder="Minimum 6 characters"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className={`mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 border text-gray-200 focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-700 focus:ring-green-500"
            }`}
          />
          {errors.password && (
            <p className="text-xs text-red-400 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Mobile */}
        <div>
          <label className="text-sm text-gray-300">Mobile</label>
          <input
            type="tel"
            placeholder="10-digit number"
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit mobile number",
              },
            })}
            className={`mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 border text-gray-200 focus:outline-none focus:ring-2 ${
              errors.mobile
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-700 focus:ring-green-500"
            }`}
          />
          {errors.mobile && (
            <p className="text-xs text-red-400 mt-1">
              {errors.mobile.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg font-semibold transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default MentorRegister;
