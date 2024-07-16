const express = require('express');
const cors = require('cors');

const listRouter = require('./routes/listRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res, next) => {
    try {
        res.send('this is my first server');
    } catch (err) {
        next();
    }
});

app.use('/api/v1', userRouter);
app.use('/api/v2', listRouter);

module.exports = app;
