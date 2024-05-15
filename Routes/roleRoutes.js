
const express = require('express');
const { getAllTask, loginrole } = require('../Controllers/roleController');
const { getVerified, getVerifiedforRole } = require('../middleware/isLogedIn');

const roleRoute = express.Router()


roleRoute.post("/login", loginrole)

roleRoute.use(getVerifiedforRole)




roleRoute.get("/rate", getAllTask)
roleRoute.get("/getAllTask", getAllTask)

module.exports = roleRoute;
















