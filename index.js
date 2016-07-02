'use strict';
module.change_code = 1;
var _ = require("lodash");
var Alexa = require('alexa-app');
var app = new Alexa.app('needjacket');
var doineedajacket = require('./doineedajacket');

app.launch(function(req, res) {
  var prompt = 'For jacket information, tell me the name of a US city';
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});
app.intent('needjacket', {
  'slots': {
    'CITY': 'AMAZON.US_CITY'
  },
  'utterances': ['{-|CITY}', 'do i need a jacket in {-|CITY}']
},
  function(req, res) {
    //get the slot
    var city = req.slot('CITY');
    var reprompt = 'For jacket information, tell me the name of a US city';
    if (_.isEmpty(city)) {
        console.log("no city provided");
        // user did not provide city. bad user.
        var prompt = 'I didn\'t hear a city name. Tell me the name of a US City.';
        res.say(prompt).reprompt(reprompt).shouldEndSession(false);
        return true;
    } else {
        // user provided a city name
        console.log("asking doIneedajacket.com about " + city + " ...");
        doineedajacket(city)
            .then(function(info) {
                console.log(info);
                if (info.needjacket) {
                    res.say("You will need a jacket in " + city).send();
                } else {
                    res.say("You do not need a jacket in " + city).send();
                }
            });
        return false;
    }

  }
);

module.exports = app;
