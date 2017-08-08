var express = require('express');
var app = express()
app.set('port', (process.env.PORT || 7000));
var request = require('request');
var host = 'http://api.worldweatheronline.com';
var wwoApiKey = 'e1affc06154840e8be8190125170708';
app.get('/', function (req, res) {
    var options = {};
    var city=req.body.result.parameters['geo-city']; // city is a required param
    //var city='New York';
    // Get the date for the weather forecast (if present)
    var date = '';
    if (req.body.result.parameters['date']) {
        date = req.body.result.parameters['date'];
        console.log('Date: ' + date);
    }
    console.log('Date: ' + date);    
    var path = '/premium/v1/weather.ashx?format=json&num_of_days=1' +
     '&q=' + encodeURIComponent(city) + '&key=' + wwoApiKey + '&date=' + date;
    console.log('API Request: ' + host + path);
   
    options = {
        url: host + path,        
    };
    request.get(options, (err, resp, body) => {
        if (err) {
      console.log('error: ', err);
} else {
 console.log(body);

// After all the data has been received parse the JSON for desired data
var response = JSON.parse(body);
var forecast = response['data']['weather'][0];
var location = response['data']['request'][0];
var conditions = response['data']['current_condition'][0];
var currentConditions = conditions['weatherDesc'][0]['value'];
// Create response
var output = 'Current conditions in the'+ location['type']+location['query']+' are '+currentConditions+' with a projected high of'+forecast['maxtempC']+'°C or'+forecast['maxtempF']
    +'°F and a low of'+ forecast['mintempC']+'°C or '+forecast['mintempF']+'°F on '+forecast['date'];
// Resolve the promise with the output text
console.log(output);
// Return the results of the weather API to API.AI
res.setHeader('Content-Type', 'application/json');
res.send(JSON.stringify({ 'speech': output, 'displayText': output,'source':'weather-sample' }));
}
});
})
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
module.exports = app;



