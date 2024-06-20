const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = [];
const secretKey = 'your_secret_key';

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.send('User registered successfully');
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && await bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign({ username: user.username }, secretKey);
    res.json({ accessToken });
  } else {
    res.send('Username or password incorrect');
  }
};

exports.authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  if (token) {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
