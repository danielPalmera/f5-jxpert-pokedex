import { useEffect, useRef, useState } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { App } from "./App";
import { App2 } from "./App2";
import { FloatingTab } from "./components/layout/FloatingTab";

const routes = {
  home: {
    path: "/",
    element: App2,
  },
  old: {
    path: "/original",
    element: App,
  },
};

const Layout = () => {
  const navigate = useNavigate();
  const [party, setParty] = useState(false);
  const linkRef = useRef<HTMLLinkElement | null>(null);

  useEffect(() => {
    if (party) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/assets/styles/styles-party.css";
      document.head.appendChild(link);
      linkRef.current = link;
    } else if (linkRef.current?.parentNode) {
      linkRef.current.parentNode.removeChild(linkRef.current);
      linkRef.current = null;
    }
    return () => {
      if (linkRef.current?.parentNode) {
        linkRef.current.parentNode.removeChild(linkRef.current);
      }
    };
  }, [party]);

  return (
    <>
      <FloatingTab
        onNavOld={() => navigate("/original")}
        onNavNew={() => navigate("/")}
        onToggleParty={() => setParty((prev) => !prev)}
        party={party}
      />
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
