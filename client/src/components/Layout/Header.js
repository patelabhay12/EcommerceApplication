import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { FaShopify } from 'react-icons/fa6';
import { useAuth } from '../../content/auth';
import { toast } from 'react-hot-toast';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../content/Cart';
import { Badge } from 'antd';
const Header = () => {

  const { auth, setAuth } = useAuth();
  const { cart } = useCart();
  const categories = useCategory();
  // console.log(">>>>>>>", categories);
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: null
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully ...");
  }
  return (
    // <>
    //   <header className="text-gray-600 body-font bg-slate-500">
    //     <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
    //       <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
    //         <Link  className="flex font-bold text-2xl" > <FaShopify /> ECommerce App</Link>
    //       </Link>
    //       <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
    //         <Link to="/" className="mr-5 hover:text-gray-900 cursor-pointer">Home</Link>
    //         <Link className="mr-5 hover:text-gray-900 cursor-pointer">Second Link</Link>
    //         <Link className="mr-5 hover:text-gray-900 cursor-pointer">Third Link</Link>
    //         <Link className="mr-5 hover:text-gray-900 cursor-pointer">Fourth Link</Link>
    //       </nav>
    //       <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Button
    //         <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
    //           <path d="M5 12h14M12 5l7 7-7 7"></path>
    //         </svg>
    //       </button>
    //     </div>
    //   </header>
    // </>

    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand" ><FaShopify /> ECommerce App</Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link"

                >Home</NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link to={"/categories"} className="nav-link dropdown-toggle" href="#" id="navbarDropdown" data-bs-toggle="dropdown" >
                  Categories
                </Link>
                <ul className="dropdown-menu"
                  aria-labelledby="navbarDropdown">
                  <li >
                    <Link to={`/categories`} className="dropdown-item" href="#">
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => {
                    return (
                      <li key={c.id}>
                        <Link to={`/category/${c.slug}`} className="dropdown-item" href="#">
                          {c.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>


              {
                !auth.user ? (
                  <>
                    <li className="nav-item">
                      <NavLink to="/register" className="nav-link" >signup </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link">Login</NavLink>
                    </li>
                  </>
                ) : (
                  <>

                    <li className="dropdown">
                      <NavLink
                        className="nav-link dropdown-toggle" id="navbarDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        {auth?.user?.name}
                      </NavLink>
                      <ul className="dropdown-menu" >
                        <li>
                          <NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} >Dashboard</NavLink>
                        </li>
                        <li>
                          <NavLink onClick={handleLogout} to="/login" className="dropdown-item">Logout
                          </NavLink>
                        </li>
                      </ul>
                    </li>

                  </>
                )
              }

              <li className="nav-item">
                <Badge count={cart?.length} showZero >
                  <NavLink to="/cart" className="nav-link">
                    Cart
                  </NavLink>
                </Badge>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header