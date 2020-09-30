const isContainNumber = (msg) => /\d/.test(msg);
const removeSpacesTabs = (msg) => msg.replace(/\s\s+/g, " ");
const removeSpacePlusSign = (msg) => msg.replace(/\+ /g, "+");
const removeSpaceMinusSign = (msg) => msg.replace(/- /g, "-");
const replaceNewLinesBySpace = (msg) => msg.replace(/\n/g, " ");
const removeSpaceBeetwenNumbers = (msg) => msg.replace(/(\d)\s+(?=\d)/g, "$1");

module.exports = (msg) => {
    if (!isContainNumber(msg)) {
        return null;
    }

    const formatedMsg = removeSpacePlusSign(
        removeSpaceMinusSign(
            removeSpaceBeetwenNumbers(
                removeSpacesTabs(replaceNewLinesBySpace(msg))
            )
        )
    ).trim();
    const splitedMsg = formatedMsg.trim().split(" ");
    const value = parseFloat(splitedMsg[0]);
    const description = splitedMsg.slice(1).join(" ");

    if (!value) return null;

    return { value, description };
};
