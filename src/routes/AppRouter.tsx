import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

// Layouts
import MainLayout from "./MainLayout";
import AdminLayout from "./AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import HomeRoute from "./HomeRoute";

// Customer pages
import LandingPage from "../pages/customer/LandingPage";
import Login from "../pages/customer/account/Login";
import SignUp from "../pages/customer/account/SignUp";
import CustomerProfile from "../pages/customer/account/CustomerProfile";
import EditProfile from "../pages/customer/account/EditProfile";
import Addresses from "../pages/customer/account/Addresses";
import Services from "../pages/customer/services/Services";
import ServiceDetails from "../pages/customer/services/ServiceDetails";
import OrderSummary from "../pages/customer/orders/OrderSummary";
import PickupScheduling from "../pages/customer/orders/PickupScheduling";
import OrderConfirmation from "../pages/customer/orders/OrderConfirmation";
import OrderTracking from "../pages/customer/orders/OrderTracking";
import MyOrders from "../pages/customer/orders/MyOrders";
import CustomerOrderDetails from "../pages/customer/orders/CustomerOrderDetails";
import AiAssistant from "../pages/customer/AiAssistant";

// Admin pages
import AdminLogin from "../pages/admin/account/AdminLogin";
import OrderDetails from "../pages/admin/orders/OrderDetails";
import Analysis from "../pages/admin/Analysis";
import AdminHome from "../pages/admin/home";
import Delivery from "../pages/admin/Delivery";
import AdminServices from "../pages/admin/services/AdminServices";
import LaundryItems from "../pages/admin/services/LaundryItems";
import Orders from "../pages/admin/orders/Orders";
import Customers from "../pages/admin/customers/Customers";
import CustomerDetails from "../pages/admin/customers/CustomerDetails";

import NotFound from "../pages/NotFound";
import ForgetPassword from "../pages/customer/account/ForgetPassword";

const router = createBrowserRouter([
  // Auth pages appear without Header/Footer and only for logged out visitors
  {
    element: <GuestRoute />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/forget-password", element: <ForgetPassword /> },
      { path: "/admin/login", element: <AdminLogin /> },
    ],
  },

  {
    // Main layout for all the customer pages, it has Header and Footer fixed in all pages
    element: <MainLayout />,
    children: [
      // Landing page for visitors, Home page after login
      { path: "/", element: <HomeRoute /> },
      { path: "/landing", element: <LandingPage /> },
      { path: "/dashboard", element: <Navigate to="/" replace /> },

      {
        element: <ProtectedRoute role="customer" />,
        children: [
          { path: "/profile", element: <CustomerProfile /> },
          { path: "/profile/edit", element: <EditProfile /> },
          { path: "/profile/addresses", element: <Addresses /> },
          { path: "/services", element: <Services /> },
          { path: "/services/:serviceId", element: <ServiceDetails /> },
          { path: "/orders/summary", element: <OrderSummary /> },
          { path: "/orders/scheduling", element: <PickupScheduling /> },
          { path: "/orders/confirmation", element: <OrderConfirmation /> },
          { path: "/orders/:orderId/tracking", element: <OrderTracking /> },
          { path: "/orders", element: <MyOrders /> },
          { path: "/orders/:orderId", element: <CustomerOrderDetails /> },
          { path: "/assistant", element: <AiAssistant /> },
        ],
      },

      // Any unknown route shows the 404 page with Header and Footer
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    // Admin layout for all dashboard pages, only for logged in admins
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminHome /> },

      { path: "services", element: <AdminServices /> },
      { path: "services/items", element: <LaundryItems /> },

      { path: "orders", element: <Orders /> },
      { path: "orders/:orderId", element: <OrderDetails /> },

      { path: "customers", element: <Customers /> },
      { path: "customers/:customerId", element: <CustomerDetails /> },

      { path: "delivery", element: <Delivery /> },
      { path: "analysis", element: <Analysis /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
