const isContainNumber = (msg) => /\d/.test(msg);
const removeSpacesTabsNewLines = (msg) => msg.replace(/\s\s+/g, " ");
const removeSpaceAfterSign = (msg) => msg.replace(/\+ |\- /g, "");

module.exports = (msg) => {
    if (!isContainNumber(msg)) {
        return null;
    } 

    const formatedMsg = removeSpaceAfterSign(removeSpacesTabsNewLines(msg).trim());
    const splitedMsg = formatedMsg.trim().split(" ");
    const value = parseFloat(splitedMsg[0]);
    const description = splitedMsg.slice(1).join(" ");

    return { value, description };
};
