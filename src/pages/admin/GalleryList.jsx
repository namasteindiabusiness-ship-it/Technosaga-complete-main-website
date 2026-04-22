import React, { useEffect, useState } from "react";
import API from "../../libs/apiCall";
import Button from "@mui/material/Button";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { tokenExpired } from "../../libs/library";
import { GalleryDataTable } from "../../components/Tables";

export default function GalleryList() {
  const [galleryData, setGalleryData] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  const navigate = useNavigate();

  const getGallery = async () => {
    try {
      const { data: res } = await API.get("/gallery/galleryList");
      setGalleryData(res.data.reverse());
    } catch (error) {
      console.error(error?.response?.data?.message);
      tokenExpired(error?.response?.data?.message);
    } finally {
      setPageLoading(false);
    }
  };

  const deleteGallery = async (id) => {
    try {
      await API.delete(`/gallery/galleryDelete/${id}`);
      toast.success("Photo deleted");
      getGallery();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    setPageLoading(true);
    getGallery();
  }, []);

  if (pageLoading) return <Loading />;

  return (
    <>
      <div className="page-header">
        <h2 style={{ display: "flex", justifyContent: "space-between" }}>
          Photo Gallery
          <Button
            variant="outlined"
            onClick={() => navigate("/dashboard/gallery-create")}
          >
            Add Photo
          </Button>
        </h2>
      </div>
      <div className="table-data">
        <Toaster richColors position="top-center" />
        <div className="manage">
          <GalleryDataTable
            deleteGallery={deleteGallery}
            galleryData={galleryData}
          />
        </div>
      </div>
    </>
  );
}
