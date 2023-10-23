import React, { useState } from 'react';
import './register.css';
import Layout from '../../components/Layout/Layout';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [question, setQuestion] = useState("");


    const toastOption = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        theme: 'dark'
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/register", {
                name,
                email,
                password,
                phone,
                question,
                address
            });
            if (res && res.data.success) {
                toast.success(res.data.message, toastOption);
                navigate('/login');
            } else {
                toast.error(res.data.message, toastOption);
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong", toastOption);
        }
    }
    return (
        <Layout title="Register your-self">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h1 className='title'>Register form</h1>
                    <div className="mb-3">
                        <input
                            value={name}
                            type="text"
                            className="form-control" id="exampleInputEmail1"
                            placeholder='Enter Your Name'
                            onChange={(e) => { setName(e.target.value) }}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            value={email}
                            type="email" className="form-control" id="exampleInputEmail1"
                            placeholder='Enter Your Email '
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
                    <div className="mb-3">
                        <input
                            value={phone}
                            type="text" className="form-control"
                            placeholder='Enter Your Phone'
                            id="exampleInputPassword1"
                            onChange={(e) => { setPhone(e.target.value) }}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            value={address}
                            type="text" className="form-control"
                            placeholder='Enter Your Address'
                            id="exampleInputPassword1"
                            onChange={(e) => { setAddress(e.target.value) }}
                            required

                        />
                    </div>
                    <div className="mb-3">
                        <input
                            value={question}
                            type="text" className="form-control"
                            placeholder='What is you like most'
                            id="exampleInputPassword1"
                            onChange={(e) => { setQuestion(e.target.value) }}
                            required

                        />
                    </div>
                    <button type="submit" className="btn btn-primary" >REGISTER</button>
                </form>
            </div>
        </Layout>
    )
}

export default Register;