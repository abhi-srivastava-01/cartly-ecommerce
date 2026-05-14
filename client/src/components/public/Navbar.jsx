import { Link } from "react-router-dom";
import { ShoppingCart, User, UserRoundCog } from "lucide-react";
import { IoNotificationsOutline } from "react-icons/io5";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import AccountMenu from "../ui/AccountMenu";

function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <nav className="relative z-999 w-full bg-white/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between py-3 gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-semibold text-gray-800 tracking-tight select-none"
          >
            Cartly
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl hidden sm:block">
            <SearchBar />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <button className="relative p-1 rounded-full hover:bg-gray-100 transition">
                <IoNotificationsOutline className="w-5 h-5 text-gray-700" />
              </button>
            )}
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 rounded-full hover:bg-gray-100 transition"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                2
              </span>
            </Link>

            {/* Login */}
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 
              bg-gray-900 text-white text-sm 
              rounded-full hover:bg-gray-800 transition"
              >
                <User className="w-4 h-4" />
                Login
              </Link>
            ) : (
              <div className="relative group flex items-center">
                <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
                  <UserRoundCog className="w-5 h-5 text-gray-700" />
                </button>
                <AccountMenu />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
