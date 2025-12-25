import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";



let router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path:"login",
    Component: Login,
  },
  {
    path: "register",
    Component: Register,
  }
]);
export { router };
