const express = require('express');
const app = express();

const bodyParser = require('body-parser');
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
    console.log("Test");
    request("http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&apikey=a7a7466a61f208c4bb35bed785bd441d", function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

        var obj = JSON.parse(body);
        var list = obj.list;

        var result = list.filter(getDescription);
        function getDescription(x) {
            var date1=new Date(x.dt*1000);
            return date.getMonth()== month && date.getDate() == day ;
        }

        // console.log("result",result);
        var description = "Weather will be " + result[1].weather[0].description + " in " + city + " on " + date.toDateString();
        // console.log("description:",description);
        res.send(JSON.stringify({ "fulfillmentText": description }));
    });

});
