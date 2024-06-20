const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const { authenticateJWT } = require('../controllers/usersController');

// General users routes
router.get('/', booksController.getAllBooks);
router.get('/isbn/:isbn', booksController.getBookByISBN);
router.get('/author/:author', booksController.getBooksByAuthor);
router.get('/title/:title', booksController.getBooksByTitle);
router.get('/review/:isbn', booksController.getBookReview);

// Registered users routes
router.post('/review/:isbn', authenticateJWT, booksController.addBookReview);
router.delete('/review/:isbn', authenticateJWT, booksController.deleteBookReview);

// Async/await and promises examples
router.get('/async/books', booksController.getAllBooksAsync);
router.get('/promises/books/isbn/:isbn', booksController.getBookByISBNWithPromises);
router.get('/async-await/books/author/:author', booksController.getBooksByAuthorAsync);
router.get('/async-await/books/title/:title', booksController.getBooksByTitleAsync);

module.exports = router;
