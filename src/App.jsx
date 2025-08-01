import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './layout/Header';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import About from './pages/About';
import Contact from './pages/Contact';
import Pagesnotfound from './pages/Pagesnotfound';
import Singleproduct from './pages/Singleproduct';
import Update from './pages/Update';
const App = () => {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/view' element={<About/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='*' element={<Pagesnotfound/>}></Route>
          <Route path='/Singleproduct/:productId' element={<Singleproduct/>}></Route>
          <Route path='/Update/:productId' element={<Update/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App


