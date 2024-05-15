
const express = require('express');
const { signup, login, createrole, createTask, submitRating } = require('../Controllers/userControllers');
const { getVerified } = require('../middleware/isLogedIn');
const { giveAccessTo } = require('../middleware/access');

const userRouter = express.Router();


userRouter.post('/signup', signup)
userRouter.post('/login', login)



userRouter.use(getVerified, giveAccessTo("ADMIN"))
userRouter.post("/rate", submitRating)
// userRouter.post('/submitRating',)
userRouter.post('/createRole', createrole)
userRouter.post('/createTask', createTask)



module.exports = userRouter;



















