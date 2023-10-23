import React from 'react';
import Layout from '../components/Layout/Layout';
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';
const Categories = () => {
    const categories = useCategory();

    return (
        <Layout title={"All Categories"}>
            {/* <h2>All Categories</h2> */}
            <div className="container mt-5">
                <div className="row">
                    {
                        categories?.map((c) => {
                            return (
                                <div className="col-md-6 mt-3 mb-3 gx-3 gy-3" key={c._id}>
                                    <Link to={`/category/${c.slug}`} className='btn btn-primary'>
                                        {c.name}
                                    </Link>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </Layout>
    )
}

export default Categories;