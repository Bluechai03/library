// Store all book objects
const myLibrary = [];
const grid = document.querySelector('.grid');

const formBook = document.querySelector('#formBook');
formBook.addEventListener('submit', (e) => {
  e.preventDefault();
  addBookToLibrary(getNewBook());
  displayLibrary();
});

// Constructor function for book objects
function Book(cover, name, author, numOfPages, hasRead) {
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

function displayLibrary() {
  // Iterate through myLibrary array and display each book's cover
  myLibrary.forEach((book) => {
    const displayBook = document.createElement('div');
    displayBook.classList.add('book');

    const bookCover = document.createElement('img');
    bookCover.src = book.cover;

    const bookName = document.createElement('h2');
    bookName.textContent = book.name;

    displayBook.appendChild(bookCover);
    displayBook.appendChild(bookName);
    grid.appendChild(displayBook);
  });
}

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
    formHasRead.value
  );
  return book;
}

const theLightningThief = new Book(
  'https://rickriordan.com/content/uploads/2016/03/the-lightning-thief-299x416.png',
  'The Lightning Thief',
  'Rick Riordan',
  '300 pages',
  'Finished'
);

const theSeaOfMonsters = new Book(
  'https://rickriordan.com/content/uploads/2016/03/the-sea-of-monsters-3D-299x416.png',
  'The Sea of Monsters',
  'Rick Riordan',
  '300 pages',
  'Finished'
);

addBookToLibrary(theLightningThief);
addBookToLibrary(theSeaOfMonsters);
// displayLibrary();
