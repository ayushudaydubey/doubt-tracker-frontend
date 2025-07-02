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
      const payload = { ...data, role: "student" };
      await axiosInstance.post("/register-student", payload);

      toast.success("Registration successful!");
      reset();

      setTimeout(() => {
        navigate("/auth/student-login");
      }, 1000);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to register");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4 pt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-orange-600 text-center">
          Student Registration
        </h2>

 
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            placeholder="Your full name"
            {...register("name", { required: "Name is required" })}
            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

     
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="example@email.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

   
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Min 6 characters"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

      
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Mobile</label>
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
            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
          {errors.mobile && (
            <p className="text-sm text-red-500">{errors.mobile.message}</p>
          )}
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

export default StudentRegister;
