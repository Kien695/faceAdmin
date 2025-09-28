import { Children } from "react";
import LayoutDefault from "../../Layout/LayoutDefault";
import Dashboard from "../../Pages/Dashboard";
import Product from "../../Pages/Product";
import Category from "../../Pages/Category";
import SubCategory from "../../Pages/SubCategory";
import User from "../../Pages/Users";
import Order from "../../Pages/Orders";
import Login from "../../Pages/Login";
import Register from "../../Pages/Register";
import VerifyEmail from "../../Pages/VerifyEmail";
import BannerHome from "../../Pages/BannerHome";
import BannerListOne from "../../Pages/BannerListOne";
import BannerListTwo from "../../Pages/BannerListTwo";
import Blog from "../../Pages/Blogs";
import LogoShop from "../../Pages/LogoShop";
import Role from "../../Pages/Role";
import Permission from "../../Pages/Permission";
import PrivateRouters from "../PrivateRouter";
import MyAccount from "../../Pages/MyAccount";
export const routers = [
  {
    path: "/",
    element: (
      <PrivateRouters>
        <LayoutDefault />
      </PrivateRouters>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/profile",
        element: <MyAccount />,
      },
      {
        path: "/products",
        element: <Product />,
      },
      {
        path: "/categories",
        element: <Category />,
      },
      {
        path: "/subCategories",
        element: <SubCategory />,
      },
      {
        path: "/users",
        element: <User />,
      },
      {
        path: "/orders",
        element: <Order />,
      },
      {
        path: "/bannerHome",
        element: <BannerHome />,
      },
      {
        path: "/bannerListOne",
        element: <BannerListOne />,
      },
      {
        path: "/bannerListTwo",
        element: <BannerListTwo />,
      },
      {
        path: "/blogs",
        element: <Blog />,
      },
      {
        path: "/logo",
        element: <LogoShop />,
      },
      {
        path: "/roles",
        element: <Role />,
      },
      {
        path: "/permission",
        element: <Permission />,
      },
    ],
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
    path: "/verify-email",
    element: <VerifyEmail />,
  },
];
