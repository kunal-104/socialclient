import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './cartitems.css';
import remove_icon from '../Assets/cart_cross_icon.png';
import { useNavigate, Link } from 'react-router-dom';

const CartItems = () => {
    const [orderedItems, setOrderedItems] = useState({});
    let auth = localStorage.getItem('users');
    auth = JSON.parse(auth);
    let userId = auth._id;

    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
    const navigate = useNavigate();
    console.log('cartItems', cartItems);

    useEffect(() => {
        getOrderedItem();
    }, []);

    const getOrderedItem = async () => {
        let result = await fetch(`https://socialserver-r3k1.onrender.com/getOrderedArray?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!result.ok) {
            throw new Error('Network response was not ok');
        }

        result = await result.json();
        console.log('result2:', result);
        setOrderedItems(result);
    };

    const handleCheckOut = async () => {
        let auth = localStorage.getItem('users');
        auth = JSON.parse(auth);
        let userId = auth._id;
        let productIds = cartItems;
        let result = await fetch('https://socialserver-r3k1.onrender.com/addToCartArray', {
            method: 'POST',
            body: JSON.stringify({ userId, productIds }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        window.alert('Your order is placed');
        navigate('/');
    };

    const keysWithValueGreaterThanZero = Object.entries(orderedItems)
        .filter(([key, value]) => value > 0)
        .map(([key, value]) => parseInt(key));

    console.log('keysWithValueGreaterThanZero', keysWithValueGreaterThanZero);

    return (
        <div className="cartitems">
                <ul>
            <div className="cartitems-format-main">
                    
                    <li> <div className='a'>Products</div></li>
                    <li> <div className='b'>Title</div></li>
                    <li> <div className='c'>Price</div></li>
                    <li><div className='d'>Quantity</div></li>
                    <li><div className='e'>Total</div></li>
                    <li><div className='f'>Remove</div>  </li>   
               
            </div>
                </ul>
            <hr />
            {keysWithValueGreaterThanZero.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                                <ul>
                            <div className="cartitems-format">
                               <Link to='/'>
                               <li> <div className='a'><img src={e.image} alt="" className="carticon-product-icon" /></div></li>
                               <li>  <div className='b'>{e.name}</div></li>
                               <li><div className='c'>${e.new_price}</div></li>
                               <li><div className='d'><button className="cartitems-quantity">{cartItems[e.id]}</button></div></li>
                               <li> <div className='e'>${e.new_price * cartItems[e.id]}</div></li>
                               </Link>
                               <li> <div className='f'><img className="cartitems-remove-icon" src={remove_icon} onClick={() => removeFromCart(e.id)} alt="" /></div></li>
                            </div>
                                </ul>
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
                        </div>
                    </div>
                    <button onClick={handleCheckOut}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder="promo code" />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
