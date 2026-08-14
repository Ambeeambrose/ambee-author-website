// =====================================================
// AMBEE AMBROSE WEBSITE
// DIRECT BOOKSTORE LOADER
// =====================================================

document.addEventListener("DOMContentLoaded", async () => {

    const bookstoreGrid = document.querySelector(".buy-direct-grid");

    // Do nothing if this page does not contain the bookstore grid.
    if (!bookstoreGrid) {
        return;
    }

    try {

        // Load bookstore data from bookstore.json
        const response = await fetch("data/bookstore.json");

        if (!response.ok) {
            throw new Error("Unable to load bookstore.json");
        }

        const data = await response.json();

        // Clear the existing bookstore cards
        bookstoreGrid.innerHTML = "";

        // Create a card for every direct-sale book
        data.bookstore.forEach(book => {

            bookstoreGrid.innerHTML += `
                <div class="buy-direct-card">

                    <img src="${book.cover}"
                         alt="${book.title}"
                         class="buy-direct-cover">

                    <p class="buy-direct-description">
                        ${book.shortDescription}
                    </p>

                    <p class="buy-direct-price">
                        <strong>${book.price}</strong>
                    </p>

                    <a href="${book.productPage}"
                       class="btn buy-direct-button">
                        Learn More
                    </a>

                </div>
            `;

        });

    } catch (error) {

        console.error("Unable to load bookstore:", error);

        bookstoreGrid.innerHTML = `
            <p class="books-error">
                Unable to load bookstore at this time.
            </p>
        `;
    }

});