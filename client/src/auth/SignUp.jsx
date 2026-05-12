import { Eye, EyeOff, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signupSchema } from "../lib/zod/signupSchema";
import { signupUser } from "../features/user/userThunk";

// ----
function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data) => {
    console.log(data);

    dispatch(signupUser(data));
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [user, isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 text-gray-500 hover:text-gray-800 transition"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Create your account
          </h2>

          <p className="text-gray-500 text-sm mt-1">Signup to start shopping</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Full name"
              autoComplete="name"
              {...register("name")}
              className="w-full px-4 py-2.5 rounded-lg bg-gray-50 text-gray-700 outline-none focus:bg-white transition"
            />

            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email address"
              autoComplete="username"
              {...register("email")}
              className="w-full px-4 py-2.5 rounded-lg bg-gray-50 text-gray-700 outline-none focus:bg-white transition"
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="new-password"
              {...register("password")}
              className="w-full px-4 py-2.5 rounded-lg bg-gray-50 text-gray-700 outline-none focus:bg-white transition"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              autoComplete="new-password"
              {...register("confirmPassword")}
              className="w-full px-4 py-2.5 rounded-lg bg-gray-50 text-gray-700 outline-none focus:bg-white transition"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* API Error */}
          {error && (
            <p className="text-red-500 text-sm text-center">
              {typeof error === "string" ? error : "Something went wrong"}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.98] transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-gray-900 font-medium hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
