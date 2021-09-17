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

// Constructor function for book objects
function Book(cover, name, author, numOfPages, hasRead) {
  bookCount += 1;
  this.id = bookCount;
  this.cover = cover;
  this.name = name;
  this.author = author;
  this.numOfPages = numOfPages;
  this.hasRead = hasRead; // this has to be a function
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
  bookCover.setAttribute('class', 'book_cover');
  bookCover.src = book.cover;

  const bookName = document.createElement('h2');
  bookName.setAttribute('class', 'book__name');
  bookName.textContent = book.name;

  gridBook.appendChild(bookId);
  gridBook.appendChild(bookCover);
  gridBook.appendChild(bookName);

  // Check if any of the books' name in the grid matches with any of the books in myLibrary array
  const gridBookIds = grid.querySelectorAll('.book__id');
  const gridBookIdsArray = [...gridBookIds];

  // if (gridBookNames.length) {
  //   for (let i = 0; i < gridBookNames.length; i += 1) {
  //     if (book.name !== gridBookNamesArray[i].textContent) grid.appendChild(gridBook);
  //     console.log(gridBookNamesArray[i]);
  //   }
  // } else {
  //   grid.appendChild(gridBook);
  // }

  const doesBookExist = gridBookIdsArray.some(
    (id) => parseInt(id.textContent, 10) === book.id,
  );
  // Create an if statement that checks if atleast one element in the array already has the same book name
  if (!doesBookExist) grid.appendChild(gridBook);
}

// function doesBookExist(book) {}

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
