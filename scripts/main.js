class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();
    }

    toggleRead = function () {
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
        card.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.read ? "Yes" : "No"}</p>
            <button class="toggleBtn" data-id="${book.id}">Toggle Status</button>
            <button class="removeBtn" data-id="${book.id}">❌</button>
        `;
        libraryContainer.appendChild(card);
    })
}

function removeBook(bookId) {
    const index = myLibrary.findIndex(book => book.id === bookId);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBooks();
    }
}

function toggleReadStatus(id) {
    const book = myLibrary.find(book => book.id === id);
    if (book) {
        book.toggleRead();
        displayBooks();
    }
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


displayBooks()