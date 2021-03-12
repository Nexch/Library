/* eslint-disable max-classes-per-file */
class Book {
  constructor(author, title, nPages, read) {
    this.author = author;
    this.title = title;
    this.nPages = nPages;
    this.read = read;
    this.id = title.slice(0, 3).toUpperCase() + nPages;
  }
}

function change(e) {
  const elem = document.getElementById(e.target.id);
  if (elem.innerHTML === 'Read') elem.innerHTML = 'Unread';
  else elem.innerHTML = 'Read';
}

class Store {
  static getBooks() {
    let books;
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
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(nPages) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.nPages === nPages) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

class UI {
  static displayBooks() {
    const StoredBooks = Store.getBooks();
    const books = StoredBooks;
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.nPages}</td>
      <td class="has-text-centered"><button  id=${book.id} value="Read">Read</button></td>
      <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
    `;
    list.appendChild(row);
    const td = document.getElementById(book.id);
    td.addEventListener('click', (e) => change(e));
  }

  static deleteBook(element) {
    if (element.classList.contains('delete')) {
      element.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.form_box');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    setTimeout(() => document.querySelector('.alert').remove(), 2000);
  }
  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#nPages').value = '';
  }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const nPages = document.querySelector('#nPages').value;

  if (title === '' || author === '' || nPages === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    const book = new Book(title, author, nPages);
    UI.addBookToList(book);
    Store.addBook(book);
    UI.showAlert('Book Added', 'success');
    UI.clearFields();
  }
});
document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});