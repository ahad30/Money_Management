import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AllProduct from "../Pages/AllProduct/AllProduct";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allProduct",
        element: <AllProduct />,
      },

      {
        path: "/login",
        element: <Login/>,
      },

      {
        path: "/register",
        element: <Register/>,
      },
 

    ],
  },
]);
