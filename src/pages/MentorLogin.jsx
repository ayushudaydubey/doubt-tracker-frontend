import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../services/api";

const MentorLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/login-mentor", data);

      const { token, name, role, _id, email } = res.data;
      const userData = { token, name, role, _id, email };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      toast.success("Login successful");
      navigate("/dashboard/mentor");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl p-8 space-y-6 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-green-500 text-center">
          Mentor Login
        </h2>

        {/* Email */}
        <div>
          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email",
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
            {...register("password", {
              required: "Password is required",
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

        <button className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg font-semibold transition">
          Login
        </button>

        <p className="text-sm text-center text-gray-400">
          Not a mentor?{" "}
          <Link
            to="/auth/login-student"
            className="text-green-400 hover:underline font-medium"
          >
            Student Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default MentorLogin;
