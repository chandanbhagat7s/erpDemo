
const express = require('express');
const { getAllTask, loginrole } = require('../Controllers/roleController');
const { getVerified, getVerifiedforRole } = require('../middleware/isLogedIn');
const { submitRating } = require('../Controllers/userControllers');

const roleRoute = express.Router()


roleRoute.post("/login", loginrole)

roleRoute.use(getVerifiedforRole)




roleRoute.get("/rate", submitRating)
roleRoute.get("/getAllTask", getAllTask)

module.exports = roleRoute;
















