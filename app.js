require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate } = require('celebrate');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const { PORT, DATABASE_URL } = require('./config');
const createUserSchema = require('./validationSchemas/createUser');
const loginSchema = require('./validationSchemas/login');

const app = express();

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', celebrate(loginSchema), login);
app.post('/signup', celebrate(createUserSchema), createUser);

app.use(auth);
app.use('/', require('./routes/index'));

app.use(errorLogger);
app.use(errors());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
});
