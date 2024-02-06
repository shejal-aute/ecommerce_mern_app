import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { Prices } from "../components/Prices";
import { Checkbox ,Radio} from 'antd';
import {useCart} from '../context/cart'
import toast from 'react-hot-toast';
import "../styles/Homepage.css";
const HomePage = () => {

  const navigate =useNavigate();
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([]);
  const [checked,setChecked] =useState([]);
  const [radio,setRadio] =useState([]);
  const [total,setTotal] =useState(0);
  const [page,setPage] =useState(1);
  const [loading,setLoading] = useState(false);
  const [cart,setCart] =useCart();
  

  //get all categories
  const getAllCategory = async (req, res) => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category')
      if (data?.success) {
        setCategories(data?.category);
      }

    } catch (error) {
      console.log(error)

    }
  };
  useEffect(() => {
    getAllCategory(); 
    getTotal();
  }, []);
  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false)
      setProducts(data.products);
    } catch (error) {
      setLoading(false)
      console.log(error)

    }
  }
  useEffect(() => {
    if(!checked.length|| !radio.length) getAllProducts();
   
  }, [checked.length,radio.length]);

  useEffect(()=>{
    if(checked.length|| radio.length) filterProduct();

  },[checked,radio]);
  
  //get total count
  const getTotal =async()=>{
    try{
      const {data} =await axios.get('/api/v1/product/product-count')
      setTotal(data?.total)
    }catch(error){
      console.log(error)
    }
  }
  //load more
  const loadMore =async ()=>{
    try{
      setLoading(true)
      const {data} =await axios.get(`/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts([...products,...data.products])

    }catch(error){
      console.log(error);
      setLoading(false)
    }
  }
  useEffect(()=>{
     if(page===1) return ;
      loadMore()
  },[page])
  //handle filter
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);


  //get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
    return (
    <Layout title={"All Products-Best Offers"}>
    <div >
    <div id="carouselExampleCaptions" className="carousel slide">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="/images/cbg2.jpg" className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5>Unleash Your Style </h5>
        <p>- Shop the Trendiest Fashion Today!</p>
      </div>
    </div>
    <div className="carousel-item">
    <img src="/images/cbg3_1.jpg"  className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5>Discover Your Perfect Fit </h5>
        <p> - Find the Ideal Products for You.</p>
      </div>
    </div>
    <div className="carousel-item">
    <img src="/images/cbg1.jpg" className="d-block w-100" alt="..."/>
      
      <div className="carousel-caption d-none d-md-block">
        <h5>Your Fashion Destination</h5>
        <p> - Discover Endless Style Possibilities.</p>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked,c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>
         {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
              {Prices?.map((p)=>(
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                  </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button className="btn btn-danger" 
            onClick={()=>window.location.reload()}>
            RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9">
        {/* {JSON.stringify(radio,null,4)} */}
          <h1 className="text-center">All products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text"> {p.description}...</p>
                  <p className="card-text"><span>&#8377;</span>{p.price}</p>
                  <button className="btn btn-primary m-1" onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
                  <button className="btn btn-secondary" 
                  onClick={()=>{
                    setCart([...cart,p])
                    localStorage.setItem('cart',JSON.stringify([...cart,p]));
                    toast.success("Product  Added To Cart!")
                    }}>
                  Add To Cart
                  </button>
                </div>
              </div>

            ))}
          </div>
          <div className="m-2 p-3">
                {products && products.length <total && (
                    <button className="btn loadmore" 
                    onClick={(e)=>{
                      e.preventDefault()
                      setPage(page +1)
                    }}>
                      {loading ? "Loading...":"LoadMore"}
                    </button>
                )}
          </div>
        </div>
        
      </div>
    </Layout>
  )
}

export default HomePage
