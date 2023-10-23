import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../content/auth';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { set } from 'mongoose';
const Profile = () => {
    // context
    const { auth, setAuth } = useAuth();

    //state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    // get user data 
    useEffect(() => {
        const { name, email, phone, address } = auth.user;
        setName(name);
        setEmail(email);
        setAddress(address);
        setPassword(password);
        setPhone(phone);
    }, []);

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put("/api/v1/auth/profile", {
                name,
                email,
                password,
                phone,
                address
            });
            if (data?.error) {
                toast.error(data.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem('auth');
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem('auth', JSON.stringify(ls));
                toast.success("Profile Updated Successfully...");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }
    return (
        <Layout title={"Your Profile..."}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>
                            <div className="form-container">
                                <form onSubmit={handleSubmit}>
                                    <h1 className='title'>USER PROFILE</h1>
                                    <div className="mb-3">
                                        <input
                                            value={name}
                                            type="text"
                                            className="form-control" id="exampleInputEmail1"
                                            placeholder='Enter Your Name'
                                            onChange={(e) => { setName(e.target.value) }}
                                            
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            value={email}
                                            type="email" className="form-control" id="exampleInputEmail1"
                                            placeholder='Enter Your Email '
                                            onChange={(e) => { setEmail(e.target.value) }}
                                            
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-3">

                                        <input
                                            value={password}
                                            type="password" className="form-control" id="exampleInputPassword1"
                                            placeholder='Enter Your Password'
                                            onChange={(e) => { setPassword(e.target.value) }}

                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            value={phone}
                                            type="text" className="form-control"
                                            placeholder='Enter Your Phone'
                                            id="exampleInputPassword1"
                                            onChange={(e) => { setPhone(e.target.value) }}
                                           
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            value={address}
                                            type="text" className="form-control"
                                            placeholder='Enter Your Address'
                                            id="exampleInputPassword1"
                                            onChange={(e) => { setAddress(e.target.value) }}
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary" >UPDATE</button>
                                </form>
                            </div>
                        </h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile;