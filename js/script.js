const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', addBook);

let myLib = [];
let newBook;
let form = document.getElementById('form');
class Book {
  constructor(title, author, pages, read) {
    this.title = document.getElementById('title').value;
    this.author = document.getElementById('author').value;
    this.pages = document.getElementById('pages').value;
    this.read = document.getElementById('read').checked;
  }
}

function addBook() {
  newBook = new Book(title, author, pages, read);
  myLib.push(newBook);
  savelocal();

  location.reload();
  document.getElementById('addBtn').disabled = true;
  render();
  form.reset();
}

function render() {
  const display = document.getElementById('table-body');
  const books = document.querySelectorAll('.book');
  books.forEach((book) => display.removeChild(book));
  for (let i = 0; i < myLib.length; i++) {
    createBook(myLib[i]);
  }
}

function createBook(item) {
  const library = document.getElementById('table-body');
  const bookData = document.createElement('tr');
  const bookTitle = document.createElement('td');
  const bookAuthor = document.createElement('td');
  const bookPages = document.createElement('td');
  const bookRead = document.createElement('td');
  const bookDel = document.createElement('td');
  const bookReadChange = document.createElement('td');
  const bookDelBut = document.createElement('button');
  const bookEdit = document.createElement('button');

  bookTitle.textContent = item.title;
  bookAuthor.textContent = item.author;
  bookPages.textContent = item.pages;

  if (item.read) {
    bookRead.textContent = 'Read';
  } else {
    bookRead.textContent = 'Not Read';
  }

  bookDelBut.innerHTML = '<i class="fa fa-close bl"></i>';
  bookDelBut.classList.add('blue-but');
  bookEdit.classList.add('blue-but');
  bookEdit.innerHTML =
    '<i class="fa fa-pencil-square-o bl" aria-hidden="true"></i> ';
  bookDel.appendChild(bookDelBut);
  bookReadChange.appendChild(bookEdit);

  bookData.appendChild(bookTitle);
  bookData.appendChild(bookAuthor);
  bookData.appendChild(bookPages);
  bookData.appendChild(bookRead);
  bookData.appendChild(bookDel);
  bookData.appendChild(bookReadChange);
  library.appendChild(bookData);
  bookDel.addEventListener('click', () => {
    myLib.splice(myLib.indexOf(item), 1);
    savelocal();
    location.reload();
    render();
  });

  bookEdit.addEventListener('click', () => {
    myLib[myLib.indexOf(item)].read = !myLib[myLib.indexOf(item)].read;
    savelocal();
    location.reload();
    render();
  });
}

function savelocal() {
  localStorage.setItem('myLibrary', JSON.stringify(myLib));
}

function restore() {
  myLib = JSON.parse(localStorage.getItem('myLibrary'));
  render();
}

function dis() {
  if (
    document.getElementById('title') &&
    document.getElementById('author') &&
    document.getElementById('pages')
  ) {
    document.getElementById('addBtn').disabled = false;
  } else {
    document.getElementById('addBtn').disabled = true;
  }
}

restore();
window.addEventListener('keyup', dis);
