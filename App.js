const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');
const User = require('./models/user');
const Appointment = require('./models/Appointment');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/appointments', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware to protect routes
function checkAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Home page
app.get('/', (req, res) => {
  res.render('home');
});

// Show Register page
app.get('/register', (req, res) => {
  res.render('register');
});

// Handle Registration
app.post('/register', async (req, res) => {
  const username = req.body.username.trim();
  const password = req.body.password.trim();
  let user = await User.findOne({ username });
  if (user) {
    return res.render('message', {
      title: 'Registration',
      message: 'User already exists.',
      link: '/login',
      linkText: 'Login here'
    });
  }
  const hashed = await bcrypt.hash(password, 10);
  user = new User({ username, password: hashed });
  await user.save();
  res.render('message', {
    title: 'Registration Successful',
    message: 'Registration successful!',
    link: '/login',
    linkText: 'Login here'
  });
});

// Show Login page
app.get('/login', (req, res) => {
  res.render('login');
});

// Handle Login
app.post('/login', async (req, res) => {
  const username = req.body.username.trim();
  const password = req.body.password.trim();
  let user = await User.findOne({ username });
  if (!user) {
    return res.render('message', {
      title: 'Login Error',
      message: 'No such user.',
      link: '/register',
      linkText: 'Register here'
    });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.render('message', {
      title: 'Login Error',
      message: 'Invalid password.',
      link: '/login',
      linkText: 'Try Again'
    });
  }
  req.session.user = username;
  res.redirect('/book');
});

// Appointment booking page
app.get('/book', checkAuth, (req, res) => {
  res.render('book', { user: req.session.user });
});

// Handle Appointment submission
app.post('/book', checkAuth, async (req, res) => {
  const {
    date,
    time,
    doctor,
    specialisation,
    patientName,
    patientPhone,
    patientEmail,
    symptoms
  } = req.body;

  const appt = new Appointment({
    user: req.session.user,
    date,
    time,
    doctor,
    specialisation,
    patientName,
    patientPhone,
    patientEmail,
    symptoms
  });

  await appt.save();
  res.redirect('/confirm');



  await appt.save();
  res.redirect('/confirm');
});

// Confirmation page
app.get('/confirm', checkAuth, (req, res) => {
  res.render('confirm');
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// Start server
app.listen(3000, () => console.log('Server running at http://localhost:3000'));
