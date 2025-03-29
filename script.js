document.addEventListener("DOMContentLoaded", () => {
    let allGlasses = []; // Store all glasses
    let cart = []; // Store cart items

    // Fetch glasses from db.json and display them
    fetch("db.json")
        .then(response => response.json())
        .then(data => {
            allGlasses = data.glasses;
            displayGlasses(allGlasses);
        });

    function displayGlasses(glasses) {
        const summerGlasses = document.getElementById("summer-glasses");
        const winterGlasses = document.getElementById("winter-glasses");

        summerGlasses.innerHTML = "";
        winterGlasses.innerHTML = "";

        glasses.forEach(glass => {
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
    }

    // Fix search functionality
    document.getElementById("search-input").addEventListener("input", (event) => {
        const searchText = event.target.value.toLowerCase();
        const filteredGlasses = allGlasses.filter(glass =>
            glass.name.toLowerCase().includes(searchText)
        );
        displayGlasses(filteredGlasses);
    });

    // Cart Functionality
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("add-to-cart")) {
            const glassId = parseInt(event.target.dataset.id);
            const glass = allGlasses.find(item => item.id === glassId);

            if (glass) {
                cart.push(glass);
                updateCartDisplay();
            }
        }
    });

    document.getElementById("checkout").addEventListener("click", () => {
        alert("Proceeding to checkout...");
    });

    function updateCartDisplay() {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = `${item.name} - $${item.price}`;
            cartItems.appendChild(li);
            total += item.price;
        });

        cartTotal.textContent = total.toFixed(2);
    }
});
