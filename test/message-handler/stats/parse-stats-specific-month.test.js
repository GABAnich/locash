/* eslint-disable max-lines */
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
            it("should return { month, year }", () => {
                expect(parse("/stats_month_February_2000")).to.deep.equal({
                    month: "February",
                    year: 2000,
                });
            });
            it("should return { month, year }", () => {
                expect(parse("/stats_month_March_2000")).to.deep.equal({
                    month: "March",
                    year: 2000,
                });
            });
            it("should return { month, year }", () => {
                expect(parse("/stats_month_April_2000")).to.deep.equal({
                    month: "April",
                    year: 2000,
                });
            });
            it("should return { month, year }", () => {
                expect(parse("/stats_month_May_2000")).to.deep.equal({
                    month: "May",
                    year: 2000,
                });
            });
            it("should return { month, year }", () => {
                expect(parse("/stats_month_June_2000")).to.deep.equal({
                    month: "June",
                    year: 2000,
                });
            });
            it("should return { month, year }", () => {
                expect(parse("/stats_month_July_2000")).to.deep.equal({
                    month: "July",
                    year: 2000,
                });
            });
            it("should return { month, year }", () => {
                expect(parse("/stats_month_August_2000")).to.deep.equal({
                    month: "August",
                    year: 2000,
                });
            });
            it("should return { month, year }", () => {
                expect(parse("/stats_month_September_2000")).to.deep.equal({
                    month: "September",
                    year: 2000,
                });
            });
            it("should return { month, year }", () => {
                expect(parse("/stats_month_October_2000")).to.deep.equal({
                    month: "October",
                    year: 2000,
                });
            });
            it("should return { month, year }", () => {
                expect(parse("/stats_month_November_2000")).to.deep.equal({
                    month: "November",
                    year: 2000,
                });
            });
            it("should return { month, year }", () => {
                expect(parse("/stats_month_December_2000")).to.deep.equal({
                    month: "December",
                    year: 2000,
                });
            });
        });
    });
});
