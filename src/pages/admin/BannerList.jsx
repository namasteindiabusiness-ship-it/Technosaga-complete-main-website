import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { BannerDataTable } from "../../components/Tables";
import { tokenExpired } from "../../libs/library";
import API from "../../libs/apiCall";

export default function BannerList() {
  const [bannerData, setBannerData] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  const navigate = useNavigate();

  const updateBannerStatus = async (id) => {
    try {
      await API.put(`/banner/bannerStatusUpdate/${id}`);
      getBanners();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const getBanners = async () => {
    try {
      const { data: res } = await API.get("/banner/bannerList");
      setBannerData(res.data.reverse());
    } catch (error) {
      console.error(error?.response?.data?.message);
      tokenExpired(error?.response?.data?.message);
    } finally {
      setPageLoading(false);
    }
  };

  const deleteBanner = async (id) => {
    try {
      await API.delete(`/banner/bannerDelete/${id}`);
      toast.success("Banner deleted");
      getBanners();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    setPageLoading(true);
    getBanners();
  }, []);

  if (pageLoading) return <Loading />;

  return (
    <>
      <div className="page-header">
        <h2 style={{ display: "flex", justifyContent: "space-between" }}>
          Banner List
          <Button
            variant="outlined"
            onClick={() => navigate("/dashboard/banner-create")}
          >
            Add Banner
          </Button>
        </h2>
      </div>
      <div className="table-data">
        <Toaster richColors position="top-center" />
        <div className="manage">
          <BannerDataTable
            updateBannerStatus={updateBannerStatus}
            deleteBanner={deleteBanner}
            bannerData={bannerData}
          />
        </div>
      </div>
    </>
  );
}
