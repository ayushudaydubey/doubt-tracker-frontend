import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../services/api";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/student-login", data);
      const { token, name, role, _id } = res.data;

      const userData = { token, name, role, _id };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      toast.success(" Login successful");

      if (role === "admin") {
        navigate("/auth/register-mentor");
      } else {
        navigate("/dashboard/student");
      }
    } catch (err) {
      const errorMsg = err?.response?.data?.message || "❌ Login failed";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-orange-600 text-center mb-2">
          Student Login
        </h2>

       
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email",
              },
            })}
            className={`border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-orange-400"
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

     
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className={`border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-orange-400"
            }`}
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>


        <button
          type="submit"
          aria-label="Login"
          className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition duration-300"
        >
          Login
        </button>

    
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/auth/register-student"
            className="text-orange-500 hover:underline font-medium"
          >
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
