// Select Element
const shoppingTable = document.querySelector('.shoppingCart-table');
const countCart = document.querySelector('.shoppingCart-count');
const listProduct = document.querySelector('.shoppingCart-table tbody');
const discountOrder = document.getElementById('order-discount');
const discountPercent = 7; // %
const totalOrder = document.getElementById('order-total');
const totalDiscount = document.getElementById('order-totalDiscount');

// Event Listeners
setEventListeners();

function setEventListeners() {
    shoppingTable.addEventListener('click', manageCount); // manage count a product to the shopping Cart
    document.addEventListener('DOMContentLoaded', initializeShoppingCart); // initialized shopping cart when complete loaded document
}


// Func : for management count a product
function manageCount(e) {
    if (e.target.classList.contains('fa')) {
        const parent = e.target.parentElement.parentElement; // access to the parent element tag(manage-count)
        const counter = parent.querySelector('.counter'); // access to the counter
        const id = parent.getAttribute('data-id'); // access to the product id

        if (e.target.classList.contains('fa-plus')) {
            counter.textContent = Number(counter.innerText) + 1; // increase count

            // change count to the localStorage
            changeCountToLocalStorage('plus', id);
        }
        else if (e.target.classList.contains('fa-minus')) {
            counter.textContent = Number(counter.innerText) - 1; // decrease count

            // change count to the localStorage
            changeCountToLocalStorage('minus', id);
        }
    }
}

// Func : change count product to the localStorage
function changeCountToLocalStorage(command, id) {
    const products = fetchProducts(); // get all products
    const productIndex = products.findIndex(p => p.id === id); // access to the index product

    if (command === 'plus') {
        products[productIndex].count++;
    } else if (command === 'minus') {
        products[productIndex].count--;
    }

    if (products[productIndex].count < 1) {
        // deleted product from localStorage
        const productFilter = products.filter(p => p.id !== id);

        // saved new products
        saveProducts(productFilter);

        // deleted product from document
        createAllProducts(productFilter);
    } else {
        saveProducts(products); // save new products

        // for change price
        createAllProducts(products);
    }
}

// Func : when complete loaded document
function initializeShoppingCart() {
    discountOrder.textContent = discountPercent + '%'; // set discount percent to the order summery 

    const products = fetchProducts(); // get all products

    // create all products in localStorage to the list shopping cart
    createAllProducts(products);

    // set count shoppingCart to the .shoppingCart-count
    setShoppingCartCount(products);

    // set ultimete price to the order summery
    setUltimatePrice(products);
}

// Func : fetching all products from localStorage
function fetchProducts() {
    const products = localStorage.getItem('products'); // get all products

    if (products)
        return JSON.parse(products);
    else
        return [];
}

// Func : Saved products to the localStorage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products)); // save to localStorage

    // set count shopping cart
    setShoppingCartCount(products);

    // set ultimete price to the order summery
    setUltimatePrice(products);
}

// Func : set count cart to the shoppingCart-count
function setShoppingCartCount(products) {
    const count = products.reduce((count, product) => count += product.count, 0);
    countCart.textContent = `${count} محصول`;
}

// Func : set ultimate price to the order summery
function setUltimatePrice(products) {
    const total = products.reduce((total, product) => total += (product.count * product.price), 0); // get total price in shopping cart
    const totalDiscountPrice = (total * discountPercent) / 100;
    totalDiscount.textContent = Math.floor(totalDiscountPrice).toLocaleString(); // total discount
    totalOrder.textContent = Math.floor(total - totalDiscountPrice).toLocaleString(); // total ultimate
}

// Func : create all product tag to the list shopping cart
function createAllProducts(products) {
    listProduct.innerHTML = ''; // reset content list products
    products.forEach((product, index) => {
        const row = document.createElement('tr'); // create tr(parent)
        row.setAttribute('data-id', product.id);

        // create child tr(td)
        row.innerHTML =
            `
            <td>${++index}</td>
            <td>
                <img src="${product.image}" alt="${product.title}" class="shoppingCart-img">
            </td>
            <td class="cart-title">
                <p>${product.title}</p>
                <p class="cart-price">${product.price.toLocaleString()}</p>
            </td>
            <td class="cart-price">${(product.price * product.count).toLocaleString()}</td>
            <td>
                <div class="manage-count" data-id="${product.id}">
                    <span class="fa fa-plus"></span>
                    <span class="counter">${product.count}</span>
                    <span class="fa fa-minus"></span>
                </div>
            </td>
        `;

        // append tr to the list products
        listProduct.appendChild(row);
    });
}