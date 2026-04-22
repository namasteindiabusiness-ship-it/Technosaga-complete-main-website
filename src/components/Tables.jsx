import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { itemPatha } from "../libs/apiCall";
import { FaEye } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";
import { dateStringConvert } from "../libs/library";
import { MdOutlineFileUpload } from "react-icons/md";
// import { SurveyDetailsModal, TourDetailsModal, UploadFileModal } from "./Model";
import { GrFormView } from "react-icons/gr";
import { ApplicantsModal } from "./Model";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export function UserDataTable({ userData }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Username</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
          </TableRow>
        </TableHead>
        {userData.length > 0 ? (
          <TableBody>
            {userData.map((item, i) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell>{i + 1}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item?.username}
                </StyledTableCell>
                <StyledTableCell>
                  <span className="alert-1">
                    {item?.isActive ? "Active" : "Inactive"}
                  </span>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            <StyledTableCell colSpan={5}>No record found</StyledTableCell>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}

export function PressDataTable({ deletePress, pressData }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Source</StyledTableCell>
            <StyledTableCell>Link</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        {pressData.length > 0 ? (
          <TableBody>
            {pressData.map((item, i) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell>{i + 1}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item?.title}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item?.source}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item?.link}
                </StyledTableCell>
                <StyledTableCell>
                  <div>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deletePress(item._id)}
                    >
                      <FaTrashAlt />
                    </Button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            <StyledTableCell colSpan={5}>No record found</StyledTableCell>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}

export function PopupDataTable({ updatePopupStatus, deletePopup, popupData }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Photo</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        {popupData.length > 0 ? (
          <TableBody>
            {popupData.map((item, i) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell>{i + 1}</StyledTableCell>
                <StyledTableCell>
                  <img
                    src={item.photo}
                    alt={item.title}
                    className="cart-image"
                  />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item.title}
                </StyledTableCell>
                <StyledTableCell>
                  <label className="switch">
                    <input
                      checked={item.status && "checked"}
                      type="checkbox"
                      value={item.status}
                      onChange={() => updatePopupStatus(item._id)}
                    />
                    <span className="slider round"></span>
                  </label>
                </StyledTableCell>
                <StyledTableCell>
                  <div>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deletePopup(item._id)}
                    >
                      <FaTrashAlt />
                    </Button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            <StyledTableCell colSpan={5}>No record found</StyledTableCell>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}

export function BlogDataTable({ blogData, deleteBlog, updateBlogStatus }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Poster</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell>IsLanding</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        {blogData.length > 0 ? (
          <TableBody>
            {blogData.map((item, i) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell>{i + 1}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item?.file != null && (
                    <img
                      src={`${itemPatha}${item?.file}`}
                      alt="item?.title"
                      className="cart-image"
                    />
                  )}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item.title}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item.category}
                </StyledTableCell>
                <StyledTableCell>
                  <label className="switch">
                    <input
                      checked={item.status && "checked"}
                      type="checkbox"
                      value={item.status}
                      onChange={() => updateBlogStatus(item._id)}
                    />
                    <span className="slider round"></span>
                  </label>
                </StyledTableCell>
                <StyledTableCell>
                  <div>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteBlog(item._id)}
                    >
                      <FaTrashAlt />
                    </Button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            <StyledTableCell colSpan={6}>No record found</StyledTableCell>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}

export function BannerDataTable({
  updateBannerStatus,
  deleteBanner,
  bannerData,
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Photo</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        {bannerData.length > 0 ? (
          <TableBody>
            {bannerData.map((item, i) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell>{i + 1}</StyledTableCell>
                <StyledTableCell>
                  <img
                    src={item.photo}
                    alt={item.title}
                    className="cart-image"
                  />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item.title}
                </StyledTableCell>
                <StyledTableCell>
                  <label className="switch">
                    <input
                      checked={item.status && "checked"}
                      type="checkbox"
                      value={item.status}
                      onChange={() => updateBannerStatus(item._id)}
                    />
                    <span className="slider round"></span>
                  </label>
                </StyledTableCell>
                <StyledTableCell>
                  <div>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteBanner(item._id)}
                    >
                      <FaTrashAlt />
                    </Button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            <StyledTableCell colSpan={5}>No record found</StyledTableCell>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}

export function GalleryDataTable({ deleteGallery, galleryData }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Photo</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        {galleryData.length > 0 ? (
          <TableBody>
            {galleryData.map((item, i) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell>{i + 1}</StyledTableCell>
                <StyledTableCell>
                  <img
                    src={item.photo}
                    alt={item.title}
                    className="cart-image"
                  />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item.title}
                </StyledTableCell>
                <StyledTableCell>
                  <div>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteGallery(item._id)}
                    >
                      <FaTrashAlt />
                    </Button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            <StyledTableCell colSpan={5}>No record found</StyledTableCell>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}

export function VideoDataTable({ updatVideoStatus, deleteVideo, videoData }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Path</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        {videoData.length > 0 ? (
          <TableBody>
            {videoData.map((item, i) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell>{i + 1}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item.title}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item.path}
                </StyledTableCell>
                <StyledTableCell>
                  <label className="switch">
                    <input
                      checked={item.status && "checked"}
                      type="checkbox"
                      value={item.status}
                      onChange={() => updatVideoStatus(item._id)}
                    />
                    <span className="slider round"></span>
                  </label>
                </StyledTableCell>
                <StyledTableCell>
                  <div>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteVideo(item._id)}
                    >
                      <FaTrashAlt />
                    </Button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            <StyledTableCell colSpan={5}>No record found</StyledTableCell>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}

export function MemberDataTable({
  updateMemberStatus,
  deleteMember,
  memberData,
  getMembers,
}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleClickEdit = (item) => {
    setSelectedItem(item);
    setIsEdit(true);
  };

  return (
    <>
      {isEdit && (
        <UpdateMemberModal
          setIsEdit={setIsEdit}
          selectedItem={selectedItem}
          getMembers={getMembers}
        />
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Photo</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Designation</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          {memberData.length > 0 ? (
            <TableBody>
              {memberData.map((item, i) => (
                <StyledTableRow key={item._id}>
                  <StyledTableCell>{i + 1}</StyledTableCell>
                  <StyledTableCell>
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="cart-image"
                    />
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {item.name}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {item.designation}
                  </StyledTableCell>
                  <StyledTableCell>
                    <label className="switch">
                      <input
                        checked={item.status && "checked"}
                        type="checkbox"
                        value={item.status}
                        onChange={() => updateMemberStatus(item._id)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </StyledTableCell>
                  <StyledTableCell>
                    <div className="btn-flex">
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleClickEdit(item)}
                      >
                        <FaPen />
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteMember(item._id)}
                      >
                        <FaTrashAlt />
                      </Button>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <StyledTableCell colSpan={5}>No record found</StyledTableCell>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
}

export function VacancyDataTable({
  updateVacancyStatus,
  deleteVacancy,
  vacancyData,
}) {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplicantData, setIsApplicantData] = useState(false);

  const handleApply = (item) => {
    setSelectedJob(item);
    setIsApplicantData(true);
  };

  return (
    <>
      {isApplicantData && (
        <ApplicantsModal
          selectedJob={selectedJob}
          setIsApplicantData={setIsApplicantData}
        />
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Position</StyledTableCell>
              <StyledTableCell>Total Position</StyledTableCell>
              <StyledTableCell>Experience</StyledTableCell>
              <StyledTableCell>Location</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          {vacancyData.length > 0 ? (
            <TableBody>
              {vacancyData.map((item, i) => (
                <StyledTableRow key={item._id}>
                  <StyledTableCell>{i + 1}</StyledTableCell>
                  <StyledTableCell>{item.positionName}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {item.numberOfPositions}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {item.experience} years
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {item.location}
                  </StyledTableCell>
                  <StyledTableCell>
                    <label className="switch">
                      <input
                        checked={item.status && "checked"}
                        type="checkbox"
                        value={item.status}
                        onChange={() => updateVacancyStatus(item._id)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </StyledTableCell>
                  <StyledTableCell>
                    <div className="btn-flex">
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleApply(item)}
                      >
                        View Applicants
                      </Button>
                      {/* <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteVacancy(item._id)}
                      >
                        <FaTrashAlt />
                      </Button> */}
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <StyledTableCell colSpan={5}>No record found</StyledTableCell>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
}

export function PostDataTable({ postData, deletePost, updatePostStatus }) {
  const navigate = useNavigate();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Poster</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        {postData.length > 0 ? (
          <TableBody>
            {postData.map((item, i) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell>{i + 1}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item?.file != null && (
                    <img
                      src={`${itemPatha}${item?.file}`}
                      alt="item?.title"
                      className="cart-image"
                    />
                  )}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item.title}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item.categoryName}
                </StyledTableCell>
                <StyledTableCell>
                  <label className="switch">
                    <input
                      checked={item.status && "checked"}
                      type="checkbox"
                      value={item.status}
                      onChange={() => updatePostStatus(item._id)}
                    />
                    <span className="slider round"></span>
                  </label>
                </StyledTableCell>
                <StyledTableCell>
                  <div className="btn-flex">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() =>
                        navigate(`/dashboard/update-blog/${item._id}`)
                      }
                    >
                      <FaPen />
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deletePost(item._id)}
                    >
                      <FaTrashAlt />
                    </Button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            <StyledTableCell colSpan={5}>No record found</StyledTableCell>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}

export function NewsDataTable({ newsData, deleteNews, updateNewsStatus }) {
  const navigate = useNavigate();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Poster</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        {newsData.length > 0 ? (
          <TableBody>
            {newsData.map((item, i) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell>{i + 1}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item?.file != null && (
                    <img
                      src={`${itemPatha}${item?.file}`}
                      alt="item?.title"
                      className="cart-image"
                    />
                  )}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item.title}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item.categoryName}
                </StyledTableCell>
                <StyledTableCell>
                  <label className="switch">
                    <input
                      checked={item.status && "checked"}
                      type="checkbox"
                      value={item.status}
                      onChange={() => updateNewsStatus(item._id)}
                    />
                    <span className="slider round"></span>
                  </label>
                </StyledTableCell>
                <StyledTableCell>
                  <div className="btn-flex">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() =>
                        navigate(`/dashboard/update-news/${item._id}`)
                      }
                    >
                      <FaPen />
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteNews(item._id)}
                    >
                      <FaTrashAlt />
                    </Button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            <StyledTableCell colSpan={5}>No record found</StyledTableCell>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
