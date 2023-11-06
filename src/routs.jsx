import { createBrowserRouter } from "react-router-dom";
import { Home } from './pages/home'
import { MainLayout } from './pages/main-layout.jsx'
import { BasicTable } from "./pages/basic-table.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/basic-table",
        element: <BasicTable />,
      },
    ]
  },
  

])
