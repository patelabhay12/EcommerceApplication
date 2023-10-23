import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout';
import './register.css';
import { toast } from 'react-hot-toast';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [question, setQuestion] = useState("");
    // const { auth, setAuth } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/forgot-password", {
                email,
                newpassword,
                question

            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            } else {
                toast.error(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }
    return (
        <Layout title={'Forgot Password - Ecommerce App'}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h1 className='title'>Reset Password</h1>
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
                            value={question}
                            type="text" className="form-control" id="exampleInputquestion"
                            placeholder='What is you like most'
                            onChange={(e) => { setQuestion(e.target.value) }}
                            required
                        />
                   </div>
                    <div className="mb-3">

                        <input
                            value={newpassword}
                            type="password" className="form-control" id="exampleInputPassword1"
                            placeholder='Enter Your New Password'
                            onChange={(e) => { setNewPassword(e.target.value) }}
                            required
                        />
                    </div>
                    <div className="mb-3" style={{ display: "flex", flexDirection: 'column', gap: "1rem" ,marginLeft:"5px"}}>
                        <button type='submit' className="btn btn-primary" >Reset</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword; 