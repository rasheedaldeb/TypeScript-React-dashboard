export interface IProducts {
  id?: number;
  name: string;
  price: string;
  image_url: string;
}
export interface ProductCardProps extends IProducts {
  name: string;
  price: string;
  image_url: string;
  setItems: React.Dispatch<React.SetStateAction<IProducts[]>>;
}
export interface CreateProduct {
  image_url: string | undefined;
  name: string;
  price: string;
}
export interface ItemsFormProps {
  id?: string;
  name?: string;
  price?: string;
  image?: string;
  type: string;
}
