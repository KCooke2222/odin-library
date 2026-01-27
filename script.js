const myLibrary = [
  { title: "1984", author: "George Orwell", pages: 328, read: true },
  { title: "The Hobbit", author: "J.R.R. Tolkien", pages: 310, read: false },
  { title: "Dune", author: "Frank Herbert", pages: 412, read: true },
];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  const readStatus = this.read ? "read" : "not read yet";
  return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
};

function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function displayBooks() {
  for (book of myLibrary) {
    const bookDisplay = document.createElement("div");
    bookDisplay.className = "book";
    ["title", "author", "pages", "read"].forEach((key) => {
      const p = document.createElement("p");
      p.textContent = book[key];
      bookDisplay.appendChild(p);
    });

    bookshelf.appendChild(bookDisplay);
  }
}

const bookshelf = document.querySelector(".bookshelf");

displayBooks();
