const cart = document.querySelector('#cart');
const cartProductList = document.querySelector('#cart-list tbody');
const productList = document.querySelector('#product-list');
const emptyCartBtn = document.querySelector('#empty-cart');
let cartItems = [];

eventsLoader();

function eventsLoader(){
    productList.addEventListener('click', addProduct);
    cart.addEventListener('click', removeProduct);
    emptyCartBtn.addEventListener('click', () => {
        cartItems = [];
        cleanCartHTML();
    })
}

function addProduct(data){
    data.preventDefault();  //prevent target front links that are with #
    if (data.target.classList.contains('add-cart')) {
        const selectedProduct = data.target.parentElement;
        readDataSelectedProduct(selectedProduct);
    }
}

function readDataSelectedProduct(product){
    const infoProduct = {
        picture: product.querySelector('img').src,
        title: product.querySelector('h3').textContent,
        price: product.querySelector('.price').textContent,
        id: product.querySelector('a').getAttribute('id'),
        quantity: 1,
    }

    addQuantity(infoProduct);

    cartHTML();
}

function addQuantity(infoProduct){
    const exists = cartItems.some(product => product.id === infoProduct.id);
    if (exists) {
        const products = cartItems.map( product => {
            if (product.id === infoProduct.id) {
                product.quantity++;
                return product;
            } else {
                return product;
            }
        });
        cartItems = [...products];
    } else {
        cartItems = [...cartItems, infoProduct];
    }
}

function cartHTML(){
    cleanCartHTML();

    cartItems.forEach(product => {
        const {picture, title, price, id, quantity} = product;
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>
                <img src="${picture}" width="70px"/>
            </td>
            <td>${title}</td>
            <td>${price}</td>
            <td>${quantity}</td>
            <td>
                <a href="#" id="${id}" class="delete-item"> <svg aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36"><path class="clr-i-outline clr-i-outline-path-1" d="M27.14 34H8.86A2.93 2.93 0 0 1 6 31V11.23h2V31a.93.93 0 0 0 .86 1h18.28a.93.93 0 0 0 .86-1V11.23h2V31a2.93 2.93 0 0 1-2.86 3z" fill="currentColor"/><path class="clr-i-outline clr-i-outline-path-2" d="M30.78 9H5a1 1 0 0 1 0-2h25.78a1 1 0 0 1 0 2z" fill="currentColor"/><path class="clr-i-outline clr-i-outline-path-3" d="M21 13h2v15h-2z" fill="currentColor"/><path class="clr-i-outline clr-i-outline-path-4" d="M13 13h2v15h-2z" fill="currentColor"/><path class="clr-i-outline clr-i-outline-path-5" d="M23 5.86h-1.9V4h-6.2v1.86H13V4a2 2 0 0 1 1.9-2h6.2A2 2 0 0 1 23 4z" fill=""/></svg></a>
            </td>
        `;
        cartProductList.appendChild(row);
    })
}

function cleanCartHTML(){
    while (cartProductList.firstChild){
        cartProductList.removeChild(cartProductList.firstChild);
    }
}

function removeProduct(data) {
    console.log(data.target.parentElement);
    if(data.target.parentElement.classList.contains('delete-item')){
        const productId = data.target.parentElement.getAttribute('id');
        cartItems = cartItems.filter(product => product.id != productId);
        cartHTML();
    }
}