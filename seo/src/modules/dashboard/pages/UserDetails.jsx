import { useMemo } from "react";
import CustomTable from "../../../components/common/CustomTable";

const UserDetails = () => {
  const userData = [
    {
      name: "Hans Burger",
      amount: "863.45",
      date: "10/12/2023",
    },
    {
      name: "Hans Burger",
      amount: "863.45",
      date: "10/12/2023",
    },
    {
      name: "Hans Burger",
      amount: "863.45",
      date: "10/12/2023",
    },
  ];

  const columns = [
    {
      id: "name",
      Header: "Name",
      accessor: "name",
    },
    {
      id: "amount",
      Header: "Amount",
      accessor: "amount",
    },
    {
      id: "date",
      Header: "Date",
      accessor: "date",
    },
  ];

  const handleSearch = (e) => {
    // dispatch(setCategorySearch(e.target.value));
    // dispatch(setCategoryPage(1));
  };

  const handleAddButtonClick = () => {
    // clearLocal();
    // navigate(`${RouteConstants.add_edit_category}`);
  };
  const pageOptions = useMemo(
    () => ({
      page: 1,
      sizePerPage: 10,
      totalSize: 20,
      sizePerPageList: 2,
      custom: true,
    }),
    []
  );

  return (
    <>
      <CustomTable
        data={userData || []}
        keyField="user_id"
        columns={columns || null}
        addBtnText="Add User"
        pageOptions={pageOptions}
        withPagination={true}
        handleSearch={handleSearch}
        // onAddButtonClick={handleAddButtonClick}
        // loading={loading}
        isSearch={true}
        // search={search}
        // sortField={sortField}
        // sortOrder={sortOrder}
        title="Add"
        module="User"
        moduleTitle="All User"
      />
    </>
  );
};

export default UserDetails;
