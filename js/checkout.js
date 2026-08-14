// =====================================================
// AMBEE AMBROSE WEBSITE
// SECURE CHECKOUT PRODUCT LOADER
// =====================================================

document.addEventListener("DOMContentLoaded", async () => {

    // Get the product identifier from the URL
    const params = new URLSearchParams(window.location.search);
    const productPage = params.get("product");

    // Do nothing if no product was provided.
    if (!productPage) {
        console.error("No product specified for checkout.");
        return;
    }

    try {

        // Load bookstore data
        const response = await fetch("data/bookstore.json");

        if (!response.ok) {
            throw new Error("Unable to load bookstore.json");
        }

        const data = await response.json();

        // Find the selected book
        const book = data.bookstore.find(item =>
            item.productPage === productPage
        );

        if (!book) {
            throw new Error("Checkout product not found.");
        }

        // Update checkout cover
        const checkoutCover =
            document.getElementById("checkoutCover");

        if (checkoutCover) {
            checkoutCover.src = book.cover;
            checkoutCover.alt = book.title;
        }

        // Update checkout title
        const checkoutTitle =
            document.getElementById("checkoutTitle");

        if (checkoutTitle) {
            checkoutTitle.textContent = book.title;
        }

        // Update checkout price
        const checkoutPrice =
            document.getElementById("checkoutPrice");

        if (checkoutPrice) {
            checkoutPrice.textContent = `Price: ${book.price}`;
        }

        // Add book information to the form submission
        const checkoutBookTitle =
         document.getElementById("checkoutBookTitle");

         if (checkoutBookTitle) {
         checkoutBookTitle.value = book.title;
        }

        const checkoutBookPrice =
        document.getElementById("checkoutBookPrice");

         if (checkoutBookPrice) {
         checkoutBookPrice.value = book.price;
        }

    } catch (error) {

        console.error("Unable to load checkout product:", error);

    }

});