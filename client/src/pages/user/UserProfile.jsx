import { Camera, User } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector, useDispatch } from "react-redux";

import { updateProfile } from "../../features/user/userThunk";
import { updateProfileSchema } from "../../lib/zod/updateProfile";
import { toast } from "react-toastify";

function ProfilePage() {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);  
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateProfileSchema),
  });

  // Set default Values
  useEffect(() => {
    if (user) {
      reset({
        name: user?.name || "",
        age: user?.age || "",
        mobileNumber: user?.mobileNumber || "",

        address: {
          state: user?.address?.state || "",
          city: user?.address?.city || "",
          pincode: user?.address?.pincode || "",
        },
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await dispatch(
        updateProfile({
          id: user?._id || user?.id,
          userData: data,
        }),
      ).unwrap();

      toast.success(res.message);
    } catch (error) {
      toast.error(error || "Update Failed");
    }
  };

  return (
    <div className="min-h-screen py-6 px-4">
      <div className="bg-white rounded-3xl max-w-5xl mx-auto shadow-[0_10px_40px_rgba(0,0,0,0.06)] overflow-hidden">
        {/* Top Section */}
        <div className="h-40 bg-linear-to-r from-gray-900 to-gray-700" />

        {/* Content */}
        <div className="px-6 md:px-10 pb-10">
          {/* Profile Image */}
          <div className="flex flex-col items-center -mt-16">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-[6px] border-white bg-gray-100 flex items-center justify-center shadow-lg overflow-hidden">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-14 h-14 text-gray-400" />
                )}
              </div>

              <button
                type="button"
                className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-black transition"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <h2 className="mt-4 text-2xl font-semibold text-gray-800 capitalize">
              {user?.name ? `Hello ${user.name}` : ""}
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Full Name
                </label>

                <input
                  type="text"
                  {...register("name")}
                  className="mt-2 w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-gray-400 transition capitalize"
                />

                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Age */}
              <div>
                <label className="text-sm font-medium text-gray-600">Age</label>

                <input
                  type="number"
                  {...register("age")}
                  className="mt-2 w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-gray-400 transition"
                />

                {errors.age && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.age.message}
                  </p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Phone Number
                </label>

                <input
                  type="text"
                  {...register("mobileNumber")}
                  className="mt-2 w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-gray-400 transition"
                />

                {errors.mobileNumber && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.mobileNumber.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Email Address
                </label>

                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="mt-2 w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-100 text-gray-500"
                />
              </div>

              {/* State */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  State
                </label>

                <input
                  type="text"
                  {...register("address.state")}
                  className="mt-2 w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-gray-400 transition capitalize"
                />

                {errors.address?.state && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.address.state.message}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  City
                </label>

                <input
                  type="text"
                  {...register("address.city")}
                  className="mt-2 w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-gray-400 transition capitalize"
                />

                {errors.address?.city && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.address.city.message}
                  </p>
                )}
              </div>

              {/* Pincode */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Pincode
                </label>

                <input
                  type="text"
                  {...register("address.pincode")}
                  className="mt-2 w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-gray-400 transition"
                />

                {errors.address?.pincode && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.address.pincode.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 rounded-2xl bg-gray-900 text-white font-medium hover:bg-black transition-all duration-200 disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
