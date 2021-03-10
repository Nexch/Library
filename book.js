var myLibrary = [];

function Book(author,title,nPages) {
  	// the constructor...
	myBook = {
		author: `${author}`,
		title: `${title}`,
		nPages: `${nPages}`,
	};
	return myBook;
}

function addBookToLibrary(author,title,nPages) {
	// do stuff here
	let books = Book(`${author}`, `${title}`, `${nPages}`);
	myLibrary.push(books)
}

function removeBook(index) {
	myLibrary.splice(index, 1)
}

function loopLib() {
	let x = 0
	while (myLibrary.length > x) {
		console.log(myLibrary[x]);
		x++
	}
}

addBookToLibrary("birth", "of", 100)
addBookToLibrary("the", "myth of", 200)
addBookToLibrary("the dead", "of", 300)

console.log(myLibrary)

removeBook(1)
console.log(myLibrary)
loopLib()
