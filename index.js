document.addEventListener("DOMContentLoaded", () => {
    let cart = [];
    
    // Load glasses from db.json
    fetch("db.json")
        .then(response => response.json())
        .then(data => {
            const summerGlasses = document.getElementById("summer-glasses");
            const winterGlasses = document.getElementById("winter-glasses");

            data.glasses.forEach(glass => {
                const glassDiv = document.createElement("div");
                glassDiv.classList.add("glass-item");
                glassDiv.innerHTML = `
                    <img src="${glass.image}" alt="${glass.name}">
                    <h3>${glass.name}</h3>
                    <p>Price: $${glass.price}</p>
                    <button class="add-to-cart" data-id="${glass.id}">Add to Cart</button>
                `;
                if (glass.season === "summer") {
                    summerGlasses.appendChild(glassDiv);
                } else {
                    winterGlasses.appendChild(glassDiv);
                }
            });
        });

    // Add event listener for adding items to cart
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("add-to-cart")) {
            const glassId = event.target.getAttribute("data-id");
            addToCart(glassId);
        }
    });

    // Add event listener for clearing cart
    document.getElementById("clear-cart").addEventListener("click", () => {
        cart = [];
        updateCart();
    });

    // Function to add items to cart
    function addToCart(glassId) {
        fetch("db.json")
            .then(response => response.json())
            .then(data => {
                const selectedGlass = data.glasses.find(glass => glass.id == glassId);
                if (selectedGlass) {
                    cart.push(selectedGlass);
                    updateCart();
                }
            });
    }

    // Function to update cart display
    function updateCart() {
        const cartItems = document.getElementById("cart-items");
        const cartTotal = document.getElementById("cart-total");
        cartItems.innerHTML = "";

        let total = 0;
        cart.forEach(item => {
            total += item.price;
            const li = document.createElement("li");
            li.textContent = `${item.name} - $${item.price}`;
            cartItems.appendChild(li);
        });

        cartTotal.textContent = total.toFixed(2);
    }
});
