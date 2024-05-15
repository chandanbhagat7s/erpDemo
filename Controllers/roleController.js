const Cuser = require("../Model/createduserSchema");
const Task = require("../Model/taskSchema")
const runAsync = require("../utils/runasync")
const jwt = require("jsonwebtoken");






const createTokenSendRes = (id, res, statusCode, data) => {

    let token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRIR_IN
    });
    let cookieOptions = {
        expires: new Date(
            Date.now() + 90 * 24 * 60 * 60 * 1000
        ),


        secure: true,
        httpOnly: true,
        sameSite: "None",
        path: "/",
    };
    if (process.env.NODE_ENV == 'production') {

        cookieOptions.secure = true
    }
    res.cookie('jwt', token, cookieOptions);
    // res.headers['access-control-allow-credentials'] = true

    // we will set cookies 
    res.status(statusCode).json({
        status: true,
        data

    })
}



exports.loginrole = runAsync(async (req, res, next) => {


    const {
        password,
        email,
    } = req.body;


    const user = await Cuser.findOne({ email })


    if (!user || !await user.correctPass(password, user.password)) {

        return next(new appError("please enter valid email id and password", 400));
    }


    createTokenSendRes(user._id, res, 201, user)


})


exports.getAllTask = runAsync(async (req, res, next) => {


    const task = await Task.find({
        teacherId: req.user._id
    })

    res.status(200).send({
        status: true,
        message: "tasks are as follows",
        data: task
    })



})

















