const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
const booksRoutes = require('./routes/books');
const usersRoutes = require('./routes/users');

app.use('/books', booksRoutes);
app.use('/users', usersRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
