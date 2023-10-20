import { createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";

export const routers = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/home", element: <HomePage /> },
]);
