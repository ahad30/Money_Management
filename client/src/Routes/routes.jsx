import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import AddTask from "../Pages/AllTask/AddTask";
import EditTask from "../Pages/AllTask/EditTask";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

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
        path: "/addTask",
        element: <AddTask/>,
      },
      {
        path: "/editTask/:id",
        element: <EditTask/>,
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
