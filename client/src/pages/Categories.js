import React,{useState,useEffect} from 'react';
import useCategory from '../hooks/useCategory';
import {Link} from 'react-router-dom';
import Layout from '../components/Layout/Layout'
// import "../styles/CategoryProductStyles.css";
const Categories = () =>{
    const categories =useCategory()
    
    return(
        <Layout title={"All - Categories"}>
            <div className="container">
                <div className="row cat-container">
                {categories.map((c)=>(
                    <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
                        <button className="card">
                        <Link to={`/category/${c.slug}`} className="btn cat-btn">{c.name}</Link>
                        </button>
                    </div>
                ))}
                    
                </div>
            </div>
        </Layout>
    )
}
export default Categories