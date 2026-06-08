document.getElementById("navbar-container").innerHTML = `
    <nav class="navbar">

        <a href="index.html">Home</a>

        <a href="about-us.html">About Us</a>

        <a href="contact.html">Contact</a>

        <input
            id="searchInput1"
            type="text"
            placeholder="Search...">

        <button
            id="submitBtn1"
            type="button">

            Search

        </button>

        <button
            id="clearBtn1"
            type="button">

            Clear

        </button>

    </nav>
`;

const button1 = document.getElementById("submitBtn1");
const buttonClear1 = document.getElementById("clearBtn1");

button1.addEventListener("click", searchRecommendation);

function searchRecommendation() {

    const query = document
        .getElementById("searchInput1")
        .value
        .trim()
        .toLowerCase();

    if (!query) {
        alert("Please enter a search term.");
        return;
    }

    fetch("data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Unable to load recommendations.");
            }
            return response.json();
        })

        .then(data => {

            // Beaches
            if (
                query === "beach" ||
                query === "beaches" ||
                query === "playa" ||
                query === "playas"
            ) {
                displayResults(data.beaches);
                return;
            }

            // Temples
            if (
                query === "temple" ||
                query === "temples" ||
                query === "templo" ||
                query === "templos"
            ) {
                displayResults(data.temples);
                return;
            }

            // Countries
            if (
                query === "country" ||
                query === "countries" ||
                query === "pais" ||
                query === "paises"
            ) {
                let cities = [];
                data.countries.forEach(country => {
                    cities.push(...country.cities);
                });
                displayResults(cities);
                return;
            }

            const country = data.countries.find(country =>
                country.name.toLowerCase() === query
            );

            if (country) {
                displayResults(country.cities);
            } else {
                showNoResults();
            }
        })
        .catch(error => {
            console.error(error);
            alert("Something went wrong.");
        });

}

function displayResults(items) {

    const results = document.getElementById("results");

    results.innerHTML = "";
    items.forEach(item => {
        results.innerHTML += `
            <div class="card">
                <img
                    src="${item.imageUrl}"
                    alt="${item.name}">

                <div class="card-info">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <button>
                        Visit
                    </button>
                </div>
            </div>
        `;
    });

}

function showNoResults() {

    document.getElementById("results").innerHTML = `
        <div class="card">
            <div class="card-info">
                <p>No recommendations found.</p>
            </div>
        </div>
    `;
}

buttonClear1.addEventListener("click", function () {

    document.getElementById("searchInput1").value = "";
    const results = document.getElementById("results");

    if (results) {
        results.innerHTML = "";
    }
});

// CONTACT PAGE

const button2 = document.getElementById("submitBtn2");

if (button2) {
    button2.addEventListener("click", function () {
        const name = document
            .getElementById("nameInput")
            .value
            .trim();
        const email = document
            .getElementById("emailInput")
            .value
            .trim();
        const message = document
            .getElementById("messageInput")
            .value
            .trim();
        if (!name) {
            alert("Please enter your name.");
            return;
        }

        if (!email) {
            alert("Please enter your email.");
            return;
        }

        if (!message) {
            alert("Please enter your message.");
            return;
        }
        alert(`Thank you, ${name}! Your message has been sent.`);

        document.getElementById("nameInput").value = "";
        document.getElementById("emailInput").value = "";
        document.getElementById("messageInput").value = "";
    });

}