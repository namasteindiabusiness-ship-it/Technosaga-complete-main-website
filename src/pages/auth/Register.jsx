import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import logo from '../../assets/logo.png';

import { toast, Toaster } from "sonner";
import { BiLoader } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import API from "../../libs/apiCall";
import { useGoogleLogin } from "@react-oauth/google";

export default function Register() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const responseGoolge = async (authResult) => {
    try {
      if (authResult["code"]) {
        const code = authResult["code"];
        const data = await API.post("/account/createAccountByGoogle", { code });

        if (data?.status === "error") {
          toast.error("User already added");
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }
        toast.success("Account created");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.status === "error") {
        toast.error("User already added");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoolge,
    onError: responseGoolge,
    flow: "auth-code",
  });

  return (
    <div className="login-page">
      <Toaster richColors position="top-center" />
      <div className="login-section">
        <div className="login-form">
          <button onClick={googleLogin} className="google-btn" type="submit">
            <FcGoogle style={{ width: "30px" }} />
            SignUp with Google
          </button>
          <p>
            <Link to="/login" className="btn-credential">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
