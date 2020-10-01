/* eslint-disable max-lines-per-function */
const { expect } = require("chai");
const parse = require("../../../message-handler/stats/parse-stats-specific-month");

describe("message-handler", () => {
    describe("stats", () => {
        describe("parse-stats-specific-month", () => {
            it("should return null, first argument isn't /stats", () => {
                expect(parse("sdfsd_sdf_sdf_sdf")).to.equal(null);
            });
            it("should return null, second argument isn't month", () => {
                expect(parse("/stats_sdf_sdf_sdf")).to.equal(null);
            });
            it("should return null not enought arguments", () => {
                expect(parse("/stats_month")).to.equal(null);
            });
            it("should return null month isn't one of months", () => {
                expect(parse("/stats_month_sdf_2000")).to.equal(null);
            });
            it("should return null year length is less than 4", () => {
                expect(parse("/stats_month_January_200")).to.equal(null);
            });
            it("should return null year length is greate than 4", () => {
                expect(parse("/stats_month_January_20000")).to.equal(null);
            });
            it("should return null year isn't a number", () => {
                expect(parse("/stats_month_January_sdsf")).to.equal(null);
            });
            it("should return { month, year }", () => {
                expect(parse("/stats_month_January_2000")).to.deep.equal({
                    month: "January",
                    year: 2000,
                });
            });
        });
    });
});
