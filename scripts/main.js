class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();
    }

    toggleRead() {
        this.read = !this.read;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(id) {
        this.books = this.books.filter(book => book.id !== id);
    }
}

const library = new Library();
const libraryContainer = document.querySelector("#library-container")

library.addBook(new Book("The Hobbit", "J.R.R. Tolkien", 310, true));
library.addBook(new Book("1984", "George Orwell", 328, false));

function displayBooks(books) {
    libraryContainer.innerHTML = "";

    books.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";

        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = `Author: ${book.author}`;

        const pages = document.createElement("p");
        pages.textContent = `Pages: ${book.pages}`;

        const read = document.createElement("p");
        read.textContent = `Read: ${book.read ? "Yes" : "No"}`;

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Toggle Read";

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";

        // ===== EVENT WIRING =====

        toggleBtn.addEventListener("click", () => {
            book.toggleRead();
            displayBooks(library.books);
        });

        removeBtn.addEventListener("click", () => {
            library.removeBook(book.id);
            displayBooks(library.books);
        });

        card.append(title, author, pages, read, toggleBtn, removeBtn);
        libraryContainer.appendChild(card);
    })
}

document.querySelector("#newBookBtn").addEventListener("click", () => {
    document.querySelector("#bookDialog").showModal();
});

document.querySelector("#closeDialog").addEventListener("click", () => {
    document.querySelector("#bookDialog").close();
})

document.querySelector("#bookForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = Number(document.querySelector("#pages").value);
    const read = document.querySelector("#read").checked;

    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);

    displayBooks();
    this.reset();
    document.querySelector("#bookDialog").close();
})

libraryContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains("removeBtn")) {
        const bookId = event.target.dataset.id;
        removeBook(bookId);
    }

    if (event.target.classList.contains("toggleBtn")) {
        const bookId = event.target.dataset.id;
        toggleReadStatus(bookId);
    }
})


displayBooks(library.books);