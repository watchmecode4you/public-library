const express = require("express")
const app = express()
const env = require("dotenv")
env.config()
const morgan = require("morgan")
const port = process.env.PORT

app.use(morgan("tiny"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const router = require("./router")
app.use('/', router)

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error("Not Found")
    err.status = 404
    return next(err)
})

// development error handler
// will print stacktrace
if(app.get("env") === "development"){
    app.use((err, req, res, next) => {
        res.status(err.status || 500)
        return res.json({
            message: err.message,
            error: err
        })
    })
}

app.listen(port, () => console.log("Listening on port 3001"))
