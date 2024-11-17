import { lazy } from "react";

export const DashboardPage = lazy(() => import("../modules/dashboard/pages"));
export const LoginPage = lazy(() => import("../modules/login/pages"));
export const RedirectToLoginPage = lazy(() =>
  import("../components/common/RedirectToLogin")
);
