import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Dashboard from "./views/Dashboard.tsx";
import FloorPlan from "./views/FloorPlan.tsx";
import RealTime from "./views/RealTime.tsx";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
  },
  {
    path: "/FloorPlan",
    element: <FloorPlan />,
  },
  {
    path: "/RealTime",
    element: <RealTime />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
