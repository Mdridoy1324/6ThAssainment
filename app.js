const express = require('express');
const app = express();
app.use(express.json());

let books = [];
let nextId = 1;

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Add a book
app.post('/books', (req, res) => {
  const { title, author, publishedDate } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }

  const book = {
    id: nextId++,
    title,
    author,
    publishedDate
  };

  books.push(book);
  res.status(201).json(book);
});

// Delete a book
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const deletedBook = books.splice(index, 1)[0];
  res.json({ message: 'Book deleted successfully' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
