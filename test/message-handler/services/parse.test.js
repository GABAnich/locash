const { expect } = require("chai");
const parse = require("../../../message-handler/transaction/parse");

const validMsg = "-6 transport";
const invalidMsg = "tr";

describe("message-handler", () => {
    describe("services", () => {
        describe("parse function", () => {
            it("should return object", () => {
                expect(parse(validMsg)).to.be.a("object");
            });
            it("should return null", () => {
                expect(parse(invalidMsg)).to.equal(null);
            });
            it("should return object with value", () => {
                expect(parse(validMsg)).to.have.property("value");
            });
            it("should return value type number", () => {
                expect(parse(validMsg))
                    .to.have.property("value")
                    .that.is.a("number");
            });
            it("should return description", () => {
                expect(parse(validMsg)).to.have.property("description");
            });
            it("should return description string", () => {
                expect(parse(validMsg))
                    .to.have.property("description")
                    .that.is.a("string");
            });
        });
        describe("parse cases", () => {
            it("should parse, valid msg", () => {
                expect(parse("-6 transport")).to.deep.equal({
                    value: -6,
                    description: "transport"
                });
            });
            it("should parse, string with spaces at begining", () => {
                expect(parse(" -6 transport")).to.deep.equal({
                    value: -6,
                    description: "transport"
                });
            });
            it("should parse, string with spaces at end", () => {
                expect(parse("-6 transport  ")).to.deep.equal({
                    value: -6,
                    description: "transport"
                });
            });
            it("should parse with spaces around", () => {
                expect(parse("  -6 transport  ")).to.deep.equal({
                    value: -6,
                    description: "transport"
                });
            });
            it("should parse number with sign", () => {
                expect(parse("-6 transport")).to.deep.equal({
                    value: -6,
                    description: "transport"
                });
            });
            it("should parse number without sign", () => {
                expect(parse("6 salary")).to.deep.equal({
                    value: 6,
                    description: "salary"
                });
            });
            it("should parse number with sign and space", () => {
                expect(parse("- 6 food")).to.deep.equal({
                    value: -6,
                    description: "food"
                });
            });
            it("should parse number with spaces between", () => {
                expect(parse("15 000 sdds")).to.deep.equal({
                    value: 15000,
                    description: "sdds"
                });
            });
            it("should parse number with spaces between", () => {
                expect(parse("15   0  0 0 sdds")).to.deep.equal({
                    value: 15000,
                    description: "sdds"
                });
            });
            it("should parse description with multiple words", () => {
                expect(parse("16000 some good project on freelance")).to.deep.equal(
                    {
                        value: 16000,
                        description: "some good project on freelance"
                    }
                );
            });
            it("should parse description with multiple lines", () => {
                expect(parse("6 text \n test \n dsds")).to.deep.equal({
                    value: 6,
                    description: "text test dsds"
                });
            });
            it("should parse description without spaces on start and end", () => {
                expect(parse("6   text \n test \n dsds  ")).to.deep.equal({
                    value: 6,
                    description: "text test dsds"
                });
            });
            it("should parse valid value and description", () => {
                expect(parse("150.   Jjjk")).to.deep.equal({
                    value: 150,
                    description: "Jjjk"
                });
            });
            it("should parse valid value and description new line", () => {
                expect(parse("+ 150 fjjjbc\nGhj")).to.deep.equal({
                    value: 150,
                    description: "fjjjbc Ghj"
                });
            });
            it("should parse valid value and description", () => {
                expect(parse("+150\nFhjj")).to.deep.equal({
                    value: 150,
                    description: "Fhjj"
                });
            });
            it("should return null", () => {
                expect(parse("sdf5545 sdfsdf")).to.equal(null);
            });
        });
    });
})
