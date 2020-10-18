/* eslint-disable max-lines-per-function */
const { expect } = require("chai");
const getText = require("../../../message-handler/text/get-text");

describe("message-handler", () => {
    describe("text", () => {
        describe("getText", () => {
            it("should return object with en lang", () => {
                const text = {
                    msg1: { en: "msg1", ua: "мсг1" },
                    msg2: { en: "msg2", ua: "мсг2" },
                };
                const expectText = {
                    msg1: "msg1",
                    msg2: "msg2",
                };
                expect(getText(text, "en")).to.deep.equal(expectText);
            });
            it("should return object with ua lang", () => {
                const text = {
                    msg1: { en: "msg1", ua: "мсг1" },
                    msg2: { en: "msg2", ua: "мсг2" },
                };
                const expectText = {
                    msg1: "мсг1",
                    msg2: "мсг2",
                };
                expect(getText(text, "ua")).to.deep.equal(expectText);
            });
            it("should return object with ua lang, and include en if ua is not present", () => {
                const text = {
                    msg1: { en: "msg1", ua: "мсг1" },
                    msg2: { en: "msg2" },
                };
                const expectText = {
                    msg1: "мсг1",
                    msg2: "msg2",
                };
                expect(getText(text, "ua")).to.deep.equal(expectText);
            });
            it("should return en, as default", () => {
                const text = {
                    msg1: { en: "msg1", ua: "мсг1" },
                    msg2: { en: "msg2", ua: "мсг2" },
                };
                const expectText = {
                    msg1: "msg1",
                    msg2: "msg2",
                };
                expect(getText(text)).to.deep.equal(expectText);
            });
            it("should return empty object", () => {
                expect(getText()).to.deep.equal({});
            });
        });
    });
});
