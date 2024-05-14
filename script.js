const myLibrary = [];
const bookContainer = document.querySelector('.book-container');
const bookForm = document.querySelector('.book-form');

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
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
    bookItem.style.border = '1px solid'
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

function toggleReadStatus(e){
  const button = e.target
  const buttonText = button.textContent.trim();
  button.classList.toggle('not-read')
  button.classList.toggle('read')

}


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
}





const harryPotter = new Book('Harry Potter', 'JK Rowling', 343, false);
const bigNate = new Book('Big Nate', 'Altay Hodo', 123, true);
const smallNate = new Book('Small Nate', 'Hodo Altay', 122, true);
addBookToLibrary(harryPotter);
addBookToLibrary(bigNate);
addBookToLibrary(smallNate);
updateBookDisplay();