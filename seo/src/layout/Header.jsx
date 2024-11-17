import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme css file
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import LocalStorage from "../services/localStorage";
import {
  fetchPropertyList,
  fetchUserDetails,
  handleAuthentication,
  toggleSideMenu,
  toggleTheme,
} from "../store/commonSlice";
import {
  createStaticRanges,
  DateRangePicker,
  defaultStaticRanges,
} from "react-date-range";
import { addMonths, format, subDays, subMonths } from "date-fns";
import { axiosSEO } from "../services/api";

const Header = () => {
  const dispatch = useDispatch();
  const { theme, userDetails } = useSelector((state) => state?.common);
  const [startDate, setStartDate] = useState(null);
  const [endDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { propertyList } = useSelector((state) => state.common);
  // const [dateRange, setDateRange] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     key: "selection",
  //   },
  // ]);
  const [dateRange, setDateRange] = useState([
    {
      startDate: subDays(new Date(), 1), // Yesterday
      endDate: addMonths(new Date(), 6), // Six months from now
      key: "selection",
    },
  ]);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const displayDate = `${format(
    dateRange[0].startDate,
    "dd/MM/yyyy"
  )} - ${format(dateRange[0].endDate, "dd/MM/yyyy")}`;

  const dropdownRef = useRef(null);

  const handleSidebar = () => {
    dispatch(toggleSideMenu());
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
    localStorage.setItem("dark", JSON.stringify(!theme));
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   const tokenData =
  //   LocalStorage.get("token");

  //   const userInfo = axios.get(
  //     "https://www.googleapis.com/oauth2/v3/userinfo",
  //     {
  //       headers: {
  //         Authorization: `Bearer ${tokenData}`,
  //       },
  //     }
  //   );

  //   const userData = userInfo;
  //   console.log("--->",userData );
  //   dispatch(fetchUserDetails(userData));
  // }, [dispatch]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const tokenData = LocalStorage.get("token");

        if (tokenData) {
          const response = await axiosSEO.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
              headers: {
                Authorization: `Bearer ${tokenData}`,
              },
            }
          );

          const userData = response.data;
          dispatch(fetchUserDetails(userData));
        } else {
          console.log("No token found in local storage");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [dispatch]);

  const fetchDashboardPropertyData = async () => {
    try {
      let res = await axiosSEO.get("/dashboard/property-list");
      if (res) {
        // const dashboardDataElement = document.getElementById("dashboard-data");
        // dashboardDataElement.textContent = JSON.stringify(res.data, null, 2);
        dispatch(fetchPropertyList(res.data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDashboardPropertyData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(handleAuthentication(false));
  };

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
    const start = format(ranges.selection.startDate, "dd/MM/yyyy");
    const end = format(ranges.selection.endDate, "dd/MM/yyyy");
    setShowDatePicker(false); // Close the DateRangePicker
  };

  const handleInputClick = () => {
    setShowDatePicker(true); // Open the DateRangePicker
  };

  const customStaticRanges = createStaticRanges([
    ...defaultStaticRanges, // Include the default static ranges
    {
      label: "Last 3 Months",
      range: () => ({
        startDate: subMonths(new Date(), 3),
        endDate: new Date(),
      }),
    },
    {
      label: "Last 6 Months",
      range: () => ({
        startDate: subMonths(new Date(), 6),
        endDate: new Date(),
      }),
    },
    {
      label: "Last 12 Months",
      range: () => ({
        startDate: subMonths(new Date(), 12),
        endDate: new Date(),
      }),
    },
  ]);

  return (
    <header className="z-10 py-4 dark:bg-gray-800 ">
      <div className=" flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        <button
          className="p-1 mr-5 -ml-1 rounded-md focus:outline-none focus:shadow-outline-purple"
          onClick={handleSidebar}
          aria-label="Menu"
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>

        <div className="flex gap-4 flex-1 lg:mr-32">
          <div className="w-full max-w-sm min-w-[200px]">
            <div className="relative">
              <select className="w-full bg-transparent placeholder:text-slate-400 text-black text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
                {propertyList?.properties_list?.map((url, index) => (
                  <option
                    key={index}
                    value={`proj${index + 1}`}
                    className="text-black"
                  >
                    {new URL(url).hostname}{" "}
                    {/* Display the hostname for cleaner appearance */}
                  </option>
                ))}
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.2"
                stroke="currentColor"
                className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                />
              </svg>
            </div>
          </div>

          {console.log("displayDate", displayDate)}
          <div className="w-full max-w-sm min-w-[200px] relative">
            <input
              type="text"
              value={displayDate}
              onClick={handleInputClick}
              readOnly
              placeholder="Select Date Range"
              className="w-full bg-transparent placeholder:text-slate-400 text-black text-sm border border-slate-200 rounded pl-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm cursor-pointer"
            />
            {showDatePicker && (
              <div className="absolute z-10 mt-2 date-picker-block">
                <DateRangePicker
                  ranges={dateRange}
                  onChange={handleSelect}
                  staticRanges={customStaticRanges} // Add custom ranges here
                  inputRanges={[]} // Disable custom input ranges
                  className="shadow-lg rdrDateRangePickerWrapper dark-theme"
                />
              </div>
            )}
          </div>
        </div>

        <ul className="flex items-center flex-shrink-0 space-x-6">
          <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={handleToggleTheme}
              aria-label="Toggle color mode"
            >
              {!theme ? (
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </button>
          </li>
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
              aria-label="Account"
              aria-haspopup="true"
            >
              {console.log("userDetails", userDetails)}
              <img
                className="object-cover w-8 h-8 rounded-full"
                src={userDetails?.picture}
                alt=""
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <ul
                className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
                aria-label="submenu"
              >
                {/* <li className="flex">
            <a
              className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
              href="#"
            >
              <svg
                className="w-4 h-4 mr-3"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span>Profile</span>
            </a>
          </li>
          <li className="flex">
            <a
              className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
              href="#"
            >
              <svg
                className="w-4 h-4 mr-3"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span>Settings</span>
            </a>
          </li> */}
                <li className="flex">
                  {userDetails && (
                    <span className="text-sm font-semibold ms-3">
                      {userDetails.name}
                    </span>
                  )}
                </li>
                <li className="flex" onClick={() => handleLogout()}>
                  <a
                    className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                    href="#"
                  >
                    <svg
                      className="w-4 h-4 mr-3"
                      aria-hidden="true"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                    </svg>
                    <span>Log out</span>
                  </a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};
export default Header;
