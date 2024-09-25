import { Menu, Layout } from "antd";
import { getUserInfo } from "../utils/localStorageAuthManagemet";
import { verifyToken } from "../utils/verifyToken";
import { TSidebarItem } from "../types/global.type";
import sidebarItemsGenerator from "../utils/sidebarItemsGenerator";
import { adminPaths } from "../routes/admin.routes";
import { sellerPaths } from "../routes/seller.route";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  Seller: "faculty",
  SuperAdmin: "superAdmin",
};

const Sidebar = () => {
  const token = getUserInfo();

  let user;

  if (token) {
    user = verifyToken(token);
  }
  let sidebarItems: TSidebarItem[] = [];

  switch (user?.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.SuperAdmin:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.SuperAdmin);
      break;
    case userRole.Seller:
      sidebarItems = sidebarItemsGenerator(sellerPaths, userRole.Seller);
      break;

    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
      // onBreakpoint={(broken) => {
      //   console.log(broken);
      // }}
      // onCollapse={(collapsed, type) => {
      //   console.log(collapsed, type);
      // }}
    >
      <div
        style={{
          color: "white",
          textAlign: "center",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>PH University</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
