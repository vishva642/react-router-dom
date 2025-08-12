import axios from "axios"
import { useEffect, useState } from "react"
import { FaEye, FaTrash } from "react-icons/fa"
import { FaPencil } from "react-icons/fa6"
import { NavLink } from "react-router-dom"

const About = () => {
  const [product, setProduct] = useState([])
  const [search, setSearch] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  async function showApi() {
    // const newData = {...data,createdAt:new Date()}
    await axios.get(`${import.meta.env.VITE_API_URL}/products`)
      .then((res) => {
        setProduct(res.data)
      })
  }
  useEffect(() => {
    showApi()
  }, [])
  async function trash(id) {
    try {
      if (confirm("Are you sure want to delete this data?")) {
        await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`)
        showApi()
      }
    }
    catch (error) {
      console.log('error :', error)
    }
  }
  const categories = product.map((product) => {
    return product.category
  })
  const uniqueCategory = new Set(categories)
  const filterProduct = product
    .filter((product) => {
      return product.p_name.toLowerCase().includes(search.toLowerCase())
    })
    .filter((product) => {
      return product.p_price=== price
    })
    .filter((product) => {
        return product.category==category
    })
  console.log(filterProduct)
  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-lg-4">
            <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} className="form-control" placeholder="Enter product name" />
          </div>
          <div className="col-lg-4">
            <input type="number" onChange={(e) => setPrice(e.target.value)} value={price} className="form-control" placeholder="Enter product price" />
          </div>
          <div className="col-lg-4">
            <select onChange={(e) => setCategory(e.target.value)} className="form-select">
              <option disabled selected>--select category--</option>
              {
                [...uniqueCategory].map((cat, i) => {
                  return (
                    <option key={i} value={cat}>{cat}</option>
                  )
                })
              }
            </select>
          </div>
        </div>
      </div>
      <table className="table table-striped table-hover table-success container my-5">
        <thead>
          <tr>
            <th>#</th>
            <th>category</th>
            <th>name</th>
            <th>price</th>
            <th>image</th>
            <th>date</th>
            <th>desc</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {
            filterProduct.map(({ category, p_name, p_price, createdAt, p_desc, id, p_url }, index) => {
              return (

                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{category}</td>
                  <td>{p_name}</td>
                  <td>{p_price}</td>
                  <td>
                    <img src={p_url} alt="" height={100} width={150} />
                  </td>
                  <td>{new Date(createdAt).toDateString()}</td>
                  <td>{p_desc}</td>
                  <td>
                    <button onClick={() => trash(id)} className="btn btn-outline-danger"><FaTrash /></button>
                    <NavLink to={`/Singleproduct/${id}`} className="btn btn-outline-primary mx-2"><FaEye /></NavLink>
                    <NavLink to={`/update/${id}`} className='btn btn-outline-warning'><FaPencil /></NavLink>
                  </td>
                </tr>

              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default About


