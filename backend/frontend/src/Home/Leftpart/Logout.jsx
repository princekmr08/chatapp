import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthProvider";
function Logout() {
  const [loading, setLoading] = useState(false);
  const [authUser] = useAuth();
  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logged out successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Error in logging out");
    }
  };
  return (
    <>
      <hr />
      <div className="h-[10vh] bg-transparent flex items-center justify-between px-4">
  <BiLogOutCircle
    className="text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2"
    onClick={handleLogout}
  />

  <p className="text-white bg-slate-800 px-4 py-1 rounded-full duration-300 hover:bg-slate-700">
    Logged in: {authUser.user.fullname}
  </p>
</div>

    </>
  );
}

export default Logout;