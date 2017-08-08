var express = require('express');
var app = express();

var request = require('request');

var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


app.post('/', function (req, res) {
var action=req.body.result.action; //action SR/Incident
var issue= '';
if (action=='Issue')
{
 issue=req.body.result.parameters['issue']; // issue is a required param
var options = {
        method: 'POST',
        url: 'https://dev31468.service-now.com/api/now/v1/table/incident',
        //proxy:'http://proxy.gtm.lilly.com:9000',
        body: {'short_description':issue, 'comments':'logged from MS chat Bot'},
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
var output = 'Incident Number for your issue is: '+incidentNumber +'. Please check on Service Now further details' ;
// Resolve the promise with the output text
console.log(output);
// Return the results of the weather API to API.AI
res.setHeader('Content-Type', 'application/json');
res.send(JSON.stringify({ 'speech': output, 'displayText': output,'source':'service-now-bot' }));
}    
});
}
    else
 issue=req.body.result.parameters['access']; // access is a required param        
})

app.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
