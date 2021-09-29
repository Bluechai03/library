// Store all book objects
const myLibrary = [];
const grid = document.querySelector('.grid');
let bookCountId = 0;

const formBook = document.querySelector('#formBook');
formBook.addEventListener('submit', (e) => {
  e.preventDefault();
  const formIsValid = validateForm(); // eslint-disable-line no-use-before-define
  if (formIsValid) {
    addBookToLibrary(getNewBook()); // eslint-disable-line no-use-before-define
    displayLibrary(myLibrary); // eslint-disable-line no-use-before-define

    formBook.reset();
  }
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

Book.prototype.delete = (book) => {
  console.log(myLibrary.indexOf(book));
  myLibrary.splice(myLibrary.indexOf(book), 1);
  displayLibrary(myLibrary); // eslint-disable-line no-use-before-define
};

Book.prototype.changeReadStatus = (book) => !book.hasBeenRead;

Book.prototype.updateReadStatusButton = (book, btn) => {
  if (book.hasBeenRead) {
    btn.textContent = 'Finished';
    btn.style.background = 'palegreen';
  } else {
    btn.textContent = 'Not Finished';
    btn.style.background = 'tomato';
  }
};

function validateForm() {
  const errors = [];
  // check if all details is valid and return true if it does
  const formCoverUrl = document.querySelector('#formCoverURL');
  if (!formCoverUrl.value) {
    // Add a placeholder cover
    formCoverUrl.value = '/images/placeholder-cover.png';
  }

  const formName = document.querySelector('#formName');
  const formNameLabel = document.querySelector('#formNameLabel');
  if (!formName.value) {
    console.log('Name must not be empty and be string');
    errors.push(formName);
    formNameLabel.setAttribute('data-error', 'Name field must not be empty');
  } else formNameLabel.setAttribute('data-error', '');

  const formAuthor = document.querySelector('#formAuthor');
  const formAuthorLabel = document.querySelector('#formAuthorLabel');
  if (!formAuthor.value) {
    errors.push(formAuthor);
    formAuthorLabel.setAttribute('data-error', 'Author field must not be empty');
  } else formAuthorLabel.setAttribute('data-error', '');

  const formNumOfPages = document.querySelector('#formNumOfPages');
  const formNumOfPagesLabel = document.querySelector('#formNumOfPagesLabel');
  if (formNumOfPages.value <= 0) {
    errors.push(formNumOfPages);
    formNumOfPagesLabel.setAttribute('data-error', 'Number of pages should be above 0');
  } else formNumOfPagesLabel.setAttribute('data-error', '');

  if (errors.length) {
    console.log('There are errors in the form');
    return false;
  }
  return true;
}

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

  bookRemove.addEventListener('click', () => {
    book.delete(book);
  });

  const btnBookHasBeenRead = document.createElement('button');
  btnBookHasBeenRead.setAttribute('class', 'btn book__has-been-read');
  btnBookHasBeenRead.setAttribute('id', 'bookHasBeenRead');
  book.updateReadStatusButton(book, btnBookHasBeenRead);
  btnBookHasBeenRead.textContent = book.hasBeenRead ? 'Finished' : 'Not Finished';
  // Add data attribute to store values if book has been read
  btnBookHasBeenRead.setAttribute('data-has-been-read', book.hasBeenRead);

  btnBookHasBeenRead.addEventListener('click', () => {
    book.hasBeenRead = book.changeReadStatus(book); // eslint-disable-line no-param-reassign
    console.log(book.hasBeenRead);
    book.updateReadStatusButton(book, btnBookHasBeenRead);
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
