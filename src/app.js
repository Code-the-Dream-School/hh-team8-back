const express = require('express');
const app = express();
const cors = require('cors')
const favicon = require('express-favicon');
const logger = require('morgan');


const mainRouter = require('./routes/mainRouter');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const projectRouter = require('./routes/projectRouter.js'); 


// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.static('public'));
app.use(favicon(__dirname + '/public/favicon.ico'));

const authenticateToken = require('./middlewares/authMiddleware');

// routes

app.use('/api/v1', authRouter);
app.use('/api/v1', userRouter);
app.use('/api/v1', authenticateToken,  mainRouter);
app.use('/api/v1', authenticateToken,  projectRouter); 


module.exports = app;