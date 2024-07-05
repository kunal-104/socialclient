import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./cartitems.css";
import remove_icon from "../Assets/cart_cross_icon.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const CartItems = () => {
  const [orderedItems, setOrderedItems] = useState({});

  let auth = localStorage.getItem("users");
  auth = JSON.parse(auth);
  let userId = auth._id;

  const {
    getTotalCartAmount,
    all_product,
    cartItems,
    setCartItems,
    removeFromCart,
    getDefaultCart,
  } = useContext(ShopContext);
  const navigate = useNavigate();
const [Cart, setCart] = useState(getDefaultCart);

  useEffect(() => {
    getOrderedItem();
  }, []);

  const getOrderedItem = async () => {
    let result = await fetch(
      `https://socialserver-r3k1.onrender.com/getOrderedArray?userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Optionally specify content type if required by the server
        },
      }
    );
    // Check if the response is successful
    if (!result.ok) {
      throw new Error("Network response was not ok");
    }

    // Parse the JSON response
    // console.log('result1:',result)
    result = await result.json();
    // result = JSON.stringify(result);
    // console.log('result2:',result)

    setOrderedItems(result);
    return result;
  };
  // console.log('OrderedArray',orderedItems);

  // console.log('cartItems',cartItems);
  // console.log('1',orderedItems)
  // console.log('2',cartItems)
  // const allValuesAreZero = Object.values(orderedItems).every(value => value === 0);
  // if(!allValuesAreZero){
  //     setCartItems(orderedItems);
  // }
  useEffect(() => {
    // This effect runs only once when orderedItems is set initially
    const allValuesAreZero = Object.values(orderedItems).every(
      (value) => value === 0
    );
    if (!allValuesAreZero) {
      setCartItems(orderedItems);
    }
    console.log("3", cartItems);
  }, [orderedItems]);

  const handleCheckOut = async () => {
    // let auth = localStorage.getItem('users')
    // // console.log('AUTH:',auth, typeof auth);

    // auth = JSON.parse(auth);
    // console.log('AUTH1:',auth._id);
    // let userId = auth._id;
    let productIds = cartItems;
    let result = await fetch("https://socialserver-r3k1.onrender.com/addToCartArray", {
      method: "post",
      body: JSON.stringify({ userId, productIds }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    // console.warn('cartI:',result);
    window.alert("Your order is placed");
    navigate("/");
  };

  // const itemIds = Object.keys(cartItems);
  
  const handleCancelOrder = async () => {
    // const result = await fetch(`http://localhost:5000/cart?userId=${userId}`,{
    //     method: 'Put',
    //     body: JSON.stringify({cart}),
    //     headers:{
    //         'Content-Type':"application/json"
    //     }
    // })
    // result = await result.json();

    setCartItems(orderedItems);

    console.warn('Cart::',Cart); 
    let result = await fetch("https://socialserver-r3k1.onrender.com/cart", {
      method: "post",
      body: JSON.stringify({ userId, Cart }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn("cartI:", result);
    navigate("/");  
    window.alert("Your order is canceled");
  };
  return (
    <>
      {Object.values(orderedItems).every((value) => value === 0) ? (
        <div className="cartitems">
          <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <hr />
          {all_product.map((e) => {
            if (cartItems[e.id] > 0) {
              return (
                <div>
                  <div className="cartitems-format cartitems-format-main">
                  <Link className="link" to={`/product/${e.id}`}>
                    <img
                      src={e.image}
                      alt=""
                      className="carticon-product-icon"
                    />
                    </Link>
                    <p>{e.name}</p>
                    <p>${e.new_price}</p>
                    <button className="cartitems-quantity">
                      {cartItems[e.id]}
                    </button>
                    <p>${e.new_price * cartItems[e.id]}</p>
                    <img
                      className="cartitems-remove-icon"
                      src={remove_icon}
                      onClick={() => {
                        removeFromCart(e.id);
                      }}
                      alt=""
                    />
                  </div>
                 
                  <hr />
                </div>
              );
            }
            return null;
          })}
         { getTotalCartAmount() > 0 ? (<div className="cartitems-down">
            <div className="cartitems-total">
              <h1>Cart Totals</h1>
              <div>
                <div className="cartitems-total-item">
                  <p>SubTotal</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                  <p>Shipping Fee</p>
                  <p>Free</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                  <h3>Total</h3>
                  <h3>${getTotalCartAmount()}</h3>
                  {/* {console.log({getTotalCartAmount})} */}
                </div>
              </div>
              <button onClick={handleCheckOut}>PROCEED TO CKECKOUT</button>
            </div>
            <div className="cartitems-promocode">
              <p>If you have a promo code, Enter it here</p>
              <div className="cartitems-promobox">
                <input type="text" placeholder="promo code" />
                <button>Submit</button>
              </div>
            </div>
          </div>) : <div> <h2><center>Cart is empty.</center></h2> </div> }
        </div>
      ) : (
        <div className="cartitems">
          <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
          </div>
          <hr />
          {all_product.map((e) => {
            if (cartItems[e.id] > 0) {
              return (
                <div>
                  <div className="cartitems-format cartitems-format-main">
                  <Link className="link" to={`/product/${e.id}`}>
                    <img
                      src={e.image}
                      alt=""
                      className="carticon-product-icon"
                      />
                      </Link>
                    <p>{e.name}</p>
                    <p>${e.new_price}</p>
                    <button className="cartitems-quantity">
                      {cartItems[e.id]}
                    </button>
                    <p>${e.new_price * cartItems[e.id]}</p>
                    {/* <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" /> */}
                  </div>
                  <hr />
                </div>
              );
            }
            return null;
          })}
          <div className="cartitems-down">
            <div className="cartitems-total">
              <h1>Cart Totals</h1>
              <div>
                <div className="cartitems-total-item">
                  <p>SubTotal</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                  <p>Shipping Fee</p>
                  <p>Free</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                  <h3>Total</h3>
                  <h3>${getTotalCartAmount()}</h3>
                  {/* {console.log({getTotalCartAmount})} */}
                </div>
              </div>
              <button onClick={handleCancelOrder}>Cancel order</button>
            </div>
            <div className="cartitems-promocode">
              {/* <p>If you have a promo code, Enter it here</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder='promo code' />
                    <button>Submit</button>
                </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItems;
