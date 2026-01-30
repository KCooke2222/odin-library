let myLibrary = [
  new Book("1984", "George Orwell", 328, true),
  new Book("The Hobbit", "J.R.R. Tolkien", 310, false),
  new Book("Dune", "Frank Herbert", 412, true),
];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  const readStatus = this.read ? "read" : "not read yet";
  return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
};

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function removeBookById(id) {
  myLibrary = myLibrary.filter((book) => book.id !== id);
}

function getBookById(id) {
  return myLibrary.find((book) => book.id === id);
}

function displayBooks() {
  bookshelf.textContent = ""; // clear old renders
  for (const book of myLibrary) {
    const bookDisplay = document.createElement("div");
    bookDisplay.className = "book";
    bookDisplay.dataset.id = book.id;

    // info
    ["title", "author", "pages"].forEach((key) => {
      const p = document.createElement("p");
      p.textContent = book[key];
      bookDisplay.appendChild(p);
    });

    // read
    const p = document.createElement("p");
    p.classList.add(book.read ? "read" : "not-read");
    p.textContent = book["read"] ? "Read" : "Not read";
    bookDisplay.appendChild(p);
    p.addEventListener("click", (e) => {
      const bookDiv = e.target.closest(".book");
      if (!bookDiv) return;

      let book = getBookById(bookDiv.dataset.id);
      book.toggleRead();

      displayBooks();
    });

    // del button
    const delBook = document.createElement("button");
    delBook.textContent = "Delete";
    bookDisplay.appendChild(delBook);
    delBook.addEventListener("click", (e) => {
      const bookDiv = e.target.closest(".book");
      if (!bookDiv) return;

      removeBookById(bookDiv.dataset.id);
      displayBooks();
    });

    bookshelf.appendChild(bookDisplay);
  }
}

const bookshelf = document.querySelector(".bookshelf");

const dialog = document.querySelector("#bookDialog");
const form = document.querySelector("#bookForm");
const newBookBtn = document.querySelector("#newBookBtn");
const cancelBtn = document.querySelector("#cancelBtn");

newBookBtn.addEventListener("click", () => dialog.showModal());
cancelBtn.addEventListener("click", () => dialog.close());

form.addEventListener("submit", (e) => {
  e.preventDefault(); // stops page refresh / “sending”
  const data = new FormData(form); // grabs inputs by name="..."

  addBookToLibrary(
    data.get("title"),
    data.get("author"),
    Number(data.get("pages")),
    data.get("read") === "on",
  );

  displayBooks();
  form.reset();
  dialog.close();
});

displayBooks();
