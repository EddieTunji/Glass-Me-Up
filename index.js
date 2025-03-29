document.addEventListener("DOMContentLoaded", () => {
    fetchGlasses(); // Fetch glasses data when the page loads
});

// Fetch data from db.json
function fetchGlasses() {
    fetch("http://localhost:3000/glasses")  // Change if using an API
        .then(response => response.json())
        .then(data => {
            displayGlasses(data);
        })
        .catch(error => console.error("Error fetching glasses:", error));
}

// Display glasses on the page
function displayGlasses(glasses) {
    const summerContainer = document.getElementById("summer-glasses");
    const winterContainer = document.getElementById("winter-glasses");

    summerContainer.innerHTML = "";
    winterContainer.innerHTML = "";

    glasses.forEach(glass => {
        const glassDiv = document.createElement("div");
        glassDiv.classList.add("glass-item");
        glassDiv.innerHTML = `
            <img src="${glass.image}" alt="${glass.name}">
            <h3>${glass.name}</h3>
            <p>$${glass.price}</p>
            <button class="add-to-cart" data-id="${glass.id}">Add to Cart</button>
        `;

        if (glass.season === "summer") {
            summerContainer.appendChild(glassDiv);
        } else {
            winterContainer.appendChild(glassDiv);
        }
    });

    addCartEventListeners(); // Attach event listeners after displaying items
}

// 1️⃣ Event Listener for adding to cart
function addCartEventListeners() {
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", event => {
            const id = event.target.dataset.id;
            addToCart(id);
        });
    });
}

function addToCart(id) {
    fetch(`http://localhost:3000/glasses/${id}`)
        .then(response => response.json())
        .then(glass => {
            updateCart(glass);
        })
        .catch(error => console.error("Error adding to cart:", error));
}

function updateCart(glass) {
    const cartContainer = document.getElementById("cart-items");
    const cartItem = document.createElement("div");
    cartItem.innerHTML = `<p>${glass.name} - $${glass.price}</p>`;
    cartContainer.appendChild(cartItem);
}

// 2️⃣ Event Listener for search functionality
document.getElementById("search").addEventListener("input", event => {
    const query = event.target.value.toLowerCase();
    fetch("http://localhost:3000/glasses")
        .then(response => response.json())
        .then(data => {
            const filtered = data.filter(glass => glass.name.toLowerCase().includes(query));
            displayGlasses(filtered);
        });
});

// 3️⃣ Event Listener for filtering by season
document.getElementById("filter").addEventListener("change", event => {
    const season = event.target.value;
    fetch("http://localhost:3000/glasses")
        .then(response => response.json())
        .then(data => {
            const filtered = season === "all" ? data : data.filter(glass => glass.season === season);
            displayGlasses(filtered);
        });
});
