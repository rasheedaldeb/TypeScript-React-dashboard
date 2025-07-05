import { useEffect, useState } from "react";
import AuthForm from "../Components/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
interface LogInData {
  email: string;
  password: string;
}
const LogIn = () => {
  const navigate = useNavigate();
  const [logInLoading, setLogInLoading] = useState(false);
  const [data, setData] = useState<LogInData>({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (data.email !== "") {
      logIn();
    }
  }, [data]);
  const logIn = async () => {
    setLogInLoading(true);
    const response = await fetch("https://vica.website/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Response:", result);

    if (!response.ok) {
      // Handle error response
      const errorMessage =
        result.msg || result.message || "Login failed. Please try again.";
      toast.error(errorMessage);
      setLogInLoading(false);
      return;
    }

    // Handle success response
    localStorage.setItem("token", result.token);
    localStorage.setItem("user", JSON.stringify(result.user));
    toast.success("Logged In Successfuly");
    setTimeout(() => {
      if (result.token && result.token !== undefined) {
        navigate("/dashboard");
      }
    }, 500);
    setLogInLoading(false);
  };
  const inputsArr = [
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
  ];
  return (
    <>
      <AuthForm<LogInData>
        title="Login to Account"
        desc="Please enter your email and password to continue"
        inputs={inputsArr}
        btn="Sign In"
        footer={{
          text: "don`t have an account?",
          link: { content: "create account", url: "/signup" },
        }}
        setData={setData}
        loading={logInLoading}
      />
    </>
  );
};

export default LogIn;
