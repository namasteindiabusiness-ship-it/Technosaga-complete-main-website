import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png';
import Button from '@mui/material/Button';
import api from "../../controller/api"
import { toast, Toaster } from 'sonner';
import { BiLoader } from "react-icons/bi"

export default function ForgotPassword() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [user, setUser] = useState("")
    const [isUser, setIsUser] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const checkUser = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { data } = await api.post("/user/username", { username })
            if (data?.status) {
                setUser(data.data)
                setIsUser(true)
                setUsername("")
            }
        } catch (error) {
            console.error(error)
            toast.error(error?.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    const forgotPassword = async (e) => {
        e.preventDefault()
        setLoading(true)

        const item = {
            username: user,
            password: password,
            newPassword: confirmPassword
        }

        try {
            const { data } = await api.post("/user/forgotPassword", item)

            if (data?.status === "success") {
                toast.success("Forgot password successfully")
                setIsUser(false)
                setTimeout(() => {
                    navigate("/login")
                }, 1500)
            }

        } catch (error) {
            console.error(error)
            toast.error(error?.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='login-page'>
            <Toaster richColors position="top-center" />
            <div className="login-form">
                <Link to="/"><img src={logo} alt="Home Salon logo" className="login-logo" /></Link>
                <h2> Forgot Password</h2>
                <form onSubmit={isUser ? forgotPassword : checkUser}>
                    {isUser ? <>
                        <div className="input-box">
                            <label className="col-md-2 col-form-label">New Password</label>
                            <input className="form-control" type='text' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="input-box">
                            <label className="col-md-2 col-form-label">Confirm Password</label>
                            <input className="form-control" type='text' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        </div>
                    </> : <div className="input-box">
                        <label className="col-md-2 col-form-label">Username</label>
                        <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" type="text" />
                    </div>}

                    <div className="input-box">
                        <button className='login-btn'>{loading ? <BiLoader size={24} className='animate-spin' /> : "Login"}</button>
                    </div>
                </form>
                <p><Link to="/login" className='btn-credential'>Login here</Link></p>
            </div>
        </div>
        // <div className='manage'>
        //     <h2 style={{ display: "flex", justifyContent: "space-between" }}>
        //         Forgot Password
        //     </h2>
        //     <form className='add-product' onSubmit={isUser ? forgotPassword : checkUser}>
        //         <Toaster richColors position="top-center" />
        //         {isUser ? <div className='form-row'>
        //             <div className='inpt-row'>
        //                 <label>New Password</label>
        //                 <input type='text' value={password} onChange={(e) => setPassword(e.target.value)} required />
        //             </div>
        //             <div className='inpt-row'>
        //                 <label>Confirm Password</label>
        //                 <input type='text' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        //             </div>
        //         </div> : <div className='form-row'>
        //             <div className='inpt-row'>
        //                 <label>Username</label>
        //                 <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} required />
        //             </div>
        //         </div>}
        //         <Button type='submit' variant="contained" disableElevation>
        //             {loading ? <BiLoader size={24} className='animate-spin' /> : "Forgot Password"}
        //         </Button>
        //     </form>
        // </div>
    )
}
