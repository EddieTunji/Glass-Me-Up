document.addEventListener("DOMContentLoaded", function() {
    const glassesData = {
        "glasses": [
            {
                "id": 1,
                "name": "Urban Optics",
                "image": "https://atttpgdeen.cloudimg.io/cdn/n/n/https://masterdb.co.uk/mylux_images/ray-ban/rayban_0rb0316s_136748_grey_on_black_polarized.jpg",
                "price": 29.99,
                "season": "summer"
            },
            {
                "id": 2,
                "name": "Sunset Glaze",
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr8OmPUs5LUIB7CiPSYvVZGy8cEB7BxUcInw&s",
                "price": 34.99,
                "season": "summer"
            },
            {
                "id": 3,
                "name": "Vista Shades",
                "image": "https://images2.ray-ban.com//cdn-record-files-pi/34bad6ec-190a-4a40-987c-ad2500e14d02/0f66bc61-b98f-4dc5-9029-ad27017106c6/0RB3683__002_31__STD__shad__al2.png?impolicy=RB_Product_clone&width=700&bgc=%23f2f2f2",
                "price": 29.99,
                "season": "summer"
            },
            {
                "id": 4,
                "name": "Clear Horizon",
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB1_vnpZFjYOGchw4hhrIsJKZg15blI1ijSQ&s",
                "price": 34.99,
                "season": "summer"
            },
            {
                "id": 5,
                "name": "LuxeGlide",
                "image": "https://www.datocms-assets.com/45158/1696496417-sungod-ambassador-day-high-res-revelstoke-090322-photos-by-olly-hogan-oldxtrip-29.jpg?auto=format&fit=crop&w=1920&h=1080",
                "price": 39.99,
                "season": "winter"
            },
            {
                "id": 6,
                "name": "Zenyith Shades",
                "image": "https://ca.pitviper.com/cdn/shop/files/Untitleddesign_39_f076589b-e49c-4b64-baeb-95debf28cbdd.png?v=1738772296",
                "price": 44.99,
                "season": "winter"
            },
            {
                "id": 7,
                "name": "Bando Shades",
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtNQBY_g44k12OQzmR7oMwAlY5oaPp1tDdtQ&s",
                "price": 39.99,
                "season": "winter"
            },
            {
                "id": 8,
                "name": "Snow Vision",
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGofSbpNQ3oSrM4SzJxzYH6X_p6b5EmvOGQ&s",
                "price": 44.99,
                "season": "winter"
            }
        ]
    };

    function renderGlasses() {
        const summerContainer = document.getElementById("summer-glasses");
        const winterContainer = document.getElementById("winter-glasses");

        glassesData.glasses.forEach(glass => {
            const glassElement = document.createElement("div");
            glassElement.classList.add("glass-item");

            glassElement.innerHTML = `
            <img src="${glass.image}" alt="${glass.name}" />
            <h3>${glass.name}</h3>
            <p>$${glass.price.toFixed(2)}</p>
            <button>Add to Cart</button>
            `;

            if (glass.season === "summer") {
                summerContainer.appendChild(glassElement);
            } else {
                winterContainer.appendChild(glassElement);
            }
        });
    }

    renderGlasses();
});