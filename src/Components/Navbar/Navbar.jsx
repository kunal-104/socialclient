import React, { useContext, useState, useEffect, useRef } from 'react';
import './navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { IoMenu, IoClose } from "react-icons/io5";

const Navbar = () => {
  const location = useLocation();
  const auth = localStorage.getItem('users');
  const [menu, setMenu] = useState("shop");
  const [menuOpen, setMenuOpen] = useState(false);
  const { getTotalCartItems, setCartItems, getDefaultCart } = useContext(ShopContext);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const handleScroll = () => {
    setMenuOpen(false);
  };
  const logout = () => {
    setMenuOpen(false);
    setCartItems(getDefaultCart);
    localStorage.clear();
    navigate("/signup");
  };
  useEffect(() => {
    document.querySelector("body").addEventListener('scroll', handleScroll);
    
    // Cleanup function
    return () => {
      document.querySelector("body").removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    if (location.pathname === '/') {
      setMenu('shop');
    }
  }, [navigate, location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className='navbar'>
      <Link to='/' className='Link'>
        <div className="nav-logo">
          <img src={logo} alt="" />
          <p>SHOPPER</p>
        </div>
      </Link>
      <div className='menu'>
        {auth ? <>
          {menuOpen ? <IoClose className='dis' onClick={() => setMenuOpen(false)} /> : <IoMenu className='dis' onClick={() => setMenuOpen(true)} />}
          <ul ref={menuRef} className={menuOpen ? "menuOpen" : "nav-menu"}>
            <li onClick={() => { setMenu("shop"); setMenuOpen(false); }}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
            <li onClick={() => { setMenu("mens"); setMenuOpen(false); }}><Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link>{menu === "mens" ? <hr /> : <></>}</li>
            <li onClick={() => { setMenu("womens"); setMenuOpen(false); }}><Link style={{ textDecoration: 'none' }} to='/womens'>Women</Link>{menu === "womens" ? <hr /> : <></>}</li>
            <li onClick={() => { setMenu("kids"); setMenuOpen(false); }}><Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link>{menu === "kids" ? <hr /> : <></>}</li>
            <li><Link style={{ textDecoration: 'none' }} onClick={logout} to='/signup'>Logout ({JSON.parse(auth).name})</Link></li>
            <li><Link style={{ textDecoration: 'none' }} to='/cart'><img src={cart_icon} alt="" onClick={() => { setMenu("cart"); setMenuOpen(false); }} /></Link>{menu === "cart" ? <hr /> : <></>}</li>
            {getTotalCartItems() > 0 ? (<div className="nav-cart-count">{getTotalCartItems()}</div>) : ""}
          </ul>
        </> :
          <div className="nav-login-cart">
            <ul className="hide">
              <Link className='signup' to='/signup'><button>Signup</button></Link>
              <Link className='login' to='/login'><button>Login</button></Link>
            </ul>
          </div>}
      </div>
    </div>
  );
};

export default Navbar;







// import React, { useContext, useState, useEffect } from 'react'
// import './navbar.css'
// import logo from '../Assets/logo.png'
// import cart_icon from '../Assets/cart_icon.png' 
// import {Link, useNavigate, useLocation} from 'react-router-dom';
// import { ShopContext } from '../../Context/ShopContext';
// import { IoMenu, IoClose } from "react-icons/io5";

// const Navbar = () => {
//   const location = useLocation();
//     const auth = localStorage.getItem('users');
//     const [menu, setMenu] = useState("shop");
//     const [menuOpen, setMenuOpen] = useState(false);
//     const {getTotalCartItems, setCartItems, getDefaultCart} = useContext(ShopContext);
//     const navigate = useNavigate();
  
//     const logout=()=>{
//       setMenuOpen(!menuOpen);
//       setCartItems(getDefaultCart);
//       localStorage.clear();
//       navigate("/signup");
//     }
//     useEffect(()=>{
//       if(location.pathname === '/'){
//         setMenu('shop');
//       }
//     }, [navigate])
//   return (
//     <div className='navbar'>
//         <Link to='/' className='Link'>
//       <div className="nav-logo">
//         <img src={logo} alt="" />
//         <p>SHOPPER</p>
//       </div>
//         </Link>
//       <div className='menu'>
//       {auth ? <>
//       {menuOpen ? <IoClose className='dis' onClick={()=>setMenuOpen(!menuOpen)} />: <IoMenu className='dis' onClick={()=>setMenuOpen(!menuOpen)}/>}
        
//       <ul className={menuOpen ? "menuOpen": "nav-menu" }>
//         <li onClick={ () => { setMenu("shop"); setMenuOpen(!menuOpen)}}><Link style={{textDecoration: 'none'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
//         <li onClick={ () => { setMenu("mens"); setMenuOpen(!menuOpen)}}><Link style={{textDecoration: 'none'}}  to='/mens'>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
//         <li onClick={ () => { setMenu("womens"); setMenuOpen(!menuOpen)}}><Link style={{textDecoration: 'none'}}  to='/womens'>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
//         <li onClick={ () => { setMenu("kids"); setMenuOpen(!menuOpen)}}><Link style={{textDecoration: 'none'}}  to='/kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
//         <li><Link style={{textDecoration: 'none'}} onClick={logout} to='/signup'>Logout ({JSON.parse(auth).name})</Link></li>
//         <li>  <Link style={{textDecoration: 'none'}} to='/cart'><img src={cart_icon}  alt=""  onClick={ () => { setMenu("cart"); setMenuOpen(!menuOpen)}}/></Link>{menu==="cart"?<hr/>:<></>} </li> 
//         {getTotalCartItems() > 0 ? (<div className="nav-cart-count">{getTotalCartItems()}</div>) : ""}
//       </ul></> :
//       <div className="nav-login-cart">
//       <ul className="hide">
//         <Link className='signup' to='/signup'><button>Signup</button></Link>
//         <Link className='login' to='/login'><button>Login</button></Link>
//       </ul>
//       </div> }
//       </div>
//     </div>
//   )
// }

// export default Navbar
