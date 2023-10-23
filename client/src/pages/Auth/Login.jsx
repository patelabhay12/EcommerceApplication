import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout';
import './register.css';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../content/auth';


const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { auth, setAuth } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/login", {
                email,
                password,

            });
            if (res.data.success) {
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                toast.success(res.data.message);
                navigate(location.state || '/');
            } else {
                toast.error(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }
    return (
        <Layout>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h1 className='title'>login form</h1>
                    <div className="mb-3">
                        <input
                            value={email}
                            type="email" className="form-control" id="exampleInputEmail1"
                            placeholder='Enter Your Email'
                            onChange={(e) => { setEmail(e.target.value) }}
                            required
                        />
                    </div>
                    <div className="mb-3">

                        <input
                            value={password}
                            type="password" className="form-control" id="exampleInputPassword1"
                            placeholder='Enter Your Password'
                            onChange={(e) => { setPassword(e.target.value) }}
                            required
                        />
                    </div>
                    <div className="mb-3 " style={{ display: "flex", flexDirection: 'column', gap: "1rem" }}>
                        <button type='button' className="btn btn-primary" onClick={() => { navigate('/forgot-password') }}>Forgot Password</button>

                        <button type='submit' className="btn btn-primary" >LOGIN</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
} 

export default Login;