import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useCart } from '../content/Cart';
import { toast } from 'react-hot-toast';

// import Spinner from '../components/Routes/Spinner.js';
const HomePage = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();

  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  // get Total Count
  const getTotal = async (req, res) => {
    try {
      const { data } = await axios.get('api/v1/product/product-count');
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // get All category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category');
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  }
  // Get All Products
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, [])

  //get products
  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProduct(data?.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    if (page === 1) return;
    loadmore();
  }, [page]);


  //load more 
  const loadmore = async (req, res) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProduct([...product, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter(c => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProduct();
  }, [checked.length, radio.length])

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio])

  // get Filterd Product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`/api/v1/product/product-filter`, { checked, radio });
      setProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Products - Best offers"}>
      <div className="row mt-3">
        <div className="col-md-3 ">
          <div className="text-center">
            <h4>Filter By Category</h4>
            <div className="d-flex flex-column" >
              {
                category?.map((c) => {
                  return (
                    <>
                      <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                        {c.name}
                      </Checkbox>
                    </>
                  )
                })
              }
            </div>
            <h4 className='text-center mt-4'>
              Filter By Price</h4>
            <div className="d-flex flex-column" >
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {
                  Prices?.map((p) => {
                    return (
                      <div key={p._id}>
                        <Radio value={p.array}>
                          {p.name}
                        </Radio>
                      </div>
                    )
                  })
                }
              </Radio.Group>
            </div>
            <div className="d-flex flex-column" >
              <button className='btn btn-danger' onClick={() => window.location.reload()}>RESET FILTERS</button>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className='text-center'>All Products</h1>
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
                      <button
                        className="btn btn-secondary ms-1"
                        onClick={() => {
                          setCart([...cart, prop])
                          localStorage.setItem('cart', JSON.stringify([...cart, prop]));
                          toast.success("Item Added to Cart")
                        }}
                      >
                        ADD TO CART
                      </button>
                    </div>

                  </div>

                )
              })
            }
          </div>

          <div className="m-2 p-3">
            {product && product.length < total && (
              <button className='btn btn-warning'
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}>
                {loading ? "Loading..." : "Loadmore"}
              </button>
            )
            }
          </div>
        </div>
      </div>
    </Layout >
  );
};

export default HomePage;

