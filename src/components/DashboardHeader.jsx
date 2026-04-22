import React, { useState } from "react";
import Button from "@mui/material/Button";
import Logout from "./Logout";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import { IoClose } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { ChangePasswordModal } from "./Model";
import createStore from "../store/state";

export default function DashboardHeader({ navActive, setNavActive }) {
  const { user } = createStore((state) => state);

  const [isActive, setIsActive] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <Toaster richColors position="top-center" />
      {isModal && <ChangePasswordModal setIsModal={setIsModal} />}
      {isActive && (
        <div
          onClick={() => setIsActive((action) => !action)}
          className="trans-bg"
        ></div>
      )}
      <div className="admin-header">
        <div className="nav-control">
          {navActive ? (
            <IoMenu size={32} onClick={() => setNavActive((item) => !item)} />
          ) : (
            <IoClose size={32} onClick={() => setNavActive((item) => !item)} />
          )}
          <Link to="/home">
            <img src="/static/logo.png" alt="Technosaga Infotech" />
          </Link>
        </div>
        <div className="header-right">
          {user ? (
            <Logout setIsModal={setIsModal} />
          ) : (
            <Button
              onClick={() => navigate("/login")}
              variant="contained"
              size="small"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
