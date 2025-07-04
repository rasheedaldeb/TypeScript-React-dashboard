import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
import SideBar from "../Components/SideBar/SideBar";
import { createContext, useState } from "react";
import { AiFillProduct } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
// eslint-disable-next-line react-refresh/only-export-components
export const SearchContext = createContext<string>("");
const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState(false);
  return (
    <SearchContext.Provider value={search}>
      <div className={`flex  justify-between ${mode && "dark"}`} dir="rtl">
        <div className="w-[80%]" dir="ltr">
          <NavBar setSearch={setSearch} setMode={setMode} mode={mode} />
          <div className="p-6 pt-[70px]">
            <Outlet />
          </div>
        </div>
        <SideBar
          items={[
            {
              name: "Products",
              link: "/dashboard/items",
              img: <AiFillProduct />,
            },
            {
              name: "Favorite",
              link: "/dashboard/favorite",
              img: <MdFavoriteBorder />,
            },
            {
              name: "Order List",
              link: "/dashboard/orders",
              img: <FaListUl />,
            },
          ]}
        />
      </div>
    </SearchContext.Provider>
  );
};

export default Dashboard;
