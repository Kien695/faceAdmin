import { Children } from "react";
import LayoutDefault from "../../Layout/LayoutDefault";
import Dashboard from "../Dashboard";

export const routers = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
    ],
  },
];
