import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { VacancyDataTable } from "../../components/Tables";
import { tokenExpired } from "../../libs/library";
import API from "../../libs/apiCall";

export default function VacancyList() {
  const [vacancyData, setVacancyData] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  const navigate = useNavigate();

  const updateVacancyStatus = async (id) => {
    try {
      await API.put(`/vacancy/vacancyStatusUpdate/${id}`);
      getVacancy();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
      tokenExpired(error?.response?.data?.message);
    }
  };

  const getVacancy = async () => {
    try {
      const { data: res } = await API.get("/vacancy/vacancyList");
      setVacancyData(res.data.reverse());
    } catch (error) {
      console.error(error?.response?.data?.message);
      tokenExpired(error?.response?.data?.message);
    } finally {
      setPageLoading(false);
    }
  };

  const deleteVacancy = async (id) => {
    try {
      await API.delete(`/vacancy/vacancyDelete/${id}`);
      toast.success("Press Release deleted");
      getVacancy();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    setPageLoading(true);
    getVacancy();
  }, []);

  if (pageLoading) return <Loading />;

  return (
    <>
      <div className="page-header">
        <h2 style={{ display: "flex", justifyContent: "space-between" }}>
          Vacancy List
          <Button
            variant="outlined"
            onClick={() => navigate("/dashboard/vacancy-create")}
          >
            Add
          </Button>
        </h2>
      </div>
      <div className="table-data">
        <Toaster richColors position="top-center" />
        <div className="manage">
          <VacancyDataTable
            deleteVacancy={deleteVacancy}
            updateVacancyStatus={updateVacancyStatus}
            vacancyData={vacancyData}
          />
        </div>
      </div>
    </>
  );
}
