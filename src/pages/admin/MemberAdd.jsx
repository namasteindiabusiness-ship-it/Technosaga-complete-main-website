import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import { toast } from "sonner";
import { BiLoader } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { tokenExpired } from "../../libs/library";
import API from "../../libs/apiCall";

export default function MemberAdd() {
  const [designation, setDesignation] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const inputFile = useRef(null);

  const handleBannerAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("photo", file);
      formData.append("name", name);
      formData.append("designation", designation);

      await API.post("/member/memberCreate", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("member added");
      setDesignation("");
      setName("");
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
          Members Add
          <Button
            variant="outlined"
            onClick={() => navigate("/dashboard/member-list")}
          >
            Back to List
          </Button>
        </h2>
      </div>
      <div className="manage">
        <div className="add-product">
          <form onSubmit={handleBannerAdd}>
            <div className="form-row">
              <div className="inpt-row">
                <label>Member Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="inpt-row">
                <label>Designation</label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="inpt-row">
                <label>Photo</label>
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
                "Add"
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
