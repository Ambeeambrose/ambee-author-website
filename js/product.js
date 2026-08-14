// =====================================================
// AMBEE AMBROSE WEBSITE
// DIRECT BOOK PRODUCT PAGE LOADER
// =====================================================

document.addEventListener("DOMContentLoaded", async () => {

    const productTitle = document.getElementById("productTitle");

    // Do nothing if this is not a product page.
    if (!productTitle) {
        return;
    }

    try {

        // Load bookstore data
        const response = await fetch("data/bookstore.json");

        if (!response.ok) {
            throw new Error("Unable to load bookstore.json");
        }

        const data = await response.json();

        // Find the product page matching the current page
        const currentPage = window.location.pathname.split("/").pop();

        const book = data.bookstore.find(item =>
            item.productPage === currentPage
        );

        if (!book) {
            throw new Error("Product not found in bookstore.json");
        }

        // Update title
        productTitle.textContent = book.title;

        // Update cover
        const productCover = document.getElementById("productCover");

        if (productCover) {
            productCover.src = book.cover;
            productCover.alt = book.title;
        }

        // Update full description
        const productDescription =
            document.getElementById("productDescription");

        if (productDescription) {

            productDescription.innerHTML = `
                <h3>Book Description</h3>

                <div class="product-full-description">
                    ${book.fullDescription}
                </div>
            `;
        }

        // Update guide details
        const productDetails =
            document.getElementById("productDetails");

        if (productDetails) {

            const formats = Array.isArray(book.formats)
                ? book.formats.join(" • ")
                : book.formats;

            productDetails.innerHTML = `
                <h3>Guide Details</h3>

                <p>
                    <strong>Genre:</strong>
                    ${book.genre}
                </p>

                <p>
                    <strong>Available Formats:</strong>
                    ${formats}
                </p>

                <p>
                    <strong>Price:</strong>
                    ${book.price}
                </p>

                <a href="checkout.html?product=${encodeURIComponent(book.productPage)}" class="btn">
                    🛒 Buy Now
                </a>
            `;
        }

    } catch (error) {

        console.error("Unable to load product:", error);

    }

});