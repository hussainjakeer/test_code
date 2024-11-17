import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { toggleSideMenu } from "../store/commonSlice";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  const { isSideMenuOpen } = useSelector((state) => state?.common);
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    dispatch(toggleSideMenu());
  };

  return (
    <div className="theme-dark">
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar isOpen={isSideMenuOpen} />
        <div className="flex flex-col  w-full">
          <Header toggleSidebar={toggleSidebar} />
          <main className="h-full overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
