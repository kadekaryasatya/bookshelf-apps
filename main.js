const RENDER_EVENT = "render-book";
const SAVED_EVENT = "books";

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");

  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
    alert("Berhasil Menambah Buku");

    clear();
  });

  const bookIsComplete = document.getElementById("inputBookIsComplete");
  const isRead = document.getElementById("isRead");
  isRead.innerText = "Belum selesai dibaca";

  bookIsComplete.addEventListener("click", function () {
    if (bookIsComplete.checked) {
      isRead.innerText = "Selesai dibaca";
    } else {
      isRead.innerText = "Belum selesai dibaca";
    }
  });

  const searchForm = document.getElementById("searchBook");
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    searchBook();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener(RENDER_EVENT, function () {
  const uncompletedBookList = document.getElementById("incompleteBookshelfList");
  uncompletedBookList.innerHTML = "";

  const completeBooksList = document.getElementById("completeBookshelfList");
  completeBooksList.innerHTML = "";

  for (const bookObject of books) {
    const bookElement = makeBook(bookObject);
    if (!bookObject.isComplete) {
      uncompletedBookList.append(bookElement);
    } else {
      completeBooksList.append(bookElement);
    }
  }
});

document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});
