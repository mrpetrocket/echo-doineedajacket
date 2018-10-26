const cheerio = require("cheerio");
const DoINeedAJacketInfo = require("./DoINeedAJacketInfo");
const request = require("request-promise");

/**
 * Parses doineedajacket.com into a usable structure
 * @param city City name
 * @returns {Promise<DoINeedAJacketInfo>}
 */
function getJacketInfo(city) {
    const url = `https://doineedajacket.com/weather/${encodeURIComponent(city)}`;
    return request.get(url)
        .then(function(html) {
            const $ = cheerio.load(html);
            const needJacket = $("#div_dinaj > h1").html().trim().toLowerCase() === "yes";
            return new DoINeedAJacketInfo(city, needJacket);
        });
}

module.exports = getJacketInfo;
