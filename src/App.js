import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product.jsx';
import Cart from './Pages/Cart.jsx';
import LoginSignup from './Pages/LoginSignup.jsx';
import Footer from './Components/Footer/Footer.jsx';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'
import PrivateComponent from './Components/PrivateComponent.jsx'
import Register from './Pages/Register.jsx';
function App() {

  return (
    <div className="app">
      <BrowserRouter>
       <Navbar/>
       <Routes>
      {/* <Route element={<PrivateComponent/>}> */}
        <Route path='/' element={<Shop/>} />
        <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/>} />
        <Route path='/womens' element={<ShopCategory banner={women_banner} category="women"/>} />
        <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid"/>} />
        <Route path='/product' element={<Product/>} >
          <Route path=':productId' element={<Product/>} />
        </Route>
        <Route path='/logout' element={<h1>Logout Component</h1>} />
        <Route path='/cart' element={<Cart/>} />
        {/* </Route> */}
        <Route path='/login' element={<LoginSignup/>} />
        <Route path='/signup' element={<Register/>} />

       </Routes>
       <Footer/>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
