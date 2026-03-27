// Datos de productos
let products = [
    { id:1, name:"Nike For One", category:"hombre", price:25, img:"img/nike blanco.jpg", desc:"Zapatillas deportivas cómodas" },
    { id:2, name:"Adidas Ultraboost", category:"mujer", price:159, img:"img/adidas de dama.jpeg", desc:"Running de alta tecnología" },
    { id:3, name:"Converse Kids", category:"niños", price:45, img:"https://source.unsplash.com/random/300x300/?converse", desc:"Clásico para niños" },
    { id:4, name:"Vans Old Skool", category:"jovenes", price:65, img:"https://source.unsplash.com/random/300x300/?vans", desc:"Estilo urbano juvenil" },
    { id:5, name:"Botas Timberland", category:"hombre", price:189, img:"img/Botas de cuero.jpeg", desc:"Resistentes al agua" },
    { id:6, name:"Sandalias Birkenstock", category:"mujer", price:55, img:"https://source.unsplash.com/random/300x300/?sandals", desc:"Máxima comodidad" },
    { id:7, name:"Zapatos escolares", category:"niños", price:35, img:"https://source.unsplash.com/random/300x300/?kids-shoes", desc:"Para el colegio" },
    { id:8, name:"Jordan 1 Low", category:"jovenes", price:110, img:"https://source.unsplash.com/random/300x300/?jordan", desc:"Icono streetwear" }
];

let cart = [];
let currentProduct = null;

// Renderizar productos
function renderProducts(filteredProducts) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p style="color:#666; font-size:0.95rem;">${product.desc}</p>
                <p class="price">$${product.price}</p>
                <button class="add-to-cart" onclick="quickAddToCart(${product.id})">Añadir al carrito</button>
                <button onclick="showProduct(${product.id})" class="view-details">Ver detalles</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Filtro por categoría
function filterCategory(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    
    // Buscar el botón correcto y activarlo
    const buttons = document.querySelectorAll('.filter-btn');
    for (let btn of buttons) {
        if ((category === 'all' && btn.textContent === 'Todos') || 
            btn.getAttribute('onclick').includes(`'${category}'`)) {
            btn.classList.add('active');
            break;
        }
    }
    
    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

// Mostrar modal
function showProduct(id) {
    currentProduct = products.find(p => p.id === id);
    if (!currentProduct) return;
    
    document.getElementById('modal-title').textContent = currentProduct.name;
    document.getElementById('modal-image').src = currentProduct.img;
    document.getElementById('modal-price').textContent = `$${currentProduct.price}`;
    document.getElementById('modal-desc').textContent = currentProduct.desc;
    document.getElementById('product-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

// Añadir desde modal
function addCurrentToCart() {
    if (!currentProduct) return;
    cart.push({...currentProduct});
    updateCart();
    closeModal();
    showToast();
}

// Añadir rápido
function quickAddToCart(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        cart.push({...product});
        updateCart();
        showToast();
    }
}

// Actualizar carrito
function updateCart() {
    document.getElementById('cart-count').textContent = cart.length;
    
    const itemsContainer = document.getElementById('cart-items');
    itemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price}</p>
                <button onclick="removeFromCart(${index})" class="remove-btn">Eliminar</button>
            </div>
        `;
        itemsContainer.appendChild(div);
    });
    
    document.getElementById('cart-total').textContent = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('open');
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 2000);
}

function checkout() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }
    alert(`¡Compra realizada exitosamente! 🎉\nTotal: $${document.getElementById('cart-total').textContent}`);
    cart = [];
    updateCart();
    toggleCart();
}

function toggleWishlist() {
    alert("❤️ Wishlist (en la versión completa se guardaría con localStorage)");
}

// Inicializar
window.onload = function() {
    renderProducts(products);
};