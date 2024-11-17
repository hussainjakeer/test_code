import { Suspense } from "react";

import PropTypes from "prop-types";
import routesConfig from "./routes.config";
import { Route, Routes as ReactRouterDomRoutes } from "react-router-dom";
import Layout from "../layout";
import Loader from "../components/common/loaders/Loader";
import RequiredAuth from "../components/common/RequiredAuth";
import { useSelector } from "react-redux";

const Common = (route) => (
  <Suspense fallback={<Loader />}>
    <route.component />
  </Suspense>
);

Common.prototype = {
  component: PropTypes.elementType.isRequired,
};

const Public = (route) => {
  // Logic for public routes
  // const { user } = useAuth();
  // const redirectTo = "/";
  // if (!!user) return <Navigate to={redirectTo} replace />;
  return (
    <Suspense fallback={<Loader />}>
      <route.component />
    </Suspense>
  );
};

Public.prototype = {
  ...Common.prototype,
};

const Private = (route) => {
  // Logic for Private routes
  const { component: Component } = route;
  //   const currentUserRole = user.role;
  //   if (!!permissions?.length && !permissions.includes(currentUserRole))
  //     return <Navigate to={"/unauthorized"} replace />;
  return (
    <Suspense fallback={<Loader />}>
      <RequiredAuth>
        <Component />
      </RequiredAuth>
    </Suspense>
  );
};

Private.prototype = {
  ...Common.prototype,
};

const createNestedRoutes = (routes, RouteType) => {
  return routes.map((route, i) => {
    if (!route.component) {
      throw new Error("Component must be required....");
    }
    if (route.children) {
      return (
        <Route
          path={route.path}
          key={i}
          element={<RouteType component={route.component} />}
        >
          {createNestedRoutes(route.children, RouteType)}
        </Route>
      );
    } else {
      return (
        <Route
          key={i}
          index={route.index}
          path={route.path}
          element={<RouteType component={route.component} />}
        />
      );
    }
  });
};

const Routes = () => {
  const { common, private: privateRoutes, public: publicRoutes } = routesConfig;
  const { isAuthenticated } = useSelector((state) => state?.common);
  return (
    <ReactRouterDomRoutes>
      {createNestedRoutes(common, Common)}
      {isAuthenticated ? (
        <Route path="/" element={<Layout />}>
          {createNestedRoutes(privateRoutes, Private)}
        </Route>
      ) : (
        <Route>{createNestedRoutes(publicRoutes, Public)}</Route>
      )}
    </ReactRouterDomRoutes>
  );
};

export default Routes;
