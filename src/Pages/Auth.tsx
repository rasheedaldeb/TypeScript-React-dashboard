import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div className="relative flex items-center justify-center h-screen text-center">
      <img
        src="/assets/Img/auth-bg.png"
        alt=""
        className="absolute top-[0] left-[0] z-[-1] h-screen w-screen"
      />
      <Outlet />
    </div>
  );
};

export default Auth;
