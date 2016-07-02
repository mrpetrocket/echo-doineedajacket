var cheerio = require("cheerio");
var request = require("request-promise");

/**
 * Parses doineedajacket.com into a usable structure
 * @param city City name
 * @returns Promise, resolves to info structure like this:
 * { city: string, needjacket: boolean }
 */
function getJacketInfo(city) {
    var url = "https://doineedajacket.com/weather/" + encodeURIComponent(city);
    return request.get(url)
        .then(function(html) {
            var $ = cheerio.load(html);
            var needJacket = $("#div_dinaj > h1").html().trim().toLowerCase() === "yes";
            return {
                city: city,
                needjacket: needJacket
            };
        })
}

module.exports = getJacketInfo;
