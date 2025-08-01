import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

const Update = () => {
    const {register,handleSubmit,reset} = useForm()
    const {id} = useParams()
    const redirect = useNavigate()
    async function showApi(){
        await axios.get(`${import.meta.env.VITE_API_URL}/products`)
        .then((res)=>{
            reset(res.data)
        })
        .catch((err)=>console.log(err))
    }
    useEffect(()=>{
        showApi()
    },[id,reset])
    async function product(data){
        await axios.put(`${import.meta.env.VITE_API_URL}/products/${id}`,data)
        .then(()=>{
            redirect('/view')
        })
        .catch((err)=>{
            console.log(err)
        })
    }
  return (
    <>
      <form action="" onSubmit={handleSubmit(product)} className="col-lg-6 mx-auto p-5 my-5 shadow">
        <div className="mt-4">
          <select {...register('category')} className="form-select">
            <option value="" selected disabled>--select category--</option>
            <option value="Cloth">Cloth</option>
            <option value="Toy">Toy</option>
            <option value="Makeup">Makeup</option>
            <option value="Shoes">Shoes</option>
          </select>
        </div>
        <div className="mt-4">
          <input type="text" {...register('p_name')} placeholder="Enter product name" className="form-control"/>
        </div>
        <div className="mt-4">
          <input type="number" {...register('p_price')} placeholder="Enter product price" className="form-control"/>
        </div>
        <div className="mt-4">
          <input type="text" {...register('p_url')} placeholder="Enter product url" className="form-control"/>
        </div>
        <div className="mt-4">
          <textarea {...register('p_desc')} className="form-control" placeholder="Enter product description"></textarea>
        </div>
        <div className="mt-4">
          <button className="btn btn-warning">Update</button>
        </div>
      </form>
    </>
  )
}

export default Update
