const books = [
    { isbn: '123', title: 'Book One', author: 'Author One', reviews: [{first:"it is good"}] },
    { isbn: '456', title: 'Book Two', author: 'Author Two', reviews: [] },
    { isbn: '789', title: 'Book Three', author: 'Author One', reviews: [] }
  ];
  
  exports.getAllBooks = async (req, res) => {
    res.json(books);
  };
  
  exports.getBookByISBN = async (req, res) => {
    const book = books.find(b => b.isbn === req.params.isbn);
    if (book) {
      res.json(book);
    } else {
      res.status(404).send('Book not found');
    }
  };
  
  exports.getBooksByAuthor = async (req, res) => {
    const filteredBooks = books.filter(b => b.author === req.params.author);
    res.json(filteredBooks);
  };
  
  exports.getBooksByTitle = async (req, res) => {
    const filteredBooks = books.filter(b => b.title === req.params.title);
    res.json(filteredBooks);
  };
  
  exports.getBookReview = async (req, res) => {
    const book = books.find(b => b.isbn === req.params.isbn);
    if (book) {
      res.json(book.reviews);
    } else {
      res.status(404).send('Book not found');
    }
  };
  
  exports.addBookReview = async (req, res) => {
    const { review } = req.body;
    const book = books.find(b => b.isbn === req.params.isbn);
    if (book) {
      book.reviews.push({ review, user: req.user.username });
      res.send('Review added');
    } else {
      res.status(404).send('Book not found');
    }
  };
  
  exports.deleteBookReview = async (req, res) => {
    const book = books.find(b => b.isbn === req.params.isbn);
    if (book) {
      book.reviews = book.reviews.filter(r => r.user !== req.user.username);
      res.send('Review deleted');
    } else {
      res.status(404).send('Book not found');
    }
  };
  
  // Async callback function example
  exports.getAllBooksAsync = (req, res) => {
    setTimeout(() => {
      res.json(books);
    }, 1000);
  };
  
  // Promises example
  exports.getBookByISBNWithPromises = (req, res) => {
    new Promise((resolve, reject) => {
      const book = books.find(b => b.isbn === req.params.isbn);
      if (book) {
        resolve(book);
      } else {
        reject('Book not found');
      }
    })
    .then(book => res.json(book))
    .catch(err => res.status(404).send(err));
  };
  
  // Async/await example for author search
  exports.getBooksByAuthorAsync = async (req, res) => {
    try {
      const filteredBooks = books.filter(b => b.author === req.params.author);
      res.json(filteredBooks);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  // Async/await example for title search
  exports.getBooksByTitleAsync = async (req, res) => {
    try {
      const filteredBooks = books.filter(b => b.title === req.params.title);
      res.json(filteredBooks);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  