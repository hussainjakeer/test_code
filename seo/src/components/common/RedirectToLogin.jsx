import { Navigate } from "react-router-dom";
import routesConstants from "../../routes/routesConstants";

const RedirectToLogin = () => {
  return <Navigate to={routesConstants.LOGIN} replace />;
};

export default RedirectToLogin;
