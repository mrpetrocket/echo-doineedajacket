/**
 * @class
 * Represents info scraped from doineedajacket.com
 * @property {String} city
 * @property {Boolean} needJacket
 */
class DoINeedAJacketInfo {
    constructor(city, needJacket) {
        this.city = city;
        this.needJacket = needjacket;
    }
};

module.exports = DoINeedAJacketInfo;