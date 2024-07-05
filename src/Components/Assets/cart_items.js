// cartItems.js

let cartItems = {};

function addItemToCart(userId, productId, quantity) {
    if (!cartItems[userId]) {
        cartItems[userId] = {};
    }
    if (!cartItems[userId][productId]) {
        cartItems[userId][productId] = 0;
    }
    cartItems[userId][productId] += quantity;
}

function removeItemFromCart(userId, productId, quantity) {
    if (cartItems[userId] && cartItems[userId][productId]) {
        cartItems[userId][productId] -= quantity;
        if (cartItems[userId][productId] <= 0) {
            delete cartItems[userId][productId];
        }
    }
}

function clearCart(userId) {
    if (cartItems[userId]) {
        delete cartItems[userId];
    }
}

function getCartItems(userId) {
    return cartItems[userId] || {};
}

function saveCartToFile() {
    const fs = require('fs');
    fs.writeFileSync('cartItemsData.js', `const cartItemsData = ${JSON.stringify(cartItems, null, 4)};`);
}

module.exports = {
    addItemToCart,
    removeItemFromCart,
    clearCart,
    getCartItems,
    saveCartToFile
};
