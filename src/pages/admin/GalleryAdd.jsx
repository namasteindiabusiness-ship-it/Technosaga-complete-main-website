import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import { toast, Toaster } from "sonner";
import { BiLoader } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { tokenExpired } from "../../libs/library";
import API from "../../libs/apiCall";

export default function GalleryAdd() {
  const [photoName, setPhotoName] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const inputFile = useRef(null);

  const handleGalleryAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("photo", file);
      formData.append("title", photoName);

      await API.post("/gallery/galleryCreate", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Photo added");
      setPhotoName("");
      inputFile.current.value = "";
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
      tokenExpired(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <h2 style={{ display: "flex", justifyContent: "space-between" }}>
          Photo Add
          <Button
            variant="outlined"
            onClick={() => navigate("/dashboard/gallery-list")}
          >
            Back to List
          </Button>
        </h2>
      </div>
      <div className="manage">
        <div className="add-product">
          <form onSubmit={handleGalleryAdd}>
            <div className="form-row">
              <div className="inpt-row">
                <label>Photo Name</label>
                <input
                  type="text"
                  value={photoName}
                  onChange={(e) => setPhotoName(e.target.value)}
                  required
                />
              </div>
              <div className="inpt-row">
                <label>Upload</label>
                <input
                  type="file"
                  ref={inputFile}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>
            <Button type="submit" variant="contained" disableElevation>
              {loading ? (
                <BiLoader size={24} className="animate-spin" />
              ) : (
                "Add Photo"
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
