const express = require('express');
const cors = require('cors');

const listRouter = require('./routes/listRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/healthz', (req, res) => {
    res.send('ok');
});

const apiV1Router = express.Router();
apiV1Router.use(userRouter);
apiV1Router.use(listRouter);

app.use('/api/v1', apiV1Router);

app.use((err, _, res, __) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

module.exports = app;
