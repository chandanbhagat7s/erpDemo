const jwt = require("jsonwebtoken");
const User = require("../Model/userSchema");
const appError = require("../utils/appError");
const runAsync = require("../utils/runasync");
const { promisify } = require('util');
const Cuser = require("../Model/createduserSchema");


exports.getVerified = runAsync(async (req, res, next) => {
    // bringin out the token from the reqst header
    let token;
    console.log(req.headers.authorization);
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        // allowing the access to the protected route if we have jwt cookie
        token = req.cookies.jwt;
    }

    console.log("token is", token);
    if (!token) {
        return next(new appError('please login to get access', 401))
    }

    // now we got token 
    //varification step: to check weather someone manuplate data and token expiry
    /* The verify() method of JWT is used to verify the signature of a JSON Web Token (JWT). A JWT is a string that is made up of three parts: a header, a payload, and a signature. The header contains information about the JWT, such as the algorithm that was used to sign it. The payload contains the claims, which are the data that is being protected by the JWT. The signature is used to verify that the JWT has not been tampered with.

The verify() method takes three arguments: the JWT token, the secret key or public key that was used to sign the JWT, and an optional options object. The options object can be used to specify additional verification criteria, such as the expiration time of the JWT.

If the signature of the JWT is valid, the verify() method will return the decoded payload of the JWT. If the signature is invalid, the verify() method will throw an error. */

    // jwt.verify(token,process.env.SECRET)          we will convert it into promise 
    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY)
    // console.log(decode);
    // we need to handle error JsonWebTokenError  and tokenexpire error





    // now we need to check user still exists or password is changed then... we should not access the user okk 
    // if user is deleted meantime 
    // const freshUser = await User.findOne({ id: decode.id })
    const freshUser = await User.findById(decode.id)
    if (!freshUser) {
        return next(new appError('the user do  not exist ', 401))
    }




    // now for if the user change the passwor then we shoud not access
    // console.log(await freshUser.changedPasswords(decode.iat));
    if (await freshUser.changedPasswords(decode.iat)) {
        return next(new appError('password is changed need to login again', 401))
    }

    // future use 
    req.user = freshUser;
    res.locals.user = freshUser;


    next()

})
exports.getVerifiedforRole = runAsync(async (req, res, next) => {
    // bringin out the token from the reqst header
    let token;
    console.log(req.headers.authorization);
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        // allowing the access to the protected route if we have jwt cookie
        token = req.cookies.jwt;
    }

    console.log("token is", token);
    if (!token) {
        return next(new appError('please login to get access', 401))
    }


    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY)

    const freshUser = await Cuser.findById(decode.id)
    if (!freshUser) {
        return next(new appError('the user do  not exist ', 401))
    }




    if (await freshUser.changedPasswords(decode.iat)) {
        return next(new appError('password is changed need to login again', 401))
    }

    // future use 
    req.user = freshUser;
    res.locals.user = freshUser;


    next()

})