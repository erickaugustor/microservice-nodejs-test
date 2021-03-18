import { mount as productMount } from 'products/ProductsIndex';
import { mount as cartMount } from 'cart/CartShow';

const productsEl = document.querySelector('#dev-products');
productMount(productsEl);

const cartEl = document.querySelector('#dev-cart');
cartMount(productsEl);

console.log('Container!');
