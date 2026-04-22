import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import { toast, Toaster } from "sonner";
import { BiLoader } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { tokenExpired } from "../../libs/library";
import API from "../../libs/apiCall";

export default function PopupAdd() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const inputFile = useRef(null);

  const handlePopupAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("photo", file);
      formData.append("title", title);

      await API.post("/popup/createPopup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Popup created");
      setTitle("");
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
        <h2 className="d-flexs">
          Popup Add
          <Button
            variant="outlined"
            onClick={() => navigate("/dashboard/popup-list")}
          >
            Back to List
          </Button>
        </h2>
      </div>
      <div className="manage">
        <div className="add-product">
          <form onSubmit={handlePopupAdd}>
            <div className="form-row">
              <div className="inpt-row">
                <label>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                "Add Popup"
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
