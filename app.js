const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('We are live')
});

app.listen(3333, () => console.log("Server is live at port 3333"));

app.post('/chat', function (req, res) {
    var request = require('request');

    var city = req.body.queryResult.parameters.city; //fetching city
    var dateString = req.body.queryResult.parameters.date;
    var date = new Date(dateString);
    var month = date.getMonth(); // fetching month from date
    var day = date.getDate(); // fetching day from date

    if (city == null) {
        city = "mumbai";
    }

    request("http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&apikey=a7a7466a61f208c4bb35bed785bd441d", function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

        var obj = JSON.parse(body);
        var list = obj.list[0];
        console.log(list);

        for (var i = 0; i < obj.list.length; i++) {
            var date = new Date(obj.list[i].dt * 1000);
            var weather = obj.list[i].weather[0].description;
            if (date.getMonth() == month && date.getDate() == day) {
                description = "Weather will be like " + weather + " in " + city + " on " + date.toDateString();
                // description = weather; description = description + " " + date.toDateString();
                break;
            }
        }
        res.send(JSON.stringify({ "fulfillmentText": description }));
    });
});
