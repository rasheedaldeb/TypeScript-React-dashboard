import { useEffect, useState } from "react";
import type { CreateProduct } from "../types/productsTypes";
import { useParams } from "react-router-dom";
import axios from "axios";
import ItemForm from "../Components/ItemForm/ItemForm";

const UpdateItem = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [item, setItem] = useState<CreateProduct>({
    image_url: "",
    name: "",
    price: "",
  });
  useEffect(() => {
    axios
      .get(`https://vica.website/api/items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setItem(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <ItemForm
        type="Edit"
        id={id}
        name={item.name}
        price={item.price}
        image={item.image_url}
      />
    </div>
  );
};

export default UpdateItem;
