import { useContext, useEffect, useState, type SetStateAction } from "react";
import type { IProducts } from "../types/productsTypes";
import axios from "axios";
import Card from "../Components/Card/Card";
import { SearchContext } from "./Dashboard";
import { Link } from "react-router-dom";
import { IoCreate } from "react-icons/io5";
import { BounceLoader } from "react-spinners";

const ListItems = () => {
  const [items, setItems] = useState<IProducts[]>();
  const [loading, setLoading] = useState(false);
  const search = useContext(SearchContext);
  const token = localStorage.getItem("token");
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://vica.website/api/items", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <button className="flex justify-end">
        <Link
          to="/dashboard/items/create"
          className="w-[200px] h-[50px] rounded-md bg-blue-500 flex items-center justify-center gap-4 text-lg text-white"
        >
          <IoCreate />
          Create Item
        </Link>
      </button>
      <div
        className={
          loading
            ? "flex items-center justify-center h-screen"
            : "flex flex-wrap gap-10 h-screen"
        }
      >
        {loading ? (
          <BounceLoader
            color="oklch(29.3% 0.066 243.157)"
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          items
            ?.filter((item) =>
              item.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((item) => (
              <Card
                name={item.name}
                price={item.price}
                image_url={item.image_url}
                id={item.id}
                setItems={
                  setItems as React.Dispatch<SetStateAction<IProducts[]>>
                }
              />
            ))
        )}
      </div>
    </>
  );
};

export default ListItems;
