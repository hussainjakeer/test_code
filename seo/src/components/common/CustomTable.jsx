/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";

import { sortOrders } from "./constant/Table";
import useOutsideClick from "../../hooks/useOutSideClick";

const Row = ({ row, i }) => {
  return (
    <tr className="text-gray-700 dark:text-gray-400 text-sm" key={i}>
      {row?.cells?.map((cell, index) => {
        return (
          <td key={index} {...cell.getCellProps()} className="px-4 py-3">
            <p className="font-semibold">{cell.render("Cell")}</p>
          </td>
        );
      })}
    </tr>
  );
};

export const Pagination = ({
  pagination,
  handlePrevious,
  handleNext,
  handleSizeChange,
  showSizePerPage,
  handlePageDropdown,
  paginationRef,
  isDarkTheme,
}) => {
  return (
    <div
      className="px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase 
    dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800 flex justify-between"
    >
      <div className="flex items-center col-span-3">
        <span>Records Per Page:</span>
        <div className="relative ml-2">
          <button
            type="button"
            className={`bg-gray-200 text-gray-700 px-3 py-1 rounded shadow ${
              showSizePerPage ? "bg-gray-300" : ""
            }`}
            onClick={handlePageDropdown}
          >
            {pagination?.sizePerPage}
          </button>
          <ul
            className={`absolute bg-white shadow rounded mt-1 ${
              showSizePerPage ? "block" : "hidden"
            }`}
            ref={paginationRef}
          >
            {/* {pagination?.sizePerPageList?.map((pageSize, index) => {
              return (
                <li
                  key={index}
                  onClick={() => handleSizeChange(pageSize.value)}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                >
                  {pageSize.text}
                </li>
              );
            })} */}
          </ul>
        </div>
      </div>
      <div className="flex col-span-4 mt-2 sm:mt-auto lg:mt-2">
        <span className="lg:mt-1">
          {pagination?.totalSize === 0
            ? 0
            : (pagination?.page - 1) * pagination?.sizePerPage + 1}{" "}
          -
          {pagination?.page * pagination?.sizePerPage <= pagination?.totalSize
            ? pagination?.page * pagination?.sizePerPage
            : pagination?.totalSize}{" "}
          of {pagination?.totalSize} Records
        </span>
        <div className="flex ml-4">
          <button
            className={`px-2 py-1 rounded hover:bg-gray-300 ${
              isDarkTheme
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                : "bg-gray-200 text-gray-700"
            }`}
            disabled={pagination?.page === 1}
            onClick={handlePrevious}
          >
            <i
              className={`fas fa-angle-left ${
                isDarkTheme ? "text-gray-200" : "text-gray-700"
              }`}
            ></i>
          </button>
          <button
            className={`px-2 py-1 rounded hover:bg-gray-300 ml-2 ${
              isDarkTheme
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={handleNext}
            disabled={
              pagination?.page * pagination?.sizePerPage >=
              pagination?.totalSize
            }
          >
            <i
              className={`fas fa-angle-right ${
                isDarkTheme ? "text-gray-200" : "text-gray-700"
              }`}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};

const CustomTable = ({
  columns = [],
  data = [],
  isSearch = "",
  search = "",
  handleSearch = () => {},
  title = "",
  onAddButtonClick = () => {},
  addBtnText = "",
  loading,
  pageOptions,
  sortField,
  sortOrder,
  module = "",
  moduleTitle = "",
  isQueryData,
}) => {
  const [showSizePerPage, setShowSizePerPage] = useState(false);
  const navigate = useNavigate();
  const paginationRef = useRef();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
      manualSortBy: true,
    });

  //   const handlePageChange = (direction) => {
  //     const actionMap = {
  //       Authors: setAuthorPage,
  //       Users: setUsersPage,
  //       Categories: setCategoryPage,
  //       Collections: setCollectionPage,
  //       Components: setComponentPage,
  //       Segments: setSegmentPage,
  //     };
  //     dispatch(actionMap[module](pageOptions.page + direction));
  //   };

  //   const handleSizeChange = (pageRecord) => {
  //     const actionMap = {
  //       Authors: setAuthorSizePerPage,
  //       Users: setUsersSizePerPage,
  //       Categories: setCategorySizePerPage,
  //       Collections: setCollectionSizePerPage,
  //       Components: setComponentSizePerPage,
  //       Segments: setSegmentSizePerPage,
  //     };
  //     dispatch(actionMap[module](pageRecord));
  //     dispatch(actionMap[module].page(1));
  //     setShowSizePerPage(false);
  //   };

  const handlePageDropdown = () => {
    setShowSizePerPage(!showSizePerPage);
  };

  useOutsideClick(paginationRef, () => {
    setShowSizePerPage(false);
  });

  const handleSort = (sortBy) => {
    // const newSortField = sortBy;
    // const newSortOrder = sortField === newSortField && sortOrder === sortOrders.DESC ? sortOrders.ASC : sortOrders.DESC;
    // const actionMap = {
    //   Roles: [setRolesSortField, setRolesSortOrder],
    //   Authors: [setAuthorSortField, setAuthorSortOrder],
    //   Users: [setUsersSortField, setUsersSortOrder],
    //   Categories: [setCategorySortField, setCategorySortOrder],
    //   Collections: [setCollectionSortField, setCollectionSortOrder],
    //   Components: [setComponentSortField, setComponentSortOrder],
    //   Segments: [setSegmentSortField, setSegmentSortOrder],
    // };
    // dispatch(actionMap[module][0](newSortField));
    // dispatch(actionMap[module][1](newSortOrder));
  };

  return (
    <div className={`w-full overflow-hidden rounded-lg shadow-xs`}>
      <div className="w-full overflow-x-auto">
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table {...getTableProps()} className={`w-full whitespace-no-wrap`}>
              <thead>
                {headerGroups?.map((headerGroup, i) => (
                  <tr
                    key={i}
                    {...headerGroup.getHeaderGroupProps()}
                    className={`text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800`}
                  >
                    {headerGroup?.headers?.map((column, index) => {
                      const isCaretEnabled = sortField === column.id;
                      const isUpCaretEnabled =
                        isCaretEnabled && sortOrder === sortOrders.ASC;
                      const isDownCaretEnabled =
                        isCaretEnabled && sortOrder === sortOrders.DESC;
                      return (
                        <th
                          className={`px-4 py-3`}
                          key={index}
                          {...column?.getHeaderProps()}
                          onClick={() =>
                            !column?.disableSortBy && handleSort(column.id)
                          }
                        >
                          {column?.render("Header")}{" "}
                          {column?.disableSortBy && (
                            <>
                              {isCaretEnabled ? (
                                <>
                                  {isUpCaretEnabled && (
                                    <i className="fa-solid fa-arrow-up"></i>
                                  )}
                                  {isDownCaretEnabled && (
                                    <i className="fa-solid fa-arrow-down"></i>
                                  )}
                                </>
                              ) : (
                                <i className="fa-solid fa-arrow-up"></i>
                              )}
                            </>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className={`bg-white divide-y dark:divide-gray-700 dark:bg-gray-800`}
              >
                {!loading ? (
                  !!rows?.length ? (
                    rows?.map((row, index) => {
                      prepareRow(row);
                      return <Row key={index} row={row} />;
                    })
                  ) : (
                    <tr className="text-gray-700 dark:text-gray-400">
                      <td colSpan={columns.length} className="text-center p-4">
                        No Data Available!
                      </td>
                    </tr>
                  )
                ) : (
                  <tr className="text-gray-700 dark:text-gray-400">
                    <td colSpan={columns.length} className="px-4 py-3">
                      {/* <Loader /> */}
                      Loading..
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-2">
          {/* <Pagination
              pagination={pageOptions}
              handleNext={() => handlePageChange(1)}
              handlePrevious={() => handlePageChange(-1)}
              handleSizeChange={1}
              showSizePerPage={10}
              handlePageDropdown={handlePageDropdown}
              paginationRef={paginationRef}
              isDarkTheme={isDarkTheme}
            /> */}
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
