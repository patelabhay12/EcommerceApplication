import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [relatedProduct, setRelatedProduct] = useState([]);
    // initial p details
    useEffect(() => {
        if (params.slug) getProduct();
    }, [params.slug]);
    // getProduct
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);
            getRelatedProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };

    // related product

    const getRelatedProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProduct(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className="row container mt-2">
                <div className="col-md-6">
                    <img
                        src={`/api/v1/product/product-photo/${product._id}
                    `}
                        alt="product Image hai"
                        className='card-img-top'
                        height={"300"}
                        width={"350px"}
                    />
                </div>
                <div className="col-md-6 ">
                    <h1 className='text-center'>Product Details</h1>
                    <h6>Name : {product.name}</h6>
                    <h6>Description : {product.description}</h6>
                    <h6>Price : {product.price}</h6>
                    <h6>Category : {product?.category?.name}</h6>
                    <button className='btn btn-secondary ms-1'>ADD TO CART</button>
                </div>

            </div>
            <hr />
            <div className="row conatiner">
                {/* {JSON.stringify(relatedProduct, null, 4)} */}
                <h6>Similar Products</h6>
                {relatedProduct.length < 1 && <p className='text-center'>No similar Products found</p>}
                <div className="d-flex flex-wrap">
                    {
                        relatedProduct?.map((prop) => {
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
        </Layout>
    )
}

export default ProductDetails;