import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { tokenExpired } from "../../libs/library";
import API from "../../libs/apiCall";
import { UserDataTable } from "../../components/Tables";

export default function UserList() {
  const [userData, setUserData] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  const fetchUser = async () => {
    try {
      const { data: res } = await API.get("/account/getUsers");
      setUserData(res.data.reverse());
    } catch (error) {
      console.error(error?.response?.data?.message);
      tokenExpired(error?.response?.data?.message);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    setPageLoading(true);
    fetchUser();
  }, []);

  if (pageLoading) return <Loading />;
  return (
    <>
      <div className="page-header">
        <h2 style={{ display: "flex", justifyContent: "space-between" }}>
          User List
        </h2>
      </div>
      <div className="table-data">
        <div className="manage">
          <UserDataTable userData={userData} />
        </div>
      </div>
    </>
  );
}
