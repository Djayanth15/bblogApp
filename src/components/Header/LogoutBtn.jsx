import React from "react";
import { useDispatch } from "react-redux";
import authservice from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const logoutResult = await authservice.logout();

      if (logoutResult) {
        dispatch(logout());
      }
    } catch (error) {
      console.log("LogoutBtn :: Error", error);
    }
  };

  return (
    <button
      className="inline-bock px-6 py-2 duration-200 bg-gradient-to-r hover:to-rose-500 hover:via-rose-500  hover:from-orange-300 rounded-full"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
