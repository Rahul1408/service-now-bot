var express = require('express');
var app = express();

var request = require('request');

var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var host = 'http://api.worldweatheronline.com';
var wwoApiKey = 'e1affc06154840e8be8190125170708';

app.get('/', function (req, res) {
    var bodyjson = {
        "Request": {
            "short_description": "VDI is not working",
            "comments": "These are my comments"
        }
    };
    var options = {
        method: 'POST',
        url: 'https://dev31468.service-now.com/api/now/v1/table/incident',
        proxy:'http://proxy.gtm.lilly.com:9000',
        body: {'short_description':'User getting error', 'comments':'logged from MS chat Bot'},
        json: true,
        headers: { 'Authorization': 'Basic YWRtaW46V2ViQDIwMTc=' }
    };
    console.log('Options' + options);
    request.post(options, (err, resp, body) => {
        if (err) {
      console.log('error: ', err);
} else {
 
var responseJSONObject = JSON.parse(JSON.stringify(body));
var incidentNumber = responseJSONObject.result.number;
console.log(incidentNumber + " number");
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

app.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
