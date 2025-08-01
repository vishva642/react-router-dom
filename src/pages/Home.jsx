import axios from "axios"
import { useForm } from "react-hook-form"
import { toast, ToastContainer, Zoom } from "react-toastify"

const Home = () => {
  const { register, handleSubmit, reset } = useForm()
  async function product(data) {
    // const res = await axios.post('https://6852dde20594059b23cf6d80.mockapi.io/api/products',data)
    // console.log(res)
    const newData = { ...data, createdAt: new Date() }
    await axios.post(`${import.meta.env.VITE_API_URL}/products`, newData)
      // console.log(`${import.meta.env.VITE_API_URL}/products`)
      .then((res) => {
        console.log(res.data)
        // alert('Your product has been inserted!!!')
        toast.success('🦄 Your product has been inserted!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
        });
        reset()
      })
      .catch((e) => console.log(e))
  }
  return (
    <>
      <form action="" onSubmit={handleSubmit(product)} className="col-lg-6 mx-auto p-5 my-5 shadow">
        <div className="mt-4">
          <select className="form-select" {...register('category')}>
            <option value="" selected disabled>--select category--</option>
            <option value="Cloth">Cloth</option>
            <option value="Toy">Toy</option>
            <option value="Makeup">Makeup</option>
            <option value="Shoes">Shoes</option>
          </select>
        </div>
        <div className="mt-4">
          <input type="text" {...register('p_name')} placeholder="Enter product name" className="form-control" />
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
          <button className="btn btn-success">Submit</button>
          <ToastContainer />
        </div>
      </form>
    </>
  )
}

export default Home


