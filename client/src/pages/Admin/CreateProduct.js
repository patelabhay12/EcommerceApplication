import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
const { Option } = Select;

const CreateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shiping, setShiping] = useState("");

    const navigate = useNavigate();

    // Get_All_Category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting category ...")
        }
    };

    useEffect(() => {
        getAllCategory();
        console.log(categories);
    }, []);


    // create product function
    const hanldeCreate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append('name', name);
            productData.append('description', description);
            productData.append('price', price);
            productData.append('quantity', quantity);
            productData.append('photo', photo);
            productData.append('category', category);
            const { data } = axios.post("/api/v1/product/create-product", productData);
            if (data?.success) {
                toast.error(data?.message);
            } else {
                toast.success("Product created Successfully ....");
                navigate("/dashboard/admin/products")
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Something went wrong ....");
        }
    }
    return (
        <Layout title={'Dashboard - Create-Product'}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Create Product</h1>
                        <div className="m-1 w-75">
                            <Select
                                bordered={false}
                                placeholder="select a category"
                                size="large"
                                showSearch
                                className='form-select mb-3'
                                onChange={(value) => { setCategory(value) }}
                            >
                                {
                                    categories?.map((c) => {
                                        return (
                                            <Option key={c._id} value={c._id}>
                                                {c.name}
                                            </Option>
                                        )
                                    })
                                }
                            </Select>

                            <div className="mb-3">
                                <label className='btn  btn-outline-secondary col-md-12'>
                                    {photo ? photo.name : "Upload Photo"}
                                    <input type="file"
                                        name='photo' accept='image/*'
                                        onChange={(e) => { setPhoto(e.target.files[0]) }}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                {
                                    photo && (
                                        <div className="text-center">
                                            <img src={URL.createObjectURL(photo)} alt="nhi aa rha hai photo" height={'200px'} className='img img-responsive' />
                                        </div>
                                    )
                                }
                            </div>

                            <div className="mb-3">
                                <input type="text"
                                    value={name}
                                    placeholder='write a name'
                                    className='form-control'
                                    onChange={(e) => { setName(e.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea type="text"
                                    value={description}
                                    placeholder='write a description'
                                    className='form-control'
                                    onChange={(e) => { setDescription(e.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="text"
                                    value={price}
                                    placeholder='write a Price'
                                    className='form-control'
                                    onChange={(e) => { setPrice(e.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="text"
                                    value={quantity}
                                    placeholder='write a qauntity'
                                    className='form-control'
                                    onChange={(e) => { setQuantity(e.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <Select
                                    placeholder="Select Shiping"
                                    size="large"
                                    bordered={false}
                                    className="form-select mb-3"
                                    onChange={(value) => { setShiping(value) }}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className='btn btn-primary' onClick={hanldeCreate}>CREATE PRODUCT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct;