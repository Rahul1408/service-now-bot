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
 issue=req.body.result.parameters["description"]; // issue is a required param
var options = {
        method: 'POST',
        url: 'https://dev31468.service-now.com/api/now/v1/table/incident',

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
var output = 'I have raised the incident in Service Now for your issue '+issue+'. Incident Number for your issue is: '+incidentNumber +'. Please check on Service Now for further details or contact us on https://knome.ultimatix.net/communities/16066buittechnicallab';
// Resolve the promise with the output text
console.log(output);
// Return the results of the weather API to API.AI
res.setHeader('Content-Type', 'application/json');
res.send(JSON.stringify({ 'speech': output, 'displayText': output,'source':'service-now-bot' }));
}    
});
}
    else if(action=='Access')
    {
 issue=req.body.result.parameters['projectName']; // access is a required param        
        var options = {
        method: 'POST',
        url: 'https://dev31468.service-now.com/api/now/v1/table/sc_req_item',
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
var SRNumber = responseJSONObject.result.number;
console.log(SRNumber + " SRNumber");
// Create response
var output = 'I have raised the Service Request in Service Now for your access on '+issue+'. SR Number is: '+SRNumber +'. Please check on Service Now for further details or contact us on https://knome.ultimatix.net/communities/16066buittechnicallab';
// Resolve the promise with the output text
console.log(output);
// Return the results of the weather API to API.AI
    res.setHeader('Content-Type', 'application/json');
res.send(JSON.stringify({ 'speech': output, 'displayText': output,'source':'service-now-bot' }));
    }

});
    }
})
app.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
