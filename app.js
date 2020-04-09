const express = require('express');
const app = express();
const router = require('./routes');
const bodyParser = require('body-parser');
const path = require('path');

const { PORT = 3000, BASE_PATH } = process.env;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);
app.use('/', (req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(BASE_PATH);
});
