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

        // Load books from books.json
        const response = await fetch("data/books.json");

        if (!response.ok) {
            throw new Error("Unable to load books.json");
        }

        const data = await response.json();

        // Clear the existing book cards
        booksGrid.innerHTML = "";

        // Create a card for every book
        data.books.forEach(book => {

            booksGrid.innerHTML += `
                <div class="book-card">

                    <img src="${book.cover}" alt="${book.title}">

                    <p>${book.description}</p>

                    <a href="${book.learnMore}" class="btn">
                        ${book.buttonText || "Learn More"}
                    </a>

                    <a href="${book.amazon}"
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