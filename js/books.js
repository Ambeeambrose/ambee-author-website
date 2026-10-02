// =====================================================
// AMBEE AMBROSE WEBSITE
// AMAZON BOOKS LOADER
// =====================================================

document.addEventListener("DOMContentLoaded", async () => {

    const booksGrid = document.getElementById("booksGrid");

    // Do nothing if this page does not contain the books grid.
    if (!booksGrid) {
        return;
    }

    try {

        // Load the book index
        const response = await fetch("data/books.json");

        if (!response.ok) {
            throw new Error("Unable to load books.json");
        }

        const data = await response.json();

        // Load every individual book record
        const bookPromises = data.books.map(async (book) => {

            const bookResponse = await fetch(`data/books/${book.slug}.json`);

            if (!bookResponse.ok) {
                throw new Error(`Unable to load ${book.slug}.json`);
            }

            return await bookResponse.json();
        });

        const books = await Promise.all(bookPromises);

        // Clear the existing book cards
        booksGrid.innerHTML = "";

        // Create a card for every book
        books.forEach(book => {

            booksGrid.innerHTML += `
                <div class="book-card">

                    <img src="${book.cover}" alt="${book.title}">

                    <p>${book.description}</p>

                    <a href="${book.learnMore}" class="btn">
                        ${book.buttonText || "Learn More"}
                    </a>

                    <a href="${book.amazon_link}"
                       class="btn buy-btn"
                       target="_blank"
                       rel="noopener noreferrer">
                        Buy on Amazon
                    </a>

                </div>
            `;

        });

    } catch (error) {

        console.error("Unable to load books:", error);

        booksGrid.innerHTML = `
            <p class="books-error">
                Unable to load books at this time.
            </p>
        `;
    }

});