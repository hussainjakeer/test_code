import { Navigate } from "react-router-dom";
import routesConstants from "../../routes/routesConstants";

const _404 = () => {
  return <Navigate to={routesConstants.HOME} />;
};

export default _404;
