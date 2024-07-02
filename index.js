// Array para almacenar los objetos de libros
const myLibrary = [];

// Constructor para el objeto Book
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Método para alternar el estado de lectura de un libro
Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

// Función para agregar un nuevo libro a la biblioteca
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks(); // Actualizar la visualización de los libros
}

// Función para mostrar los libros en la página
function displayBooks() {
  const libraryDiv = document.getElementById('library');
  libraryDiv.innerHTML = ''; // Limpiar el contenido previo

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.setAttribute('data-index', index);

    const bookInfo = `
      <p><strong>Title:</strong> ${book.title}</p>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.read ? 'Yes' : 'No'}</p>
      <button onclick="removeBook(${index})">Remove</button>
      <button onclick="toggleReadStatus(${index})">Toggle Read Status</button>
    `;
    bookCard.innerHTML = bookInfo;
    libraryDiv.appendChild(bookCard);
  });
}

// Función para eliminar un libro de la biblioteca
function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks(); // Actualizar la visualización de los libros
}

// Función para alternar el estado de lectura de un libro
function toggleReadStatus(index) {
  myLibrary[index].toggleRead();
  displayBooks(); // Actualizar la visualización de los libros
}

// Manejar el formulario para agregar nuevos libros
document.getElementById('bookForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevenir la recarga de la página

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, read);

  // Limpiar el formulario
  document.getElementById('bookForm').reset();

  // Ocultar el modal
  document.getElementById('newBookModal').style.display = 'none';
});

// Manejar el botón "NEW BOOK" para mostrar el formulario
document.getElementById('newBookBtn').addEventListener('click', function() {
  document.getElementById('newBookModal').style.display = 'block';
});

// Manejar el botón de cerrar el modal
document.querySelector('.close').addEventListener('click', function() {
  document.getElementById('newBookModal').style.display = 'none';
});

// Ocultar el modal si se hace clic fuera de él
window.onclick = function(event) {
  if (event.target == document.getElementById('newBookModal')) {
    document.getElementById('newBookModal').style.display = 'none';
  }
};

// Agregar algunos libros manualmente para probar
addBookToLibrary("El señor de los anillos", "J.R.R. Tolkien", 1178, false);
addBookToLibrary("1984", "George Orwell", 328, true);
