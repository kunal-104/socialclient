import React, { createContext, useState } from "react";
import all_product from '../Components/Assets/all_product';

export const ShopContext = createContext(null);


const getDefaultCart = ()=>{
    let cart = {};
    for(let index=0; index< all_product.length+1; index++){
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [cartItems, setCartItems] = useState(getDefaultCart());
    // const [isOrdered, setIsOrdered] = useState(false);

    const addToCart = async(itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}))
        // let result = await fetch('http://localhost:5000/addToCart',{
            let result = await fetch('https://socialserver-r3k1.onrender.com/addToCart',{

            method: 'post',
            body: JSON.stringify({itemId}),
            headers: {
                'Content-Type': 'application/json'
              }
        });
        console.log('result',result)

    }
    const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;     
    }

    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem+= cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {getTotalCartItems, getTotalCartAmount, all_product, cartItems, setCartItems, addToCart, removeFromCart, getDefaultCart};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;