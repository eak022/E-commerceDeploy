import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/Main";
import DashboardLayout from "../layouts/DashbordLayout";
import Dashboard from "../Dashboard/index";
import Home from "../pages/Home/Index";
import Shop from "../pages/Shop/Index";
import Cart from "../pages/Cart/Index";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import UpdateProfile from "../components/UpdateProfile";
import ProfileUser from "../components/UserProfile";
import ProtectPage from "../pages/ProtectPage/index";
import AddProduct from "../pages/AddProduct/index";
import ManageItems from "../pages/ManageItems/index";
import AdminRoute from "../ProtectRoutes/AdminRoute";
import ManageUsers from "../pages/ManageUser/index";
import ManageOrders from "../pages/ManageOrders/index";
import CheckOutSuccess from "../pages/CheckOut/index";

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
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/checkout-success",
        element: <CheckOutSuccess />,
      },
      {
        path: "/cart",
        element: (
          <ProtectPage>
            <Cart />
          </ProtectPage>
        ),
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/updateProfile",
        element: (
          <ProtectPage>
            <UpdateProfile />
          </ProtectPage>
        ),
      },
      {
        path: "/profileUser",
        element: (
          <ProtectPage>
            <ProfileUser />
          </ProtectPage>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "add-Product",
        element: <AddProduct />,
      },
      {
        path: "manage-items",
        element: <ManageItems />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "manage-orders",
        element: <ManageOrders />,
      },
    ],
  },
]);
export default router;
