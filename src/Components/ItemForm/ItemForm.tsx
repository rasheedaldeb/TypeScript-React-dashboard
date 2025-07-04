/* eslint-disable @typescript-eslint/no-unused-expressions */
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { CreateProduct, ItemsFormProps } from "../../types/productsTypes";
import { BsUpload } from "react-icons/bs";

const ItemForm = ({ type, id, image, name, price }: ItemsFormProps) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [createItem, setCreateItem] = useState<CreateProduct>({
    name: "",
    price: "",
    image_url: "",
  });
  useEffect(() => {
    setCreateItem({
      name: name || "",
      price: price || "",
      image_url: image || "",
    });
  }, [name, price, image]);
  //   create item logic
  const [createLoading, setCreateLoading] = useState(false);
  const handleCreatItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateLoading(true);
    const createFormData = new FormData();
    if (createItem.name && createItem.price) {
      createFormData.append("name", createItem.name);
      createFormData.append("price", createItem.price);
      createItem.image_url &&
        typeof createItem.image_url !== "string" &&
        createFormData.append("image", createItem.image_url);
      id && createFormData.append("_method", "PUT");
      try {
        const res = id
          ? await axios.post(
              `https://vica.website/api/items/${id}`,
              createFormData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
          : await axios.post("https://vica.website/api/items", createFormData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
        toast.success(res.data.message);
        navigate("/dashboard/items");
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred");
        }
      }
    } else {
      toast.error("Please fill all fields");
    }
  };
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-xl font-bold dark:text-white">Create Item</h1>
      <form className="flex justify-between" onSubmit={handleCreatItem}>
        <div className="flex flex-col gap-3 w-[45%]">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-lg dark:text-white">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={createItem.name}
              className=" h-[40px] focus:outline-none border border-gray-400 rounded-md pl-2 dark:text-white"
              placeholder="product name"
              onChange={(e) =>
                setCreateItem({ ...createItem, name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="price" className="text-lg dark:text-white">
              Product Price
            </label>
            <input
              type="text"
              name="price"
              id="price"
              value={createItem.price}
              className=" h-[40px] focus:outline-none border border-gray-400 rounded-md pl-2 dark:text-white"
              placeholder="product price"
              onChange={(e) =>
                setCreateItem({ ...createItem, price: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className={` w-[150px] h-[40px] rounded-md bg-blue-500 text-white cursor-pointer`}
            disabled={createLoading}
          >
            {createLoading ? "loading..." : type}
          </button>
        </div>
        <label
          htmlFor="image"
          className="border-2 border-dashed rounded-lg border-blue-500 flex flex-col items-center justify-center gap-5 w-[45%] cursor-pointer"
        >
          {createItem.image_url && typeof createItem.image_url != "string" ? (
            <img src={URL.createObjectURL(createItem.image_url)} alt="" />
          ) : image ? (
            <img src={image} alt="" />
          ) : (
            <BsUpload className="text-5xl text-blue-500" />
          )}
          <h3 className="dark:text-white">Upload Product Image</h3>
        </label>
        <input
          type="file"
          id="image"
          className="hidden"
          onChange={(e) =>
            setCreateItem({
              ...createItem,
              image_url: e.target.files?.[0]
                ? URL.createObjectURL(e.target.files[0])
                : undefined,
            })
          }
        />
      </form>
    </div>
  );
};

export default ItemForm;
