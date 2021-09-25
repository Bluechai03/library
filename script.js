// Store all book objects
const myLibrary = [];
const grid = document.querySelector('.grid');
let bookCountId = 0;

const formBook = document.querySelector('#formBook');
formBook.addEventListener('submit', (e) => {
  e.preventDefault();
  addBookToLibrary(getNewBook());
  displayLibrary(myLibrary);
});

const btnRecordNewBook = document.querySelector('#btnRecordNewBook');
btnRecordNewBook.addEventListener('click', () => {
  formBook.classList.toggle('book-form--hidden');
});

// Constructor function for book objects
function Book(
  cover = 'https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png',
  name,
  author,
  numOfPages,
  hasBeenRead,
) {
  this.id = bookCountId;
  this.cover = cover;
  this.name = name;
  this.author = author;
  this.numOfPages = numOfPages;
  this.hasBeenRead = hasBeenRead; // this has to be a function
  bookCountId += 1;
}

Book.prototype.delete = (e, book) => {
  console.log(myLibrary.indexOf(book));
  myLibrary.splice(myLibrary.indexOf(book), 1);
  displayLibrary(myLibrary);
};

Book.prototype.changeReadStatus = (book) => !book.hasBeenRead;

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

  bookRemove.addEventListener('click', (e) => {
    book.delete(e, book);
  });

  const btnBookHasBeenRead = document.createElement('button');
  btnBookHasBeenRead.setAttribute('class', 'book__has-been-read');
  btnBookHasBeenRead.setAttribute('id', 'bookHasBeenRead');
  btnBookHasBeenRead.textContent = book.hasBeenRead ? 'Not Finished' : 'Not Finished';
  // Add data attribute to store values if book has been read
  btnBookHasBeenRead.setAttribute('data-has-been-read', book.hasBeenRead);

  btnBookHasBeenRead.addEventListener('click', (e) => {
    book.hasBeenRead = book.changeReadStatus(book); // eslint-disable-line no-param-reassign
    console.log(book.hasBeenRead);
    e.target.textContent = book.hasBeenRead ? 'Finished' : 'Not Finished';
  });

  gridBook.appendChild(bookId);
  gridBook.appendChild(bookCover);
  gridBook.appendChild(bookName);
  gridBook.appendChild(bookRemove);
  gridBook.appendChild(btnBookHasBeenRead);

  const gridBookIds = grid.querySelectorAll('.book__id');
  const gridBookIdsArray = [...gridBookIds];
  // Check if any of the books' name in the grid matches with any of the books in myLibrary array
  const doesBookExist = gridBookIdsArray.some(
    (id) => parseInt(id.textContent, 10) === book.id,
  );

  /*
  Create an if statement that checks if atleast one element
  in the array already has the same book name
  */
  if (!doesBookExist) grid.appendChild(gridBook);
}

function displayLibrary(library) {
  grid.textContent = '';
  library.forEach((book) => displayBook(book));
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
    formHasRead.checked,
  );
  return book;
}

const theLightningThief = new Book(
  '/images/the-lightning-thief.png',
  'The Lightning Thief',
  'Rick Riordan',
  '300 pages',
  true,
);

const theSeaOfMonsters = new Book(
  '/images/the-sea-of-monsters.png',
  'The Sea of Monsters',
  'Rick Riordan',
  '300 pages',
  false,
);

addBookToLibrary(theLightningThief);
addBookToLibrary(theSeaOfMonsters);
displayLibrary(myLibrary);
