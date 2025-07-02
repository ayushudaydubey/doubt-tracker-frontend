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
    formState: { errors }
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
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4 pt-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-orange-600 text-center">
          Mentor Registration
        </h2>

    
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            placeholder="Your full name"
            {...register("name", { required: "Name is required" })}
            className={`border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              errors.name ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-orange-400"
            }`}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="example@email.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email address"
              }
            })}
            className={`border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-orange-400"
            }`}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

     
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Min 6 characters"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
            className={`border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              errors.password ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-orange-400"
            }`}
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

  
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Mobile</label>
          <input
            type="tel"
            placeholder="10-digit number"
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit mobile number"
              }
            })}
            className={`border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              errors.mobile ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-orange-400"
            }`}
          />
          {errors.mobile && <p className="text-sm text-red-500">{errors.mobile.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default MentorRegister;
