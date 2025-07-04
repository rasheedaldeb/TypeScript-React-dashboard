import { CgSearch } from "react-icons/cg";
import type { NavProps } from "../../types/sideBar&navBarTypes";

const NavBar = ({ setSearch, setMode, mode }: NavProps) => {
  const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <nav className="dark:bg-sky-950 h-[70px] px-10 flex items-center justify-between fixed w-[80%] bg-white">
      <div className="flex items-center justify-around w-[350px] h-[35px] rounded-2xl bg-gray-200 border border-gray-500">
        <CgSearch />
        <input
          placeholder="search for product"
          type="search"
          onChange={(e) => setSearch(e.target.value)}
          className=" pl-2 focus:outline-none w-[85%]"
        />
      </div>
      <div className="flex items-center gap-5">
        <div className="userInfo border-r dark:border-white border-black pr-2 dark:text-white shadow-2xl">
          <p>{userInfo.first_name}</p>
          <p>{userInfo.user_name}</p>
        </div>
        <button onClick={() => setMode(!mode)} className="cursor-pointer">
          <img src={mode ? "/img/sun.png" : "/img/moon.png"} alt="" />
        </button>
      </div>
    </nav>
  );
};
export default NavBar;
