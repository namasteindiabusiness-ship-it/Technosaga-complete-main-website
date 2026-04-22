import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { tokenExpired } from "../../libs/library";
import { MemberDataTable } from "../../components/Tables";
import API from "../../libs/apiCall";

export default function MemberList() {
  const [memberData, setMemberData] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  const navigate = useNavigate();

  const updateMemberStatus = async (id) => {
    try {
      await API.put(`/member/memberStatusUpdate/${id}`);
      getMembers();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
      tokenExpired(error?.response?.data?.message);
    }
  };

  const getMembers = async () => {
    try {
      const { data: res } = await API.get("/member/memberList");
      setMemberData(res.data.reverse());
    } catch (error) {
      console.error(error?.response?.data?.message);
      tokenExpired(error?.response?.data?.message);
    } finally {
      setPageLoading(false);
    }
  };

  const deleteMember = async (id) => {
    try {
      await API.delete(`/member/memberDelete/${id}`);
      toast.success("member deleted");
      getMembers();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
      tokenExpired(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    setPageLoading(true);
    getMembers();
  }, []);

  if (pageLoading) return <Loading />;

  return (
    <>
      <div className="page-header">
        <h2 style={{ display: "flex", justifyContent: "space-between" }}>
          Members List
          <Button
            variant="outlined"
            onClick={() => navigate("/dashboard/member-create")}
          >
            Add Member
          </Button>
        </h2>
      </div>
      <div className="table-data">
        <Toaster richColors position="top-center" />
        <div className="manage">
          <MemberDataTable
            updateMemberStatus={updateMemberStatus}
            deleteMember={deleteMember}
            memberData={memberData}
            getMembers={getMembers}
          />
        </div>
      </div>
    </>
  );
}
