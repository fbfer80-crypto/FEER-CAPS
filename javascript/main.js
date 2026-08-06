
let cart = [];

function agregarAlCarrito(button) {
const card = button.closest('.card-producto');
if (!card) return;

const titleEl = card.querySelector('h3');
const name = titleEl ? titleEl.innerText : 'Gorra';

const priceEl = card.querySelector('.precio');
let price = 19.99;
if (priceEl) {
price = parseFloat(priceEl.innerText.replace('$', '').trim()) || 19.99;
}

const imgElement = card.querySelector('img');
const image = imgElement ? imgElement.getAttribute('src') : '';

const selectTalla = card.querySelector('.input-talla');
const talla = selectTalla ? selectTalla.value : 'Única';

const itemId = name + '-' + talla;
const existing = cart.find(item => item.id === itemId);

if (existing) {
existing.quantity += 1;
} else {
cart.push({
id: itemId,
name: name,
price: price,
image: image,
talla: talla,
quantity: 1
});
}

actualizarCarritoHTML();
}

function actualizarCarritoHTML() {
const contenedor = document.getElementById('cart-items');
const contador = document.getElementById('cart-count');
const totalBox = document.getElementById('cart-total');

const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
if (contador) contador.innerText = totalItems;

const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
if (totalBox) totalBox.innerText = '$' + totalPrice.toFixed(2);

if (!contenedor) return;

contenedor.innerHTML = '';

if (cart.length === 0) {
contenedor.innerHTML = '<p class="empty-msg" style="text-align:center; color:#888; padding:20px;">Tu carrito está vacío</p>';
return;
}

cart.forEach(item => {
const div = document.createElement('div');
div.classList.add('cart-item');
div.style.cssText = "display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; border-bottom: 1px solid #333; padding-bottom: 10px;";

div.innerHTML = `
<img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
<div style="flex: 1; margin-left: 10px; text-align: left;">
<h4 style="font-size: 0.9rem; margin: 0; color: white;">${item.name}</h4>
<p style="font-size: 0.8rem; color: #aaa; margin: 2px 0;">Talla: ${item.talla}</p>
<p style="font-size: 0.85rem; color: #e50914; margin: 0; font-weight: bold;">$${item.price.toFixed(2)} x ${item.quantity}</p>
</div>
`;
contenedor.appendChild(div);
});
}

function toggleCart() {
const modal = document.getElementById('cart-modal');
if (modal) modal.classList.toggle('active');
}

function toggleMenu() {
const navLinks = document.getElementById('navLinks');
if (navLinks) navLinks.classList.toggle('active');
}

function sendOrderWhatsApp() {
if (cart.length === 0) {
alert("Tu carrito está vacío");
return;
}

let mensaje = "Hola! Deseo realizar el siguiente pedido en FEER CAPS:%0A%0A";
let total = 0;

cart.forEach(item => {
let subtotal = item.price * item.quantity;
total += subtotal;
mensaje += `- ${item.name} (Talla: ${item.talla}) x${item.quantity} - $${subtotal.toFixed(2)}%0A`;
});

mensaje += `%0ATotal a pagar: $${total.toFixed(2)}`;

window.open(`https://wa.me/593999226667?text=${mensaje}`, '_blank');
}

