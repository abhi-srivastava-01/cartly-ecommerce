import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { accountMenu } from "../../constants/accountMenu";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/user/userThunk";

function AccountMenu() {
  const dispatch = useDispatch();
  const handelSumbit = () => {
    dispatch(logoutUser());
  };
  return (
    <div className="absolute z-9999 right-0 top-12 w-52 bg-white shadow-lg rounded-xl opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
      <div className="px-4 py-2">
        <div className="flex flex-col gap-2">
          {accountMenu.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg"
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </Link>
          ))}

          <button
            onClick={handelSumbit}
            className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountMenu;
