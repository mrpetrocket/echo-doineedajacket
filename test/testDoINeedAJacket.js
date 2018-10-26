const expect = require("chai").expect;
const doineedajacket = require("../doineedajacket");

describe("doineedajacket", function() {
    it("should return a properly formatted DoINeedAJacketInfo response", async function() {
        const CITY = "Saint Louis MO";
        const response = await doineedajacket(CITY);
        expect(response.city).to.equal(CITY);
        expect(response.needJacket).to.be.a("boolean");
    });
});