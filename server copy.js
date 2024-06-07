const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const connectDB = require('./config/database');

// Connect to the database
connectDB();

const app = express();
const PORT = 3000;

// Set up the EJS view engine
app.set('view engine', 'ejs');
app.set('views', './views');  // Default directory for views is '/views'

// Middleware to serve static files
app.use(express.static(__dirname +'/public'));




// Middleware for body parsing and session handling
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    //saveUninitialized: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


// Require routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const dashboardRouter = require('./routes/dashboard');
const accountsRouter = require('./routes/account');
const uploadRoutes = require('./routes/upload');
const toolsRouter = require('./routes/tools');




// Use routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);
app.use('/account', accountsRouter);
app.use('/upload', uploadRoutes);
app.use('/tools', toolsRouter);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});




