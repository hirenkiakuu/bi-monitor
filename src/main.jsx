import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

import Dashboard from "./layouts/Dashboard.jsx";
import Metricspage from "./pages/MetricsPage/Metricspage.jsx";
import ActiveTab from "./layouts/Activetab/Activetab.jsx";
import ExcelDataEditor from "./pages/ExcelDataEditor/ExcelDataEditor.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/",
        element: <ActiveTab />,
        children: [
          {
            path: "/metrics",
            element: <Metricspage />,
          },
          {
            path: "/edit",
            element: <ExcelDataEditor />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
