// Select Element
const listCart = document.querySelector('#list-cart');
const countCart = document.querySelector('.shoppingCart-count');

// Evenet Listeners
setEventListeners();

function setEventListeners() {
    listCart.addEventListener('click', addToShoppingCart); // added product to the shopping Cart
    document.addEventListener('DOMContentLoaded', initializeShoppingCart); // initialized document when complete load for set count shoppingCart
}

// Func : added product to the shopping Cart
function addToShoppingCart(e) {
    if (e.target.classList.contains('cart-addShop')) {
        const cart = e.target.parentElement.parentElement; // access to the cart

        // create product info with cart parent
        const product = {
            image: cart.querySelector('.cart-img').src,
            title: cart.querySelector('.cart-title').innerText,
            price: cart.querySelector('.cart-price').innerText,
            id: cart.getAttribute('data-id'),
            count: 1
        }

        addToLocalStorage(product); // added product to the localStorage
    }
}

// Func : added product to the localStorage
function addToLocalStorage(product) {
    const products = fetchProducts(); // get all products

    // find index product
    const findProduct = products.findIndex(p => p.id == product.id);

    // if exist product
    if (findProduct !== -1) {
        products[findProduct].count += 1; // increase count product
    } else {
        products.push(product); // push new product to products
    }

    // save new products to the localStorage
    saveProducts(products);
}

// Func : fetching all products from localStorage
function fetchProducts() {
    const products = localStorage.getItem('products'); // get products from localStorage

    if (products)
        return JSON.parse(products);
    else
        return [];
}

// Func : Saved products to the localStorage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products)); // save to localStorage

    // set count to the shoppingCart count
    setShoppingCartCount(products);
}

// Func : set count products
function setShoppingCartCount(products) {
    countCart.textContent = products.reduce((count, product) => count += product.count, 0);
}

// Func : initialized shopping cart when loaded document
function initializeShoppingCart() {
    const products = fetchProducts(); // get all products in localStorage
    setShoppingCartCount(products); // set count to the shopping Cart count
}