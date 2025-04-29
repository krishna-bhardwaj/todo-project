const express = require('express');
const cors = require('cors');

const listRouter = require('./routes/listRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/healthz', (req, res, next) => {
    try {
        res.send('ok');
    } catch (err) {
        next(err);
    }
});

app.use((err, _, res, __) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

app.use('/api/v1', userRouter);
app.use('/api/v2', listRouter);

module.exports = app;
