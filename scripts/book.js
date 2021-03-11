
class Book {
	constructor(author, title, nPages) {
		// the constructor...
		this.author = author;
		this.title = title;
		this.nPages = nPages;
	}
}

class UI {
	static displayBooks() {
		const StoredBooks = [{title:'la verga', author:'nn', nPages:'1'}];
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
    `;
    list.appendChild(row);
	}
}

// here display books
document.addEventListener('DomContentLoaded', UI.displayBooks);


