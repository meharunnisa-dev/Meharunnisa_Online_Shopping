// =====================================
// HERO IMAGE SLIDER
// =====================================

const slides = document.querySelectorAll(".hero-slider .slide");
const nextButton = document.getElementById("nextSlide");
const prevButton = document.getElementById("prevSlide");
const dotsContainer = document.getElementById("dots");

let currentSlide = 0;


// =====================================
// CREATE SLIDER DOTS
// =====================================

if (slides.length > 0 && dotsContainer) {

    slides.forEach(function(slide, index) {

        const dot = document.createElement("button");

        dot.classList.add("slider-dot");

        if (index === 0) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", function() {

            currentSlide = index;

            showSlide(currentSlide);

        });

        dotsContainer.appendChild(dot);

    });

}


// =====================================
// SHOW SLIDE
// =====================================

function showSlide(index) {

    if (slides.length === 0) {
        return;
    }

    slides.forEach(function(slide) {

        slide.classList.remove("active");

    });

    slides[index].classList.add("active");


    const dots = document.querySelectorAll(".slider-dot");

    dots.forEach(function(dot) {

        dot.classList.remove("active");

    });

    if (dots[index]) {

        dots[index].classList.add("active");

    }

}


// =====================================
// NEXT SLIDE
// =====================================

if (nextButton) {

    nextButton.addEventListener("click", function() {

        currentSlide++;

        if (currentSlide >= slides.length) {

            currentSlide = 0;

        }

        showSlide(currentSlide);

    });

}


// =====================================
// PREVIOUS SLIDE
// =====================================

if (prevButton) {

    prevButton.addEventListener("click", function() {

        currentSlide--;

        if (currentSlide < 0) {

            currentSlide = slides.length - 1;

        }

        showSlide(currentSlide);

    });

}


// =====================================
// AUTOMATIC SLIDER
// =====================================

if (slides.length > 0) {

    setInterval(function() {

        currentSlide++;

        if (currentSlide >= slides.length) {

            currentSlide = 0;

        }

        showSlide(currentSlide);

    }, 4000);

}


// =====================================
// SHOPPING CART
// =====================================

let cart = JSON.parse(
    localStorage.getItem("meharunnisaShoppingCart")
) || [];


// =====================================
// ADD TO CART
// =====================================

const addCartButtons =
    document.querySelectorAll(".add-cart");

addCartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const productName =
            button.getAttribute("data-product");

        const productPrice =
            Number(button.getAttribute("data-price"));


        const existingProduct = cart.find(function(item) {

            return item.name === productName;

        });


        if (existingProduct) {

            existingProduct.quantity += 1;

        } else {

            cart.push({

                name: productName,

                price: productPrice,

                quantity: 1

            });

        }


        localStorage.setItem(
            "meharunnisaShoppingCart",
            JSON.stringify(cart)
        );


        alert(productName + " added to cart!");


        updateCartCount();

    });

});


// =====================================
// CART COUNT
// =====================================

function updateCartCount() {

    const cartLinks =
        document.querySelectorAll(
            'a[href="cart.html"]'
        );

    let totalItems = 0;


    cart.forEach(function(item) {

        totalItems += Number(item.quantity) || 0;

    });


    cartLinks.forEach(function(link) {

        link.textContent =
            "🛒 Cart (" + totalItems + ")";

    });

}


updateCartCount();


// =====================================
// CATEGORY FILTER
// =====================================

const productCards =
    document.querySelectorAll(".product-card");


// Get category from URL
const urlParams =
    new URLSearchParams(window.location.search);

const selectedCategory =
    urlParams.get("category");


// Show selected category
if (selectedCategory && productCards.length > 0) {

    productCards.forEach(function(card) {

        const productCategory =
            card.getAttribute("data-category");


        if (
            productCategory &&
            productCategory.toLowerCase() ===
            selectedCategory.toLowerCase()
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


// =====================================
// PRODUCT SEARCH
// =====================================

const searchInput =
    document.getElementById("searchInput");


if (searchInput) {

    searchInput.addEventListener("input", function() {

        const searchText =
            searchInput.value.toLowerCase();


        const products =
            document.querySelectorAll(".product-card");


        products.forEach(function(product) {

            const productName =
                product.querySelector("h3")
                .textContent
                .toLowerCase();


            const productCategory =
                product.querySelector("p")
                .textContent
                .toLowerCase();


            if (
                productName.includes(searchText) ||
                productCategory.includes(searchText)
            ) {

                product.style.display = "block";

            } else {

                product.style.display = "none";

            }

        });

    });

}


// =====================================
// DISPLAY CART
// =====================================

const cartContainer =
    document.getElementById("cartContainer");

const cartTotal =
    document.getElementById("cartTotal");


if (cartContainer) {

    displayCart();

}


function displayCart() {

    cart =
        JSON.parse(
            localStorage.getItem("meharunnisaShoppingCart")
        ) || [];


    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">

                <h2>Your cart is empty 🛒</h2>

                <p>
                    Add some products to your cart.
                </p>

                <a
                    href="products.html"
                    class="shop-btn">

                    Continue Shopping

                </a>

            </div>
        `;

        cartTotal.innerHTML = "";

        return;

    }


    let total = 0;

    cartContainer.innerHTML = "";


    cart.forEach(function(item, index) {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        cartContainer.innerHTML += `
            <div class="cart-item">

                <div>

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        Price: ₹${item.price}
                    </p>

                    <p>
                        Quantity: ${item.quantity}
                    </p>

                </div>


                <div>

                    <strong>
                        ₹${itemTotal}
                    </strong>

                    <br>

                    <button
                        class="remove-cart"
                        onclick="removeFromCart(${index})">

                        Remove

                    </button>

                </div>

            </div>
        `;

    });


    cartTotal.innerHTML = `
        <div class="cart-summary">

            <h2>
                Total: ₹${total}
            </h2>

            <button
                class="clear-cart"
                onclick="clearCart()">

                Clear Cart

            </button>

            <button
                class="checkout-btn"
                onclick="checkout()">

                Checkout

            </button>

        </div>
    `;

}


// =====================================
// REMOVE ONE PRODUCT
// =====================================

function removeFromCart(index) {

    cart =
        JSON.parse(
            localStorage.getItem("meharunnisaShoppingCart")
        ) || [];


    cart.splice(index, 1);


    localStorage.setItem(
        "meharunnisaShoppingCart",
        JSON.stringify(cart)
    );


    displayCart();

    updateCartCount();

}


// =====================================
// CLEAR CART
// =====================================

function clearCart() {

    localStorage.removeItem("meharunnisaShoppingCart");

    cart = [];

    displayCart();

    updateCartCount();

}


// =====================================
// CHECKOUT
// =====================================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    window.location.href = "checkout.html";

}
// ================= CONTACT FORM =================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        const formResponse = document.getElementById("formResponse");


        if (name === "" ||
            email === "" ||
            subject === "" ||
            message === "") {

            formResponse.textContent =
                "Please fill in all the fields.";

            formResponse.className =
                "form-response error";

            return;
        }


        // Success response

        formResponse.textContent =
            "✓ Message sent successfully! Thank you for contacting Meharunnisa Online Shopping.";

        formResponse.className =
            "form-response success";


        // Clear the form

        contactForm.reset();

    });

}

