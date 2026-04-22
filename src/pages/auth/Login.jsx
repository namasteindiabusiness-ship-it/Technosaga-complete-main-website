import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { BiLoader } from "react-icons/bi";
import API from "../../libs/apiCall";
import createStore from "../../store/state";

const styles = `
.login-logo {
width: 120px;
height: auto;
margin-bottom: 1.5rem;
}
  .login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f3f4f6;
    font-family: sans-serif;
  }

  .login-form {
    background: #ffffff;
    border-radius: 12px;
    padding: 2.5rem 2rem;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
    border: 1px solid #e5e7eb;
  }

  .login-logo {
    display: block;
    margin: 0 auto 1.25rem;
    height: 48px;
    width: auto;
    object-fit: contain;
  }

  .login-form h2 {
    font-size: 1.6rem;
    font-weight: 600;
    color: #111827;
    margin: 0 0 1.75rem;
    text-align: center;
  }

  .input-box {
    margin-bottom: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .input-box label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
  }

  .input-box .form-control {
    padding: 0.6rem 0.85rem;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 0.95rem;
    color: #111827;
    background: #ffffff;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%;
    box-sizing: border-box;
  }

  .input-box .form-control:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }

  .input-box .form-control::placeholder {
    color: #9ca3af;
  }

  .login-btn {
    width: 100%;
    padding: 0.65rem;
    background-color: #6366f1;
    color: #ffffff;
    font-size: 0.95rem;
    font-weight: 500;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background-color 0.2s, transform 0.1s;
    margin-top: 0.5rem;
  }

  .login-btn:hover {
    background-color: #4f46e5;
  }

  .login-btn:active {
    transform: scale(0.98);
  }

  .login-btn:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .animate-spin {
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user, setCredentials } = createStore((state) => state);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(email)) {
      toast.error("Enter valid email Id.");
      setLoading(false);
      return;
    }
    try {
      const { data: res } = await API.post("/account/login", {
        email,
        password,
      });

      if (res?.data) {
        const userInfo = { ...res?.data, token: res?.token };
        localStorage.setItem("user", JSON.stringify(userInfo));
        setCredentials({ ...res?.data, token: res?.token });
        toast.success("Logged In successfully");
        navigate("/dashboard/home");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  if (user) return <Navigate to="/dashboard/home" />;

  return (
    <>
      <style>{styles}</style>
      <div className="login-page">
        <Toaster richColors position="top-center" />

        <div className="login-form">
          <Link to="/">
            <img
              src="/static/logo.png"
              alt="HCISS logo"
              className="login-logo"
            />
          </Link>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-box">
              <label>Enter OTP</label>
              <input
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                type="text"
                required
              />
            </div>
            <div className="input-box">
              <label>Mobile number</label>
              <input
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                type="password"
                required
              />
            </div>
            <div className="input-box">
              <button className="login-btn" disabled={loading}>
                {loading ? (
                  <BiLoader size={20} className="animate-spin" />
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
