import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const schema = z
  .object({
    name: z.string().min(2, "Name required"),
    email: z.string().email("Valid email required"),
    password: z.string().min(6, "Min 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

function Signup() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const res = await axios({
        method: "post",
        url: "http://localhost:3000/api/auth/register",
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 5000,
      });
      alert(res.data.message);
      navigate("/login", { replace: true });

      // console.log(res.data);
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {/* Back */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 text-gray-500 hover:text-gray-800"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Card */}
      <div className="min-w-sm bg-white rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Create your account
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Full name"
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
              placeholder="Email"
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
              type={show ? "text" : "password"}
              placeholder="Password"
              autoComplete="new-password"
              {...register("password")}
              className="w-full px-4 py-2.5 rounded-lg bg-gray-50 text-gray-700 outline-none focus:bg-white transition"
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              placeholder="Confirm password"
              autoComplete="new-password"
              {...register("confirmPassword")}
              className="w-full px-4 py-2.5 rounded-lg bg-gray-50 text-gray-700 outline-none focus:bg-white transition"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition active:scale-[0.98]"
          >
            {loading ? "Creating..." : "Create Account"}
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
