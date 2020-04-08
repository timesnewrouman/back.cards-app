const express = require('express');
const usersRouter = require('./routes/users.js');
const router = require('./routes/cards.js');

const { PORT = 3000, BASE_PATH } = process.env;

const app = express();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(BASE_PATH);
});

app.use('/', usersRouter);
app.use('/', router);
app.use(express.static((__dirname, 'public')));
app.use('/', (req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});
