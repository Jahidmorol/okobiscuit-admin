import Home from "../pages/Home/Home";
import Settings from "../pages/Settings/Settings";
import AddUser from "../pages/Users/AddUser";
import Users from "../pages/Users/Users";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <Home />,
  },
  {
    name: "Users",
    path: "users",
    element: <Users />,
  },
  {
    name: "Settings",
    path: "settings",
    element: <Settings />,
  },
  {
    name: "Add User",
    path: "add-user",
    element: <AddUser />,
  },
];
