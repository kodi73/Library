const myLibrary = [];
const libraryContainer = document.getElementById("library-container");


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

// dummy
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);

function displayBooks() {
    libraryContainer.innerHTML = "";

    myLibrary.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";
        card.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.read ? "Yes" : "No"}</p?
        `;
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
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").value;

    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);

    displayBooks();
    this.reset();
    document.querySelector("#bookDialog").close();
})
displayBooks()