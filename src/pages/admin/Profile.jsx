import React, { useState, useEffect } from "react";
import icons from "../../assets/images/user-icon.png";
import { LuPencil } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { tokenExpired } from "../../libs/library";
import Loading from "../../components/Loading";
import API from "../../libs/apiCall";
import { UpdateProfileModal } from "../../components/Model";

export default function Profile() {
  const [isModal, setIsModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [pageLoading, setPageLoading] = useState(false);

  const { userId } = useParams();

  const fetchUserData = async () => {
    try {
      const { data: res } = await API.get(`/account/userDetails/${userId}`);
      setUserData(res.data);
    } catch (error) {
      console.error(error?.response?.data?.message);
      tokenExpired(error?.response?.data?.message);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    setPageLoading(true);
    fetchUserData();
  }, [userId]);

  if (pageLoading) return <Loading />;

  return (
    <>
      {isModal && (
        <UpdateProfileModal
          setIsModal={setIsModal}
          userData={userData}
          fetchUserData={fetchUserData}
        />
      )}
      <h2 className="set-title">Profile</h2>
      <div className="users-profile">
        <div className="pro-boxed">
          <div className="user-datas">
            {userData?.file ? (
              <img
                src={userData?.file}
                alt="profile icon"
                className="users-icons"
              />
            ) : (
              <img src={icons} alt="profile icon" className="users-icons" />
            )}
          </div>
          <div>
            <p>
              Name: <span>{userData?.name}</span>
            </p>
            <p>
              Username: <span>{userData?.username}</span>
            </p>
            <p>
              Account:{" "}
              <span className="paid-box">
                {userData.isActive ? "Active" : "InActive"}
              </span>
            </p>
          </div>
        </div>
        <div className="pro-boxed">
          <button className="profile-edit-btn" onClick={() => setIsModal(true)}>
            <LuPencil size={20} />
            Update Profile
          </button>
        </div>
      </div>
    </>
  );
}
