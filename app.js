// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
// server.close();
// var express = require('express');
// var app = express();
const express = require('express');

const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', (req,res) =>{
    res.send('We are live')
});

// app.post('/chat', (req,res) =>{
//     // if (!req.body) return res.sendStatus(400); console.log(req.body);
//     res.send(JSON.stringify('We are live post'))
    
// });

app.listen(3333, ()=>console.log("Server is live at port 3333"));
console.log('Hello world');
app.post('/chat', function (req, res) {
    const val = Object.values(req.body.queryResult.parameters);
    const key = Object.keys(req.body.queryResult.parameters);
    console.log("Value = "+val);
    console.log('Inside chat');
    var request = require('request');
    // var city = req.params.city.toUpperCase(); //
     var month = req.params.month; 
    // var day = req.params. day;
    var city = "mumbai";
    
    city = req.body.queryResult.parameters.city; // you can also do req.body.queryResult.parameters["city"]
    var dateString = req.body.queryResult.parameters.date;
    var date = new Date(dateString);
    var month = date.getMonth();
    var day = date.getDate();

    console.log("Datestring: " + dateString);
    console.log("month: " + month);
    console.log("day: " + day)
    console.log("city" + city); if (city == null) {
        city = "singapore";
    }
    
    request("http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&apikey=a7a7466a61f208c4bb35bed785bd441d", function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

        var obj = JSON.parse(body);
        var list = obj.list[0]; console.log("total length: " + obj.list.length);
        // var tempDate = new Date("2018-11-09T12:00:00+08:00");
        // console.log('tempdate month is ' + tempDate.getMonth());

        var s = ""
        var description = "none found"
        for (var i = 0; i < obj.list.length; i++) {
            var date = new Date(obj.list[i].dt * 1000);
            var s = ""
            var description = "none found";
            for (var i = 0; i < obj.list.length; i++) {
                var date = new Date(obj.list[i].dt * 1000);
                var weather = obj.list[i].weather[0].description;
                if (date.getMonth() == month && date.getDate() == day) {
                    description = weather; description = description + " " + date.toString();
                }
                // s = s + date + " " + weather;
            }
        }
        res.send(JSON.stringify({ "fulfillmentText": description }));
    });
});

// var server = app.listen(8080, function () {
//     var host = '127.0.0.1'
//     var port = '3000'
// //     var host = server.address().address
// //    var port = server.address().port
//     console.log("Example app listening at http://%s:%s", host, port)
//  })
//  server.close();

/*------------------------------------------------------------------------------------------------------*/

// const express = require('express');

// const app = express();

// app.get('/', (req,res) =>{
//     res.send('We are live')
// });

// app.listen(3333, ()=>console.log("Server is live at port 3333"));