
const { default: mongoose } = require("mongoose");
const bcrypt = require('bcryptjs');

const createdSchema = new mongoose.Schema({
    role: {
        type: String,
        required: [true, "please provide role"],
        enum: ["TEACHER", "HOD"]
    }
    ,
    name: {
        type: String,
        required: [true, "please provide your name"]
    },
    password: {
        type: String,
        required: [true, "please provide your password"]
    },
    email: {
        type: String,
        required: [true, "please provide your emailID"]

    }






})





createdSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    this.password = await bcrypt.hash(this.password, 12);

    next()

})



createdSchema.methods.correctPass = async function (inputpassword, password) {
    let t = await bcrypt.compare(inputpassword, password)
    console.log(t);
    return t
}



createdSchema.methods.changedPasswords = async function (jwttokentime) {
    if (this.changedPasswodTime) {
        const change = parseInt(this.changedPasswodTime.getTime() / 1000, 10)
        // console.log(jwttokentime, this.changedPasswodTime.getTime() / 1000);
        // console.log(jwttokentime, change);
        // console.log(jwttokentime < change);
        return jwttokentime < change
    }


    // if user has not change the password at least once 
    return false;
}










const Cuser = mongoose.model("cuser", createdSchema);

module.exports = Cuser;

































































