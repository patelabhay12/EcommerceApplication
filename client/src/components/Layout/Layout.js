import React from 'react'
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';


const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <meta name="keywords" content={keywords} />
        <meta
          name="description"
          content={description}
        />
        <meta name="authhor" content={author} />
        <title>{title}</title>

      </Helmet>

      <Header />
      <main style={{ minHeight: "80vh" }}>
        <Toaster position='top-right' />
        {children}</main>
      <Footer />
    </div>
  )
}

Layout.defaultProps = {
  title: "Ecommerce app - shop now",
  description: "mern stack project",
  keywords: "Mern react node mongodb ",
  author: "Abhay Patel"
}

export default Layout; 