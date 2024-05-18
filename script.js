const myLibrary = [];
const bookContainer = document.querySelector('.book-container');
const bookForm = document.querySelector('.book-form');


class Book{
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  getInfo() {
    const readText = this.isRead ? 'read' : 'not read yet';
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readText}`;
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function updateBookDisplay() {
  bookContainer.innerHTML = '';
  myLibrary.forEach((book, index) => {
    const bookItem = document.createElement('div');
    let readButtonText = '';
    let readButtonClass = '';
    book.isRead ? readButtonText = 'Read' : readButtonText = 'Not read';
    book.isRead ? readButtonClass = 'read' : readButtonClass = 'not-read';

    bookItem.innerHTML =
      `
      <div class="title"> ${book.title} </div>
      <div class="author"> ${book.author} </div>
      <div class="pages"> ${book.pages} pages </div>
      <button class="read-button ${readButtonClass}"> ${readButtonText} </button>
      <button class="remove-button" data-index="${index}"> Remove </button>
    `;
    bookItem.classList.add('book-item');
    bookContainer.appendChild(bookItem);
  });

  const removeButtons = document.querySelectorAll('.remove-button');
  removeButtons.forEach(button => {
    button.addEventListener('click', removeBook);
  });

  const readButtons = document.querySelectorAll('.read-button');
  readButtons.forEach(button => {
    button.addEventListener('click', toggleReadStatus)
  });
}

function removeBook(e) {
  const index = e.target.dataset.index;
  myLibrary.splice(index, 1);
  updateBookDisplay();
}

function toggleReadStatus(e) {
  const button = e.target
  const buttonText = button.textContent.trim();
  if (buttonText == 'Not read') {
    button.textContent = 'Read';
  } else {
    button.textContent = 'Not read';
  }
  button.classList.toggle('not-read')
  button.classList.toggle('read')

}

const dialog = document.querySelector('.form-dialog');


bookForm.addEventListener('submit', addNewBook);
function addNewBook(e) {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const isRead = document.querySelector('#isRead').checked;
  const newBook = new Book(title, author, pages, isRead);
  addBookToLibrary(newBook);
  updateBookDisplay();
  bookForm.reset();
  dialog.close();

}

const addBookButton = document.querySelector('.add-book-button');
addBookButton.addEventListener('click', showDialog)

function showDialog() {
  dialog.showModal();
}

dialog.addEventListener("click", e => {
  const dialogDimensions = dialog.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.close();
    bookForm.reset();
  }
})




