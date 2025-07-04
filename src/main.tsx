import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./Pages/Auth";
import LogIn from "./Pages/LogIn";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Items from "./Pages/Items";
import Favoraite from "./Pages/Favoraite";
import Orders from "./Pages/Orders";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListItems from "./Pages/ListItems";
import CreateItem from "./Pages/CreateItem";
import UpdateItem from "./Pages/UpdateItem";
// import CreateItem from "./Pages/CreateItem";
// import EditItem from "./Pages/EditItem"
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    children: [
      {
        path: "",
        element: <LogIn />,
      },
      {
        path: "signup",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "items",
        element: <Items />,
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<h1>Loading...</h1>}>
                <ListItems />
              </Suspense>
            ),
          },
          {
            path: "create",
            element: <CreateItem />,
          },
          {
            path: "edit/:id",
            element: <UpdateItem />,
          },
        ],
      },
      {
        path: "favorite",
        element: <Favoraite />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={routes} />
    <Toaster position="top-right" />
    <ToastContainer position="top-center" autoClose={3000} />
  </StrictMode>
);
