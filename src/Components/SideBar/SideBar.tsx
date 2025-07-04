/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Link, useNavigate } from "react-router-dom";
import type { SideBarProps } from "../../types/sideBar&navBarTypes";
import { RiLogoutBoxLine } from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const SideBar = ({ items }: SideBarProps) => {
  const navigate = useNavigate();
  // logout logic
  const [logOutLoading, setLogOutLoading] = useState(false);
  const token = localStorage.getItem("token");
  const logOut = async () => {
    setLogOutLoading(true);
    await fetch("https://vica.website/api/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setLogOutLoading(false);
        toast.success("Logged out successfully", { position: "top-right" });
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Logged out failed", { position: "top-right" });
        setLogOutLoading(false);
      });
  };

  const showLogoutConfirm = () => {
    toast.info(
      ({ closeToast }) => (
        <div style={{ textAlign: "center" }}>
          <h3>Confirm Logout</h3>
          <p>Are you sure you want to log out?</p>
          <div className="flex items-center justify-between mt-5">
            <button
              onClick={closeToast}
              className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
            >
              No
            </button>
            <button
              style={{ marginRight: 8 }}
              className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
              onClick={() => {
                logOut();
                closeToast && closeToast();
              }}
            >
              {logOutLoading ? "logging out..." : "Yes"}
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
        style: { minWidth: 300 },
      }
    );
  };

  return (
    <aside
      className="w-[20%] overflow-hidden fixed  top-0 left-0 h-screen dark:bg-sky-950 flex flex-col items-center p-5 justify-between shadow-2xl"
      dir="ltr"
    >
      <div className="flex flex-col gap-10">
        <h1 className="text-2xl font-black dark:text-white">
          <span className="text-blue-500">Dash</span> Stuck
        </h1>

        <ul className="flex flex-col gap-5">
          {items.map((item, i) => (
            <Link
              key={i}
              className="flex items-center gap-2 text-lg dark:text-white"
              to={item.link}
            >
              {item.img}
              {item.name}
            </Link>
          ))}
        </ul>
      </div>
      <button
        onClick={showLogoutConfirm}
        className="flex items-center gap-2 w-[150px] h-[40px] bg-blue-500 rounded-md justify-center text-white cursor-pointer"
      >
        <RiLogoutBoxLine /> LogOut
      </button>
    </aside>
  );
};

export default SideBar;
