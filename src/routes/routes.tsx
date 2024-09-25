import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import InvoicePage from "../pages/Invoice/Invoice";
import EmployeeDetailsPage from "../pages/Employee/EmployeeDetails";
import ResetPassword from "../pages/Auth/ResetPassword";
import Login from "../pages/Auth/Login";
import ForgetPassword from "../pages/Auth/ForgetPassword";
import Home from "../pages/Home/Home";
import Register from "../pages/Auth/RegisterSeller";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/order",
        element: <EmployeeDetailsPage />,
      },
      {
        path: "/invoice",
        element: <InvoicePage />,
      },
    ],
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
]);

export default router;
