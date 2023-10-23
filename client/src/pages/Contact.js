import React from 'react'
import Layout from '../components/Layout/Layout';
import IMG1 from '../assets/contactus.jpeg';
import { MdOutlineEmail } from 'react-icons/md';
import { FiPhoneCall } from 'react-icons/fi';
import { TfiHeadphoneAlt } from 'react-icons/tfi';
const Contact = () => {
    return (
        <Layout>
            <div className="main-container">
                <div className="contact-main">
                    <div className="contact-left">
                        <img src={IMG1} alt="image hai " />
                    </div>
                    <div className="contact-right">
                        <button className='contact-btn'>Contact us</button>
                        <h3>any query and info about product feelfree to call anytime we 24X7 available </h3>
                        <span><MdOutlineEmail className='c-icon' /> <p>: www.help@ecommerceapp.com</p></span>
                        <span><FiPhoneCall className='c-icon' /> <p> : +91-7525858518</p></span>
                        <span><TfiHeadphoneAlt className='c-icon' /><p>: 1800-0000-0000</p></span>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Contact;