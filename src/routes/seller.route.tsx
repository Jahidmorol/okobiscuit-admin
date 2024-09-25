import EmployeeDetailsPage from "../pages/Employee/EmployeeDetails";
import Home from "../pages/Home/Home";
import InvoicePage from "../pages/Invoice/Invoice";

export const sellerPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <Home />,
  },
  {
    name: "Order",
    children: [
      {
        name: "All Orders",
        path: "/order",
        element: <EmployeeDetailsPage />,
      },
      {
        name: "Invoice",
        path: "/invoice",
        element: <InvoicePage />,
      },
    ],
  },
];
