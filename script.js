// Store all book objects
const myLibrary = [];
const grid = document.querySelector('.grid');
let bookCount = 0;

const formBook = document.querySelector('#formBook');
formBook.addEventListener('submit', (e) => {
  e.preventDefault();
  addBookToLibrary(getNewBook());
  displayLibrary();
});

const btnRecordNewBook = document.querySelector('#btnRecordNewBook');
btnRecordNewBook.addEventListener('click', () => {
  formBook.classList.toggle('book-form--hidden');
});

// Constructor function for book objects
function Book(cover, name, author, numOfPages, hasBeenRead) {
  bookCount += 1;
  this.id = bookCount;
  this.cover = cover;
  this.name = name;
  this.author = author;
  this.numOfPages = numOfPages;
  this.hasBeenRead = hasBeenRead; // this has to be a function
}

Book.prototype.checkHasBeenRead = (e, book) => {
  console.log(e.target.checked);
  if (e.target.checked) {
    book.hasBeenRead = true; // eslint-disable-line no-param-reassign
  } else {
    book.hasBeenRead = false; // eslint-disable-line no-param-reassign
  }
  console.log(book);
};

// Create a function that checks if book has been read

// Add passed book object to library array
function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBook(book) {
  const gridBook = document.createElement('div');
  gridBook.classList.add('book');

  const bookId = document.createElement('p');
  bookId.classList.add('book__id');
  bookId.textContent = book.id;

  const bookCover = document.createElement('img');
  bookCover.setAttribute('class', 'book__cover');
  bookCover.src = book.cover;

  const bookName = document.createElement('h2');
  bookName.setAttribute('class', 'book__name');
  bookName.textContent = book.name;

  const bookRemove = document.createElement('button');
  bookRemove.setAttribute('class', 'btn book__remove');
  bookRemove.textContent = 'Delete Book';

  const bookHasBeenRead = document.createElement('input');
  bookHasBeenRead.setAttribute('type', 'checkbox');
  bookHasBeenRead.setAttribute('class', 'book__has-been-read');
  bookHasBeenRead.setAttribute('id', 'bookHasBeenRead');

  // Try to turn this into a constructor function
  bookHasBeenRead.addEventListener('click', (e) => {
    book.checkHasBeenRead(e, book);
  });

  gridBook.appendChild(bookId);
  gridBook.appendChild(bookCover);
  gridBook.appendChild(bookName);
  gridBook.appendChild(bookRemove);
  gridBook.appendChild(bookHasBeenRead);

  // Check if any of the books' name in the grid matches with any of the books in myLibrary array
  const gridBookIds = grid.querySelectorAll('.book__id');
  const gridBookIdsArray = [...gridBookIds];

  const doesBookExist = gridBookIdsArray.some(
    (id) => parseInt(id.textContent, 10) === book.id,
  );
  // Create an if statement that checks if atleast one element in the array already has the same book name
  if (!doesBookExist) grid.appendChild(gridBook);
}

function displayLibrary() {
  myLibrary.forEach((book) => displayBook(book));
}

// Takes new book from form and store as an object
function getNewBook() {
  const formCoverUrl = document.querySelector('#formCoverURL');
  const formName = document.querySelector('#formName');
  const formAuthor = document.querySelector('#formAuthor');
  const formNumOfPages = document.querySelector('#formNumOfPages');
  const formHasRead = document.querySelector('#formHasRead');
  const book = new Book(
    formCoverUrl.value,
    formName.value,
    formAuthor.value,
    formNumOfPages.value,
    formHasRead.value,
  );
  return book;
}

const theLightningThief = new Book(
  '/images/the-lightning-thief.png',
  'The Lightning Thief',
  'Rick Riordan',
  '300 pages',
  'Finished',
);

const theSeaOfMonsters = new Book(
  '/images/the-sea-of-monsters.png',
  'The Sea of Monsters',
  'Rick Riordan',
  '300 pages',
  'Finished',
);

addBookToLibrary(theLightningThief);
addBookToLibrary(theSeaOfMonsters);
displayLibrary();
