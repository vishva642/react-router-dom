import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Singleproduct = () => {
    const [product,setProduct]= useState({})
    const{productId}=useParams()
    console.log(productId)
    async function showApi(){
        await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`)
        .then((res)=>{
            setProduct(res.data)
        })
        .catch((err)=>console.log(err))
    }
    useEffect(()=>{
        showApi()
    },[])
  return (
    <>
      <div className="col-lg-6 mx-auto my-5 p-5 shadow">
        <div className="row">
            <div className="col-lg-6">
                <img src={product.p_url} alt="" className='w-100 h-100'/>
            </div>
            <div className="col-lg-6">
                <h1>{product.p_name}</h1>
                <ul className='list-unstyled'>
                    <li>{product.category}</li>
                    <li>{product.p_price}</li>
                    <li>{product.p_desc}</li>
                </ul>
            </div>
        </div>
      </div>
    </>
  )
}

export default Singleproduct


