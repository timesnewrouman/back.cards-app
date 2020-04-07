const usersRouter = require('express').Router();
const users = require('../data/users.json');

usersRouter.get('/users', (req, res) => {
    res.send(users);
});

usersRouter.get('/users/:id', (req, res) => {
    if (!users.find(item => item._id === req.params.id)) {
        res.status(404).send({ "message": "Нет пользователя с таким id" });
        return;
    } else {
        res.send(users.find(item => item._id === req.params.id));
    };
});

module.exports = usersRouter;