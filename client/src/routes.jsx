import { createBrowserRouter } from "react-router-dom";
import Header from "./components/common/Header";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Success from "./pages/AuthProcess";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/success",
        element: <Success />,
      },
    ],
  },
]);

export default routes;
