import { Outlet } from "react-router-dom";

const RequiredAuth = ({ children }) => {
  // Authentication logic goes here
  //   const { user } = useAuth();
  //   const location = useLocation();
  //   if (!!!user)
  //     return (
  //       <Navigate
  //         to={"/login"}
  //         state={{
  //           from: location.pathname,
  //         }}
  //         replace
  //       />
  //     );

  return <> {children}</>;
};

export default RequiredAuth;
