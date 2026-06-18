import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { App } from "./App";
import { App2 } from "./App2";

const routes = {
  home: {
    path: "/",
    element: App2,
  },
  old: {
    path: "/old",
    element: App,
  },
};

const Layout = () => {
  const navigate = useNavigate();

  return (
    <>
      <aside className="floating-tab">
        <button className="floating-tab__btn" onClick={() => navigate("/old")}>
          O
        </button>
        <button className="floating-tab__btn" onClick={() => navigate("/")}>
          N
        </button>
      </aside>
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: Object.values(routes).map(({ element: Element, path }) => ({
      path,
      element: <Element />,
    })),
  },
  { path: "*", element: <div className="notfound">Page not found</div> },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
