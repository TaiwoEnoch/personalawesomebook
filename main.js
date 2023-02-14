class Awesome {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// User interface class: Handle UI Tasks
class UI {
  static displayBooks() {
    const books = store.getBooks();

    books.forEach((book) => UI.addBookList(book));
  }
  static adddBookToList(book) {
    const list = document.querySelector('#book-list');

    const bookDisplay = document.createElement('div');
    bookDisplay.className ='bookList1';
    bookDisplay.innerHTML = ` <p class="bookTitle"><b>${book.title}</b></p>
      <p>by<span></span><b>${book.author}.</b></p>
      <button class="delete">Remove</button>
      `;

    list.appendChild(bookDisplay);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

//store Class: Handle storage
class Store {
  static getBooks() {
    let Books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('boooks', JSON.stringify(books));
  }

  static removeBook(title) {
    const books = store.getBooks();

    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    })
    
    localStorage.setItem('books', JSON.stringify(books));
  }
}

//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
//prevent actual submit
e.preventDefault();

//Get form values 
const title = document.querySelector('#title').value;
const author = document.querySelector('#author').value;

//Instantiate book
const book = new Book(title, author);

// Add Book to UI
UI.adddBookToList(book);

//Add book to store
store.addBook(book);

// Clear fields
UI.clearFields();
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
// Remove book from UI
UI.deleteBook(e.target);
// Remove book from store
Store.removeBook(e.target.previousElementSiblings.previousElementSiblings.textContent);
});

const currentDate = new Date().toLocaleString();
document.getElementById('current-date').innerHTML = currentDate;

//display the books list when click the button "List"
const bookList = document.querySelector('.book-list-container');
const listBtn = document.querySelector('.listBtn')
const formContainer = document.querySelector('.form-container');

listBtn.addEventListener('click', () => {
  bookList.style.display = 'block';
  formContainer.style.display = 'none';
});

window.addEventListener('load', () => {
  bookList.style.display = 'block';
  formContainer.style.display = 'none';
  contactInfo.style.display = 'none';
});

//display the add book form when click then the button "Add new"
const addNewBtn = document.querySelector('.add-new-btn');

addNewBtn.addEventListener('click', () => {
  bookList.style.display = 'none';
  formContainer.style.display = 'block';
  contactInfo.style.display = 'none';
});

// display the Contact section when click the button "Contact"
const contactBtn = document.querySelector('.contact');
const contactInfo = document.querySelector('.contact-info');

contactBtn.addEventListener('click', () => {
  bookList.style.display = 'none';
  formContainer.style.display = 'none';
  contactInfo.style.display = 'block'
});