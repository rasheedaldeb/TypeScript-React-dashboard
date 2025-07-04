/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Link } from "react-router-dom";
import type { ProductCardProps } from "../../types/productsTypes";
import { FaTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";
import axios from "axios";

const Card = ({ name, price, image_url, id, setItems }: ProductCardProps) => {
  const token = localStorage.getItem("token");
  const fetchAllProducts = async () => {
    await axios
      .get("https://vica.website/api/items", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteItem = async (id: number) => {
    await axios
      .delete(`https://vica.website/api/items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message, { position: "top-right" });
        fetchAllProducts();
      })
      .catch((err) => {
        toast.error(err.response.data.message, { position: "top-right" });
      });
  };
  const showDeleteConfirm = (id: number) => {
    toast.info(
      ({ closeToast }) => (
        <div style={{ textAlign: "center" }}>
          <h3>Confirm Delete</h3>
          <p>Are you sure you want to delete this item?</p>
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
                deleteItem(id);
                closeToast && closeToast();
              }}
            >
              yes
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
    <div className="w-[300px] rounded-md shadow-md p-5 max-h-[350px] dark:bg-sky-950 flex flex-col gap-2 items-center">
      <img src={image_url} alt="" className="h-[70%]" />
      <h4 className="dark:text-white">{name}</h4>
      <p className="text-blue-500">{price}$</p>
      <div className=" w-full flex justify-between items-center">
        <Link
          to={`/dashboard/items/edit/${id}`}
          className="text-orange-400 font-medium px-5 py-1 border border-orange-400 rounded-md"
        >
          Edit Product
        </Link>
        <button
          onClick={() => id && showDeleteConfirm(id)}
          className="cursor-pointer"
        >
          <FaTrashCan className="text-red-600" />
        </button>
      </div>
    </div>
  );
};

export default Card;
