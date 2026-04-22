import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import { toast, Toaster } from "sonner";
import { BiLoader } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { tokenExpired } from "../../libs/library";
import API from "../../libs/apiCall";

export default function VacancyAdd() {
  const [positionName, setPositionName] = useState("");
  const [numberOfPositions, setNumberOfPositions] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [aboutPosition, setAboutPosition] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const clearInputs = () => {
    setPositionName("");
    setNumberOfPositions("");
    setExperience("");
    setLocation("");
    setAboutPosition("");
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newData = {
        positionName,
        numberOfPositions,
        experience,
        location,
        aboutPosition,
      };

      await API.post("/vacancy/vacancyCreate", newData);
      toast.success("Vacancy created");
      clearInputs();
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
          Vacancy Add
          <Button
            variant="outlined"
            onClick={() => navigate("/dashboard/vacancy-list")}
          >
            Back to List
          </Button>
        </h2>
      </div>
      <div className="manage">
        <div className="add-product">
          <form onSubmit={handleAdd}>
            <div>
              <div className="form-row">
                <div className="inpt-row">
                  <label>Position Name</label>
                  <input
                    type="text"
                    value={positionName}
                    onChange={(e) => setPositionName(e.target.value)}
                    required
                  />
                </div>
                <div className="inpt-row">
                  <label>Number of Post</label>
                  <input
                    type="number"
                    value={numberOfPositions}
                    onChange={(e) => setNumberOfPositions(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="inpt-row">
                  <label>Experience</label>
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    required
                  />
                </div>
                <div className="inpt-row">
                  <label>Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="inpt-row">
                  <label>About Position</label>
                  <textarea
                    type="text"
                    value={aboutPosition}
                    onChange={(e) => setAboutPosition(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <Button type="submit" variant="contained" disableElevation>
              {loading ? (
                <BiLoader size={24} className="animate-spin" />
              ) : (
                "Add Press Release"
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
