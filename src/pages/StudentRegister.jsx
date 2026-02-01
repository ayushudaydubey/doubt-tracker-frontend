import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/api";

const StudentRegister = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post("/register-student", { ...data, role: "student" });
      toast.success("Registration successful!");
      reset();
      setTimeout(() => navigate("/auth/student-login"), 1000);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 pt-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl p-8 space-y-6 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-green-500 text-center">
          Student Registration
        </h2>

        {/* Name */}
        <div>
          <label className="text-sm text-gray-300">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
          />
          {errors.name && (
            <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
          />
          {errors.email && (
            <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-sm text-gray-300">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
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
            {...register("mobile", { required: "Mobile number is required" })}
            className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
          />
          {errors.mobile && (
            <p className="text-xs text-red-400 mt-1">{errors.mobile.message}</p>
          )}
        </div>

        <button className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg font-semibold transition">
          Register
        </button>
      </form>
    </div>
  );
};

export default StudentRegister;
