import { createBrowserRouter } from "react-router-dom";
import { User } from './pages/user'
import { Login } from './pages/login.jsx'
import { MainLayout } from './cmps/main-layout.jsx'
import { Product } from "./pages/product.jsx";
import { Cart } from "./pages/cart.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Product />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },

])
