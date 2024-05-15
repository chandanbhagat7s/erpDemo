
const express = require('express');
const { default: mongoose } = require('mongoose');
const globalerrorhandler = require('./utils/globalerrorhandler');
const userRouter = require('./Routes/userRoutes');
const env = require("dotenv");
const morgan = require('morgan');

const cookieParser = require("cookie-parser");
const roleRoute = require('./Routes/roleRoutes');


const app = express();


env.config({ path: "./config.env" })


mongoose.connect("mongodb+srv://bhagatchandan287:HOGleRaQAmnrbVQd@erp.zthwrry.mongodb.net/?retryWrites=true&w=majority&appName=erp", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})
    .then((con) => {
        // console.log(con.connection);
        console.log("database connected");
    }).catch(e => {
        console.log("not connected");
    })

// to get all everything 
app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())

app.use("/api/v1/user", userRouter)
app.use("/api/v1/role", roleRoute)


app.use(globalerrorhandler)


app.listen(3000, () => {
    console.log("Server started");
})
















