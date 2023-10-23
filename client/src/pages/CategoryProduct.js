import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);


    useEffect(() => {
        if (params?.slug) getProduct();
        console.log(product);
    }, [params.slug]);

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`);
            setProduct(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className="containermt-5 ">
                <h1 className='text-center'>{category.name}</h1>
                <h1 className='text-center'>{product.length} result found</h1>
            </div>

            <div className="row">
                <div className="col-md-9 offset-1">
                    <div className="d-flex flex-wrap">
                        {
                            product?.map((prop) => {
                                return (
                                    <div className="card m-2" style={{ width: '18rem' }} >
                                        <img src={`/api/v1/product/product-photo/${prop._id}`} className="card-img-top" alt={prop.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{prop.name}</h5>
                                            <p className="card-text">{prop.description.substring(0, 30)}</p>
                                            <p className="card-text">$ {prop.price}</p>
                                            <button
                                                className="btn btn-primary ms-1"
                                                onClick={(e) => { navigate(`/product/${prop.slug}`) }}
                                            >
                                                More Details
                                            </button>
                                            <button className="btn btn-secondary ms-1">ADD TO CART</button>
                                        </div>

                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CategoryProduct;