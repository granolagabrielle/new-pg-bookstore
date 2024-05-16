console.log('JavaScript Running');
refreshBooks();

// TODO - Add code for edit & delete buttons

function submitBook(event) {
  event.preventDefault();

  console.log('Submit button clicked.');
  let book = {};
  book.author = document.getElementById('author').value;
  book.title = document.getElementById('title').value;
  addBook(book);
}

// adds a book to the database
function addBook(bookToAdd) {
  axios({
    method: 'POST',
    url: '/books',
    data: bookToAdd,
  })
    .then(function (response) {
      console.log('addBook()', response.data);
      refreshBooks();
    })
    .catch(function (error) {
      console.log('Error in POST', error);
      alert('Unable to add book at this time. Please try again later.');
    });
}

// refreshBooks will get all books from the server and render to page
function refreshBooks() {
  axios({
    method: 'GET',
    url: '/books',
  })
    .then(function (response) {
      console.log('refreshBooks() response', response.data);
      renderBooks(response.data);
    })
    .catch(function (error) {
      console.log('error in GET', error);
    });
}

// function to mark book as read
// function markAsRead(event) {
//   console.log(event.target.dataset);
//   console.log(event.target.closest('tr').dataset);
//   const bookid = event.target.closest('tr').dataset.bookId;
// axios ({
//   method: 'PUT',
//   url: `/books/${bookId}`
// }).then() => {

// }
// }

// function to delete book
function deleteBook(bookId) {
  axios
    .delete(`/books/${bookId}`)
    .then((response) => {
      refreshBooks();
    })
    .catch((error) => {
      console.log('Error', error);
      alert('something went wrong');
    });
}

// Displays an array of books to the DOM
function renderBooks(books) {
  const bookshelf = document.getElementById('bookShelf');
  bookshelf.innerHTML = '';

  for (let i = 0; i < books.length; i += 1) {
    let book = books[i];
    // For each book, append a new row to our table
    bookshelf.innerHTML += `
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isRead}</td>
        <td class="readButton" data-bookid="${book.id}">
          <button onClick="markAsRead(event)">Mark as Read</button>
        </td>
        <td>
          <button onClick="deleteBook(${book.id})">Delete Book</button>
        </td>
      </tr>
    `;
  }
}
