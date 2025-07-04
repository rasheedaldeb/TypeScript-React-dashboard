import { useEffect, useState } from "react";
import AuthForm from "../Components/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface SignUp {
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  profile_image: Blob | null;
}
const Register = () => {
  const navigate = useNavigate();
  const [registerLoading, setRegisterLoading] = useState(false);
  const [data, setData] = useState<SignUp>({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    profile_image: null,
  });
  const inputsArr = [
    {
      label: "First Name",
      type: "text",
      placeholder: "first name",
      name: "first_name",
    },
    {
      label: "Last Name",
      type: "text",
      placeholder: "last name",
      name: "last_name",
    },
    {
      label: "User Name",
      type: "text",
      placeholder: "user name",
      name: "user_name",
    },
    {
      label: "Email Address",
      type: "email",
      placeholder: "example@gmail.com",
      name: "email",
    },
    {
      label: "Password:",
      type: "password",
      placeholder: "**********",
      name: "password",
    },
    {
      label: "Password Confirmation:",
      type: "password",
      placeholder: "**********",
      name: "password_confirmation",
    },
    {
      label: "/assets/Img/person.jpg",
      type: "file",
      name: "profile_image",
    },
  ];
  useEffect(() => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("user_name", data.user_name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);
    if (data.profile_image) {
      formData.append("profile_image", data.profile_image);
    }
    setRegisterLoading(true);
    fetch("https://vica.website/api/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success("Registered Successfully");
        setTimeout(() => {
          if (localStorage.getItem("token")) {
            navigate("/dashboard");
          }
        }, 1000);
        setRegisterLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        setRegisterLoading(false);
      });
  }, [data]);
  return (
    <div>
      <AuthForm<SignUp>
        title="Create an Account"
        desc="create an account to continue"
        footer={{
          text: "already have an account?",
          link: { content: "sign in", url: "/" },
        }}
        btn="Sign Up"
        inputs={inputsArr}
        setData={setData}
        direction="grid grid-cols-3 gap-6"
        loading={registerLoading}
      />
    </div>
  );
};

export default Register;
