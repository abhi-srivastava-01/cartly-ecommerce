import { Camera, Trash2, User } from "lucide-react";

import { useState, useRef, useEffect } from "react";

import { useDispatch } from "react-redux";

import { toast } from "react-toastify";

import { uploadAvatar, deleteAvatar } from "../../features/user/userThunk";

function ProfileAvatar({ user }) {
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);

  const [loading, setLoading] = useState(false);

  const menuRef = useRef(null);

  // close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // upload avatar
  const handleImageChange = async (e) => {
    try {
      const file = e.target.files[0];

      if (!file) return;

      setLoading(true);

      const formData = new FormData();

      formData.append("image", file);

      const res = await dispatch(
        uploadAvatar({
          id: user._id,
          userData: formData,
        }),
      ).unwrap();

      toast.success(res.message);

      setShowMenu(false);
    } catch (error) {
      toast.error(error || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // delete avatar
  const handleDeleteAvatar = async () => {
    try {
      setLoading(true);

      const res = await dispatch(deleteAvatar(user._id)).unwrap();

      toast.success(res.message);

      setShowMenu(false);
    } catch (error) {
      toast.error(error || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center -mt-16">
      <div ref={menuRef} className="relative">
        {/* Avatar */}
        <div
          onClick={() => setShowMenu(!showMenu)}
          className="w-32 h-32 rounded-full border-[6px] border-white bg-gray-100 flex items-center justify-center shadow-xl overflow-hidden cursor-pointer transition duration-300 hover:scale-[1.03] hover:shadow-2xl"
        >
          {user?.avatar?.url ? (
            <img
              src={user.avatar.url}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-14 h-14 text-gray-400" />
          )}
        </div>

        {/* Hidden Input */}
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        {/* Popup Menu */}
        {showMenu && (
          <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-52 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-gray-100 p-2 z-50">
            {/* Upload */}
            <label
              htmlFor="avatar-upload"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 cursor-pointer transition"
            >
              <Camera className="w-5 h-5 text-gray-700" />

              <span className="text-sm font-medium text-gray-700">
                {loading ? "Uploading..." : "Update Photo"}
              </span>
            </label>

            {/* Delete */}
            {user?.avatar?.url && (
              <button
                type="button"
                disabled={loading}
                onClick={handleDeleteAvatar}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-500 transition"
              >
                <Trash2 className="w-5 h-5" />

                <span className="text-sm font-medium">
                  {loading ? "Deleting..." : "Delete Photo"}
                </span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Username */}
      <h2 className="mt-4 text-2xl font-semibold text-gray-800 capitalize text-center">
        {user?.name ? `Hello ${user.name}` : ""}
      </h2>
    </div>
  );
}

export default ProfileAvatar;
