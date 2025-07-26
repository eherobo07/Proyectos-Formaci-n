// Definir productos como objetos
const products = [
    { category: "Electrónica", name: "Portátil HP", price: 800 },
    { category: "Electrónica", name: "Portátil Lenovo", price: 450 },
    { category: "Ropa", name: "Chaqueta cuero premium", price: 150 },
    { category: "Ropa", name: "Chaqueta vaquera", price: 55 },
    { category: "Libros", name: "La llamada de Cthulhu", price: 20 },
    { category: "Libros", name: "Guía JavaScript", price: 30 }
];

// Inicializar carrito
let cart = [];
let total = 0;

// Función para renderizar productos en la tabla
function renderProducts() {
    const productTable = document.getElementById("product-list");
    products.forEach((product, index) => {
        const row = document.createElement("tr");

        // Crear columnas para la categoría, nombre y precio
        Object.values(product).forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        // Botón para añadir al carrito
        const buttonCell = document.createElement("td");
        const button = document.createElement("button");
        button.textContent = "Comprar";
        button.addEventListener("click", () => addToCart(product));
        buttonCell.appendChild(button);
        row.appendChild(buttonCell);

        productTable.appendChild(row);
    });
}

// Añadir producto al carrito
function addToCart(product) {
    cart.push(product);
    total += product.price;
    updateCart();
}

// Actualizar contenido del carrito
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = ""; // Limpiar contenido del carrito

    cart.forEach(item => {
        const itemElement = document.createElement("p");
        itemElement.textContent = `${item.name} - €${item.price.toFixed(2)}`;
        cartItems.appendChild(itemElement);
    });

    // Actualizar total
    const totalElement = document.querySelector("#cart-content p strong");
    totalElement.textContent = `Total: €${total.toFixed(2)}`;
}

// Aplicar descuento basado en el código ingresado
function applyDiscount() {
    const discountCode = document.getElementById("discount-code").value.toUpperCase();
    let discount = 0;

    if (discountCode === "CINCO") {
        discount = 0.05;
    } else if (discountCode === "VEINTE") {
        discount = 0.20;
    } else if (discountCode === "MITAD") {
        discount = 0.50;
    }

    if (discount > 0) {
        const discountedTotal = total * (1 - discount);
        alert(`Código aceptado, obtienes un ${(discount * 100).toFixed(0)}% de descuento.`);
        
        // Actualizar total con descuento
        total = discountedTotal; // Actualizar la variable `total`
        updateCart(); // Llamar a updateCart para reflejar el nuevo total
    } else {
        alert("Código inválido. Intenta nuevamente.");
    }
}

// Configurar botones de interacción --> OJO, EL RESIZE PARECE NO FUNCIONAR CON TODOS LOS NAVEGADORES
function setupInteractions() {
    const smallWindowButton = document.getElementById("small-window");
    smallWindowButton.addEventListener("click", () => {
        if (confirm("¿Cambiar el tamaño de la ventana a 800x600?")) {
            window.resizeTo(800, 600);
            alert("Tamaño cambiado a 800x600.");
        }
    });

    const largeWindowButton = document.getElementById("large-window");
    largeWindowButton.addEventListener("click", () => {
        if (confirm("¿Cambiar el tamaño de la ventana a pantalla completa?")) {
            window.resizeTo(window.screen.availWidth, window.screen.availHeight);
            alert("Ventana en pantalla completa.");
        }
    });

    const discountButton = document.getElementById("apply-discount");
    discountButton.addEventListener("click", applyDiscount);
}

// Inicializar página
function initializePage() {
    renderProducts();
    setupInteractions();
}

document.addEventListener("DOMContentLoaded", initializePage);
