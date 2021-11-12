var createError = require("http-errors");
var express = require('express');
var app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/', function (req, res) {
    ret = {'tue': [{'start': '15:00', 'end': '15:50', 'loc': [8, '106'], 'prof': 16, 'type': 1}]}
    ret = JSON.stringify(ret)
    console.log(ret)
    res.send(ret);
});

app.use('/subject', require('./subject'));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log("REQUESTED URL NOT FOUND!!!\n\trequested url:\t" + req.url);
    res.send(createError(404));
});


app.listen(3000, function () {
    console.log('Backend is listening on port 3000');
})