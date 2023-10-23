import React from 'react';
import Layout from '../components/Layout/Layout';
import { useSearch } from '../content/search.js';
const Search = () => {
    const { values, setValues } = useSearch();

    return (
        <Layout title={'Search results'}>
            <div className="container">
                <div className="text-center">
                    <h1>Search Results</h1>
                    <h6>{values?.result.length < 1 ? "No Product Found" : `Found ${values?.result.length}`}</h6>
                </div>
                <div className="d-flex flex-wrap mt-4 mb-4">
                    {
                        values?.result?.map((prop) => {
                            return (
                                <div className="card m-2" style={{ width: '18rem' }} >
                                    <img src={`/api/v1/product/product-photo/${prop._id}`} className="card-img-top" alt={prop.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{prop.name}</h5>
                                        <p className="card-text">{prop.description.substring(0, 30)}</p>
                                        <p className="card-text">$ {prop.price}</p>
                                        <button className="btn btn-primary ms-1">More Details</button>
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

export default Search;