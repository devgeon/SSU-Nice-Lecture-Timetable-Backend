var createError = require("http-errors");
var express = require('express');
var app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/', function (req, res) {
    res.send("Helllo");
});

app.use('/course', require('./course'));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log("REQUESTED URL NOT FOUND!!!\n\trequested url:\t" + req.url);
    res.send(createError(404));
});


app.listen(3000, function () {
    console.log('Backend is listening on port 3000');
})