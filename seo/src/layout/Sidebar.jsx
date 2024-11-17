import { Link, NavLink } from "react-router-dom";
import DashboardIcon from "../assets/icons/sidebar/DashboardIcon";
import ProjectIcon from "../assets/icons/sidebar/ProjectIcon";
import SEOTestIcon from "../assets/icons/sidebar/SEOTestIcon";
import ContentIcon from "../assets/icons/sidebar/ContentIcon";
import ReportIcon from "../assets/icons/sidebar/ReportIcon";
import TemplateIcon from "../assets/icons/sidebar/TemplateIcon";

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`
          ${isOpen ? "w-20 md:w-64" : "w-0 md:w-20"}
          overflow-y-auto bg-white dark:bg-gray-800 flex-shrink-0 transition-all duration-300
      `}
    >
      <div className="py-4 text-gray-500 dark:text-gray-400">
        <a
          className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
          href="#"
        ></a>

        <ul className="mt-6">
          <li title="Dashboard">
            <NavLink
              className={({ isActive }) => `
                inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 
                ${
                  isActive
                    ? "text-sm active p-4 font-semibold text-purple-100 bg-purple-600 shadow-md"
                    : ""
                }`}
            >
              <DashboardIcon />
              {isOpen && (
                <span className="ml-4 hidden md:block">Dashboard</span>
              )}
            </NavLink>
          </li>
          <li className="relative px-6 py-3" title="Projects">
            <Link className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
              <ProjectIcon />
              {isOpen && <span className="ml-4 hidden md:block">Projects</span>}
            </Link>
          </li>
          <li className="relative px-6 py-3" title="SEO Tests">
            <Link className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
              <SEOTestIcon />
              {isOpen && (
                <span className="ml-4 hidden md:block">SEO Tests</span>
              )}
            </Link>
          </li>
          <li className="relative px-6 py-3" title="Content Management">
            <Link className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
              <ContentIcon />
              {isOpen && (
                <span className="ml-4 hidden md:block">Content Management</span>
              )}
            </Link>
          </li>
          <li className="relative px-6 py-3" title="Reports">
            <Link className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
              <ReportIcon />
              {isOpen && <span className="ml-4 hidden md:block">Reports</span>}
            </Link>
          </li>
          <li className="relative px-6 py-3" title="Templates">
            <Link className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
              <TemplateIcon />
              {isOpen && (
                <span className="ml-4 hidden md:block">Templates</span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
