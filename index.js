'use strict';
module.change_code = 1;
const _ = require("lodash");
const Alexa = require('alexa-app');
const app = new Alexa.app('needjacket');
const doineedajacket = require('./doineedajacket');

app.launch(function(req, res) {
  const prompt = 'For jacket information, tell me the name of a US city';
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});
app.intent('needjacket', {
  'slots': {
    'CITY': 'AMAZON.US_CITY'
  },
  'utterances': ['{-|CITY}', 'do i need a jacket in {-|CITY}']
}, intentNeedJacket);

function intentNeedJacket(req, res) {
    //get city name from slot
    const city = req.slot('CITY');
    const reprompt = 'For jacket information, tell me the name of a US city';
    if (_.isEmpty(city)) {
        console.log("no city provided");
        // user did not provide city. bad user.
        const prompt = 'I didn\'t hear a city name. Tell me the name of a US City.';
        res.say(prompt).reprompt(reprompt).shouldEndSession(false);
        return true;
    } else {
        // user provided a city name
        console.log(`asking doIneedajacket.com about ${city} ...`);
        doineedajacket(city)
            .then(function(info) {
                console.log(info);
                let response = "";
                if (info.needjacket) {
                    response = `You will need a jacket in ${city}`;
                } else {
                    response = `You do not need a jacket in ${city}`;
                }
                res.say(response).send();
            });
        return false;
    }

}

module.exports = app;
