import _404 from "../components/common/_404";
import Unauthorized from "../components/common/Unauthorized";
import { DashboardPage, LoginPage, RedirectToLoginPage } from "./routeImports";
import routesConstants from "./routesConstants";

const routesConfig = {
  common: [
    {
      path: routesConstants.UNAUTHORIZED,
      component: Unauthorized,
    },
  ],
  private: [
    {
      path: routesConstants.HOME,
      component: DashboardPage,
    },
    { path: routesConstants._404, component: _404 },
  ],
  public: [
    {
      path: routesConstants.HOME,
      component: RedirectToLoginPage,
    },
    { path: routesConstants.LOGIN, component: LoginPage },
    { path: routesConstants._404, component: RedirectToLoginPage },
  ],
};

export default routesConfig;
