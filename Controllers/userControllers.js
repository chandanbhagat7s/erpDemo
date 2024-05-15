const Cuser = require("../Model/createduserSchema");
const Task = require("../Model/taskSchema");
const User = require("../Model/userSchema");
const appError = require("../utils/appError");
const runAsync = require("../utils/runasync");

const jwt = require('jsonwebtoken');



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


exports.signup = runAsync(async (req, res, next) => {

    console.log("HIT");
    const {
        name,
        password,
        email,
    } = req.body;


    if (!name || !password || !email) {
        return next(new appError("please enter credential for get into in ", 400));
    }


    const newUser = await User.create({ name, email, password });



    createTokenSendRes(newUser._id, res, 201, newUser)


})
exports.login = runAsync(async (req, res, next) => {


    const {
        password,
        email,
    } = req.body;


    const user = await User.findOne({ email })


    if (!user || !await user.correctPass(password, user.password)) {

        return next(new appError("please enter valid email id and password", 400));
    }


    createTokenSendRes(user._id, res, 201, user)


})

exports.createrole = runAsync(async (req, res, next) => {
    const { role, name, email, password } = req.body
    if (!role || !name || !email || !password) {
        return next(new appError("please enter all the credential  to register a new role ", 400));
    }
    if (role !== "TEACHER" && role !== "HOD") {
        return next(new appError(" please enter valid role  ", 400));
    }

    const createdUser = await Cuser.create({
        role, name, email, password
    })



    res.status(200).send({
        status: true,
        data: `please share the information to ${name} with his email id ${email} and his password ${password}`
    })



})

















exports.createTask = runAsync(async (req, res, next) => {
    const { title, description, id } = req.body
    if (!title || !description) {
        return next(new appError("please enter all the details to create the task ", 400));
    }


    const task = await Task.create({
        title, description, teacherId: id
    })

    res.status(200).send({
        status: true,
        message: "Task is created",
        data: task
    })



})
















