const books = [];

function addBook() {
  const titleBooks = document.getElementById("inputBookTitle").value;
  const authorBooks = document.getElementById("inputBookAuthor").value;
  const yearBooks = document.getElementById("inputBookYear").value;
  const completeBooks = document.querySelector("#inputBookIsComplete").checked;

  const generatedID = generateId();
  const bookObject = generateBookObject(generatedID, titleBooks, authorBooks, yearBooks, completeBooks);
  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));

  saveData();
}

function clear() {
  const titleBooks = document.getElementById("inputBookTitle");
  const authorBooks = document.getElementById("inputBookAuthor");
  const yearBooks = document.getElementById("inputBookYear");
  const completeBooks = document.querySelector("#inputBookIsComplete");

  titleBooks.value = "";
  authorBooks.value = "";
  yearBooks.value = "";
  completeBooks.value = false;
}

function makeBook(bookObject) {
  const textTitle = document.createElement("h3");
  textTitle.innerText = bookObject.title;

  const textAuthor = document.createElement("p");
  textAuthor.innerText = "Penulis : " + bookObject.author;

  const textYear = document.createElement("p");
  textYear.innerText = "Tahun Terbit : " + bookObject.year;

  const textContainer = document.createElement("article");
  textContainer.classList.add("book_item");
  textContainer.append(textTitle, textAuthor, textYear);
  textContainer.setAttribute("id", `book-${bookObject.id}`);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("action");

  const isNotCompletedButton = document.createElement("button");
  isNotCompletedButton.classList.add("undo");

  const CompletedButton = document.createElement("button");
  CompletedButton.classList.add("success");

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("danger");
  deleteButton.innerText = "Hapus";

  deleteButton.addEventListener("click", function () {
    const message = confirm("Apakah yakin ingin menghapus Buku?");
    if (message) {
      removeBookFromRead(bookObject.id);
    }
  });

  if (bookObject.isComplete) {
    isNotCompletedButton.innerText = "Belum selesai";
    isNotCompletedButton.addEventListener("click", function () {
      undoBookFromRead(bookObject.id);
    });

    buttonContainer.append(isNotCompletedButton, deleteButton);
    textContainer.append(buttonContainer);
  } else {
    CompletedButton.innerText = "Selesai";
    CompletedButton.addEventListener("click", function () {
      addBookToRead(bookObject.id);
    });

    buttonContainer.append(CompletedButton, deleteButton);
    textContainer.append(buttonContainer);
  }

  return textContainer;
}

function addBookToRead(bookid) {
  const bookTarget = findBook(bookid);

  if (bookTarget == null) return;

  bookTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  alert("Buku Selesai di Baca");
  saveData();
}

function findBook(bookid) {
  for (const book of books) {
    if (book.id === bookid) {
      return book;
    }
  }
  return null;
}

function removeBookFromRead(bookid) {
  const bookTarget = findBookIndex(bookid);

  if (bookTarget === -1) return;

  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));

  saveData();
}

function undoBookFromRead(bookid) {
  const bookTarget = findBook(bookid);

  if (bookTarget == null) return;

  bookTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  alert("Buku Belum Selesai di Baca");
  saveData();
}

function findBookIndex(bookid) {
  for (const index in books) {
    if (books[index].id === bookid) {
      return index;
    }
  }

  return -1;
}

function searchBook() {
  const searchInput = document.getElementById("searchBookTitle").value.toLowerCase();

  for (i = 0; i < books.length; i++) {
    const inner = books[i].title;
    const bookIdElement = document.getElementById(`book-${books[i].id}`);

    if (inner.toLowerCase().indexOf(searchInput) > -1) {
      bookIdElement.style.display = "";
    } else {
      bookIdElement.style.display = "none";
    }
  }
}
