import React from 'react'
import Layout from '../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../content/Cart';
import { useAuth } from '../content/auth';
import { Button } from 'antd';
const CartPage = () => {

    const navigate = useNavigate();
    const { cart, setCart } = useCart();
    const { auth, setAuth } = useAuth();

    // total Price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map(item => {
                total += parseInt(item.price);
            });
            return total.toLocaleString('en-US', {
                style: "currency",
                currency: "USD"
            });
        } catch (error) {
            console.log(error);
        }
    };


    // delete item
    const removeItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className='text-center bg-light p-2 mb-1'>
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className='text-center'>
                            {cart?.length > 0 ? `Your Have ${cart?.length} items in your cart ${auth?.token ? " " : "Please Login to Checkout"} ` : "Your Cart Is Empty"}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {
                            cart?.map((p) => {
                                return (
                                    <div className="row mb-3 card flex-row">
                                        <div className="col-md-4">
                                            <img src={`/api/v1/product/product-photo/${p._id}`} alt=" Product image hai"
                                                height={"200px"}
                                                width={"200px"}
                                            />
                                        </div>
                                        <div className="col-md-8 p-4">
                                            <p>{p.name}</p>
                                            <p>{p.description.substring(30)}</p>
                                            <p>Price : {p.price}</p>
                                            <button className='btn btn-danger'
                                                onClick={() => removeItem(p._id)}
                                            >
                                                REMOVE
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="col-md-4 text-center">
                        <h2>Cart Summary</h2>
                        <p> Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total : {totalPrice()}</h4> 
 
                        {auth?.user?.address ? (
                            <>
                                <div className="mb-3">
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button className='btn btn-outline-warning'
                                        onClick={() => navigate('/dashboard/user/profile')}
                                    >
                                        Update Address
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="mb-3">
                                {
                                    auth?.token ? (
                                        <Button className='btn btn-outline-warning' onClick={() => navigate("/dashboard/user/profile")}>Update Address</Button>
                                    ) : (
                                        <Button className='btn btn-outline-warning' onClick={() => navigate("/login",{state:"/cart"})}>Please Login To CheckOut</Button>
                                    )
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage;