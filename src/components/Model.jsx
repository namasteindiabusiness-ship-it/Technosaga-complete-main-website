import React, { useState, useRef, useEffect } from "react";
import { SERVICE_OPTS } from "../libs/static";
import API from "../libs/apiCall";
import { tokenExpired } from "../libs/library";
import { toast } from "sonner";
import { BiLoader } from "react-icons/bi";
import Loading from "./Loading";

export function EnquiryModal({ open, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [service, setService] = useState("");
  const [msg, setMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [isAlert, setIsAlert] = useState(false);
  const [msgType, setMsgType] = useState("");
  const [alertText, setAlertText] = useState("");

  const clearInput = () => {
    setName("");
    setEmail("");
    setMobile("");
    setService("");
    setMsg("");
  };

  const alertMsg = (msg, type) => {
    setAlertText(msg);
    setMsgType(type);
    setIsAlert(true);
    const timer = setTimeout(() => {
      setAlertText("");
      setMsgType("");
      setIsAlert(false);
    }, 2500);
    return () => clearTimeout(timer);
  };

  const handleEnquiry = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const mobileRegex = /^\d{10}$/;
      if (!mobileRegex.test(mobile)) {
        alertMsg(
          "Mobile number must be exactly 10 digits and contain only numbers.",
        );
        setMsgType("warn-msg");
        return;
      }

      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!emailRegex.test(email)) {
        alertMsg("Enter valid email Id.");
        setMsgType("warn-msg");
        return;
      }

      await API.post("/enquiry/create", {
        type: "Request a Quote",
        name,
        mobile,
        email,
        service,
        message: msg,
      });
      toast.success("Enquiry submitted");
      onClose();
      clearInput();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;
  return (
    <div
      className="modal-bg"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-card">
        <button className="modal-x" onClick={onClose}>
          ✕
        </button>
        <div className="modal-title">Get A Free Quote</div>
        <div className="modal-sub">
          Share a few details — we'll respond within 24 hours.
        </div>
        {isAlert && <p className={msgType}>{alertText}</p>}
        <form onSubmit={handleEnquiry}>
          <div className="f-group">
            <label className="f-label">Full Name</label>
            <input
              type="text"
              required
              className="f-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="f-group">
            <label className="f-label">Email</label>
            <input
              type="text"
              required
              className="f-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="f-group">
            <label className="f-label">Mobile Number</label>
            <input
              type="text"
              required
              className="f-input"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div className="f-group">
            <label className="f-label">Service</label>
            <select
              required
              className="f-input"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option value="">Select a service</option>
              {SERVICE_OPTS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="f-group">
            <label className="f-label">Message</label>
            <textarea
              rows={3}
              className="f-input"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary btn-primary--full">
            {isLoading ? (
              <BiLoader size={24} className="animate-spin" />
            ) : (
              "Submit Request →"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export function PopupModal({ setIsModal }) {
  const [popups, setPopups] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [checkModal, setCheckModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const STORAGE_KEY = "dailyPopupShown";

  const getPopups = async () => {
    setLoading(true);
    try {
      const { data: res } = await API.get("/popup/popupList");
      console.log(res.data);

      if (res?.data?.length) {
        setPopups(res.data);
        setCheckModal(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toDateString();

  useEffect(() => {
    const lastShown = localStorage.getItem(STORAGE_KEY);

    if (lastShown !== today) {
      getPopups();
      localStorage.setItem(STORAGE_KEY, today);
    }
  }, []);

  const popup = popups[currentIndex];

  if (loading) return null;

  return (
    <>
      {checkModal && popup != null && (
        <div className="modal-section">
          <div className="modal-content">
            <span className="modal-close" onClick={() => setIsModal(false)}>
              &times;
            </span>
            <div className="modal-body">
              {popup?.link ? (
                <Link to={popup?.link}>
                  <img src={popup?.photo} alt={popup?.title} />
                </Link>
              ) : (
                <img src={popup?.photo} alt={popup?.title} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function ChangePasswordModal({ setIsModal }) {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [isAlert, setIsAlert] = useState(false);
  const [msgType, setMsgType] = useState("");
  const [alertText, setAlertText] = useState("");

  const alertMsg = (msg, type) => {
    setAlertText(msg);
    setMsgType(type);
    setIsAlert(true);
    const timer = setTimeout(() => {
      setAlertText("");
      setMsgType("");
      setIsAlert(false);
    }, 2000);
    return () => clearTimeout(timer);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const updatePassword = {
        oldPassword: password,
        newPassword: newPassword,
      };
      await API.put("/account/change-password", updatePassword);
      setIsModal(false);
      toast.success("Password change successfully");
    } catch (error) {
      console.error(error);
      tokenExpired(error?.response?.data?.message);
      alertMsg(error?.response?.data?.message);
      setMsgType("warn-msg");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-section">
      <div className="modal-content">
        {isAlert && <p className={msgType}>{alertText}</p>}
        <div className="modal-headers">
          <h2>Change Password</h2>
          <span className="modal-close" onClick={() => setIsModal(false)}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <form onSubmit={handleChangePassword}>
            <div className="form-flex">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="q-input"
                  placeholder="Password"
                  required
                />
              </div>
            </div>
            <div className="form-flex">
              <div>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="q-input"
                  placeholder="New Password"
                  required
                />
              </div>
            </div>
            <button name="send" type="submit" className="google-btn">
              {isLoading ? (
                <BiLoader size={24} className="animate-spin" />
              ) : (
                "Chaage Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function UpdateMemberModal({ setIsEdit, selectedItem, getMembers }) {
  const [name, setName] = useState(selectedItem?.name);
  const [designation, setDesignation] = useState(selectedItem?.designation);
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);

  const inputFile = useRef(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("photo", file);
      formData.append("name", name);
      formData.append("designation", designation);

      await API.put(`/member/memberUpdates/${selectedItem?._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      getMembers();
      setIsEdit(false);
      toast.success("File uploaded");
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
    <div className="popup-overlay" onClick={() => setIsEdit(false)}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <span className="cancel-btn" onClick={() => setIsEdit(false)}>
          <IoCloseCircle size={28} />
        </span>
        <h2>Update member</h2>

        <div className="file-attach-box">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Designation</label>
          <input
            type="text"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            required
          />
          <label>Photo</label>
          <input
            type="file"
            ref={inputFile}
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        {file && <p className="file-name">{file.name}</p>}
        <button className="upload-btn" onClick={handleUpload}>
          {loading ? <BiLoader size={24} className="animate-spin" /> : "Upload"}
        </button>
      </div>
    </div>
  );
}

export function QuoteModal({ setIsQuote }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [msg, setMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [isAlert, setIsAlert] = useState(false);
  const [msgType, setMsgType] = useState("");
  const [alertText, setAlertText] = useState("");

  const clearInput = () => {
    setName("");
    setEmail("");
    setMobile("");
    setCity("");
    setCompanyName("");
    setCountry("");
    setMsg("");
  };

  const alertMsg = (msg, type) => {
    setAlertText(msg);
    setMsgType(type);
    setIsAlert(true);
    const timer = setTimeout(() => {
      setAlertText("");
      setMsgType("");
      setIsAlert(false);
    }, 2500);
    return () => clearTimeout(timer);
  };

  const handleEnquiry = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const mobileRegex = /^\d{10}$/;
      if (!mobileRegex.test(mobile)) {
        alertMsg(
          "Mobile number must be exactly 10 digits and contain only numbers.",
        );
        setMsgType("warn-msg");
        return;
      }

      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!emailRegex.test(email)) {
        alertMsg("Enter valid email Id.");
        setMsgType("warn-msg");
        return;
      }

      await API.post("/enquiry/create", {
        type: "Request a Quote",
        name,
        mobile: mobile,
        email,
        company: companyName,
        city,
        country,
        message: msg,
      });
      toast.success("Quote submitted");
      setIsQuote(false);
      clearInput();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-section">
      <div className="modal-content">
        {isAlert && <p className={msgType}>{alertText}</p>}
        <div className="modal-headers">
          <h4>Request a Quote</h4>
          <span className="modal-close" onClick={() => setIsQuote(false)}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <form onSubmit={handleEnquiry}>
            <div className="form-flex">
              <div>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="q-input"
                  placeholder="Name"
                  required
                />
              </div>
              <div>
                <input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  name="mobile"
                  type="text"
                  className="q-input"
                  placeholder="Number"
                  required
                />
              </div>
            </div>
            <div className="form-flex">
              <div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  className="q-input"
                  placeholder="Email"
                  required
                />
              </div>
              <div>
                <input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  type="text"
                  className="q-input"
                  placeholder="Company name"
                />
              </div>
            </div>
            <div className="form-flex">
              <div>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  className="q-input"
                  placeholder="City"
                  required
                />
              </div>
              <div>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">Select Country</option>
                  {countryList.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-flex">
              <div>
                <textarea
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  type="text"
                  className="q-input"
                  placeholder="Enter message"
                  required
                />
              </div>
            </div>
            <div className="modal-buttons">
              <button name="send" type="submit" className="modal-btn">
                {isLoading ? (
                  <BiLoader size={24} className="animate-spin" />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export function ApplyVacancyModal({ setIsApplyOpen, applyId }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [file, setFile] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const inputFile = useRef(null);

  const [isAlert, setIsAlert] = useState(false);
  const [msgType, setMsgType] = useState("");
  const [alertText, setAlertText] = useState("");

  const clearInput = () => {
    setName("");
    setEmail("");
    setMobile("");
    inputFile.current.value = "";
  };

  const alertMsg = (msg, type) => {
    setAlertText(msg);
    setMsgType(type);
    setIsAlert(true);
    const timer = setTimeout(() => {
      setAlertText("");
      setMsgType("");
      setIsAlert(false);
    }, 2500);
    return () => clearTimeout(timer);
  };

  const handleEnquiry = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const mobileRegex = /^\d{10}$/;
      if (!mobileRegex.test(mobile)) {
        alertMsg(
          "Mobile number must be exactly 10 digits and contain only numbers.",
        );
        setMsgType("warn-msg");
        return;
      }

      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!emailRegex.test(email)) {
        alertMsg("Enter valid email Id.");
        setMsgType("warn-msg");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", mobile);
      formData.append("vacancyId", applyId?._id);
      formData.append("vacancyTitle", applyId?.positionName);

      await API.post("/career/createVacancyApply", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Your job application submitted successfully");
      setIsApplyOpen(false);
      clearInput();
    } catch (error) {
      console.error(error);
      alertMsg(error?.response?.data?.message);
      setMsgType("warn-msg");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-section">
      <div className="modal-content">
        {isAlert && <p className={msgType}>{alertText}</p>}
        <div className="modal-headers">
          <h4>Apply to {applyId.positionName}</h4>
          <span className="modal-close" onClick={() => setIsApplyOpen(false)}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <form onSubmit={handleEnquiry}>
            <div className="form-flex">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="q-input"
                placeholder="Name"
                required
              />
            </div>
            <div className="form-flex">
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                name="mobile"
                type="text"
                className="q-input"
                placeholder="Number"
                required
              />
            </div>
            <div className="form-flex">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="q-input"
                placeholder="Email"
                required
              />
            </div>
            <p className="alert-text">
              Attach Resume <span>(PDF file only and less than 5MB)</span>
            </p>
            <div className="form-flex">
              <input
                type="file"
                ref={inputFile}
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </div>
            <div className="modal-buttons">
              <button name="send" type="submit" className="modal-btn">
                {isLoading ? (
                  <BiLoader size={24} className="animate-spin" />
                ) : (
                  "Apply"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export function ApplicantsModal({ selectedJob, setIsApplicantData }) {
  const [applicantData, setApplicantData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getApplicantByVacnacyId = async () => {
    try {
      const { data: res } = await API.get(
        `/career/getApplyListByVacancyId/${selectedJob?._id}`,
      );
      setApplicantData(res.data ? res.data.reverse() : []);
    } catch (error) {
      console.error(error?.response?.data?.message);
      setApplicantData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getApplicantByVacnacyId();
  }, [selectedJob?._id]);

  return (
    <div className="modal-section">
      <div className="modal-content">
        <div className="modal-headers">
          <h2>Applicant List — {selectedJob.positionName}</h2>
          <span
            className="modal-close"
            onClick={() => setIsApplicantData(false)}
          >
            &times;
          </span>
        </div>
        <div className="modal-body">
          {isLoading ? (
            <div style={{ textAlign: "center", padding: "2rem", color: "#888" }}>
              Loading applicants...
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Resume</th>
                </tr>
              </thead>
              <tbody>
                {applicantData.length > 0 ? (
                  applicantData.map((item, i) => (
                    <tr key={item._id}>
                      <td>{i + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>
                        {item.resumePath ? (
                          <a
                            href={item.resumePath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="down-btn"
                          >
                            Download Resume
                          </a>
                        ) : (
                          <span style={{ color: "#888", fontSize: "0.8rem" }}>No resume</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", padding: "2rem", color: "#888" }}>
                      No applicants found for this position.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
