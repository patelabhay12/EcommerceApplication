import React from 'react'
import Layout from '../components/Layout/Layout';
import IMG1 from '../assets/about.jpeg';
const About = () => {
    return (
        <Layout title="About us - Ecommerce app">
            <div className="about-main">
                <div className="about-left">
                    <img src={IMG1} alt="about image hai" />
                </div>
                <div className="about-right">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima deleniti adipisci, voluptatem sapiente, doloremque explicabo repudiandae odio exercitationem quos est eos libero voluptas aliquam! Voluptates mollitia explicabo in sint non ipsum aliquam dolorem incidunt laborum! Aliquid amet sit dicta earum vel nobis quasi quisquam magni veritatis laudantium possimus, accusantium officiis cumque eius placeat voluptatum distinctio similique quos? Reprehenderit, molestiae omnis!</p>
                </div>
            </div>
        </Layout>
    )
}
export default About;