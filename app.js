const express = require('express');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');

const { PORT = 3000 } = process.env;

const app = express();

app.listen(PORT, () => {
    console.log('test');
});

app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('/', (req, res) => {
    res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});
app.use(express.static((__dirname, 'public')));