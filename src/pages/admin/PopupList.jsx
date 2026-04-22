import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { PopupDataTable } from "../../components/Tables";
import { tokenExpired } from "../../libs/library";
import API from "../../libs/apiCall";

export default function PopupList() {
  const [popupData, setPopupData] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  const navigate = useNavigate();

  const updatePopupStatus = async (id) => {
    try {
      await API.put(`/popup/updatePopupStatus/${id}`);
      getPopups();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const getPopups = async () => {
    try {
      const { data: res } = await API.get("/popup/popupList");
      setPopupData(res.data.reverse());
    } catch (error) {
      console.error(error?.response?.data?.message);
      tokenExpired(error?.response?.data?.message);
    } finally {
      setPageLoading(false);
    }
  };

  const deletePopup = async (id) => {
    try {
      await API.delete(`/popup/deletePopup/${id}`);
      toast.success("Popup deleted");
      getPopups();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    setPageLoading(true);
    getPopups();
  }, []);

  if (pageLoading) return <Loading />;

  return (
    <>
      <div className="page-header">
        <h2 style={{ display: "flex", justifyContent: "space-between" }}>
          Popup List
          <Button
            variant="outlined"
            onClick={() => navigate("/dashboard/popup-create")}
          >
            Add Popup
          </Button>
        </h2>
      </div>
      <div className="table-data">
        <Toaster richColors position="top-center" />
        <div className="manage">
          <PopupDataTable
            updatePopupStatus={updatePopupStatus}
            deletePopup={deletePopup}
            popupData={popupData}
          />
        </div>
      </div>
    </>
  );
}
