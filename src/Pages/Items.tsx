import { Outlet } from "react-router-dom";

const Items = () => {
  return (
    <div className="flex flex-col gap-4">
      <Outlet />
    </div>
  );
};

export default Items;
