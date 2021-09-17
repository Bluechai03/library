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
    const gridBook = document.createElement('div');
    gridBook.classList.add('book');

    const bookCover = document.createElement('img');
    bookCover.setAttribute('class', 'book_cover');
    bookCover.src = book.cover;

    const bookName = document.createElement('h2');
    bookName.setAttribute('class', 'book__name');
    bookName.textContent = book.name;

    gridBook.appendChild(bookCover);
    gridBook.appendChild(bookName);

    // Check if any of the books' name in the grid matches with any of the books in myLibrary array
    const gridBookNames = grid.querySelectorAll('.book__name');
    if (gridBookNames.length) {
      console.log('bookNames does exist');

      const gridBookNamesArray = [...gridBookNames];
      gridBookNamesArray.filter((name) => name.textContent === book.name);
      console.log(gridBookNamesArray);
      gridBookNamesArray.forEach((name) => {
        console.table(book.name);
        if (book.name !== name.textContent) grid.appendChild(gridBook);
      });
    } else {
      console.log(`bookNames node length is ${gridBookNames.length}`);
      grid.appendChild(gridBook);
    }
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
