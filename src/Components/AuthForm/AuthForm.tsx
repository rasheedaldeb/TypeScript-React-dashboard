import { useState } from "react";
import { Link } from "react-router-dom";
interface FormProps<T> {
  title: string;
  desc: string;
  inputs: { label: string; placeholder?: string; type: string; name: string }[];
  btn: string;
  footer: { text: string; link: { url: string; content: string } };
  setData: React.Dispatch<React.SetStateAction<T>>;
  direction?: string;
  loading?: boolean;
}

const AuthForm = <T extends object>({
  title,
  desc,
  inputs,
  btn,
  footer,
  setData,
  direction,
  loading,
}: FormProps<T>) => {
  const [image, setImage] = useState<Blob | null>(null);
  let data: T;
  const dataHandlling = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files, type } = e.target;
    data = { ...data, [name]: type == "file" ? files?.[0] : value };
    setImage(type == "file" ? files?.[0] ?? null : null);
    console.log(data);
  };
  const sendData = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(data);
    setData(data);
  };
  return (
    <form
      onSubmit={sendData}
      className="h-[546px] p-[16px] rounded-3xl bg-white flex flex-col"
    >
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mb-[32px]">{desc}</p>
      </div>
      <div className="flex flex-col justify-between flex-1">
        <div className={direction && direction}>
          {inputs.map((input, i) => (
            <div key={i}>
              <label className="block text-start" htmlFor={`input-${i}`}>
                {input.type !== "file" ? (
                  input.label
                ) : (
                  <img
                    src={image ? URL.createObjectURL(image) : input.label}
                    className="w-[150px]"
                  />
                )}
              </label>
              <input
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
                id={`input-${i}`}
                className={`bg-gray-200 w-full border border-gray-300 rounded-lg h-[40px] px-2 outline-none mb-[16px] focus:border-sky-600 ${
                  input.type === "file" && "hidden"
                }`}
                onChange={dataHandlling}
              />
            </div>
            // // {(e) =>
            //       setData((prev) => ({ ...prev, [input.name]: e.target.value }))
            //     }
          ))}
        </div>
        <div className="flex flex-col items-center gap-3">
          <input
            type="submit"
            value={loading ? "loading..." : btn}
            className="cursor-pointer w-[300px] h-[47px] bg-sky-600 rounded-xl text-white text-xl"
          />
          <div className="flex items-center gap-2">
            <p className="text-gray-500">{footer.text}</p>
            <Link className="text-sky-600 underline" to={footer.link.url}>
              {footer.link.content}
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AuthForm;
