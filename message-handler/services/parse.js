const isContainNumber = (msg) => /\d/.test(msg);

module.exports = (msg) => {
    if (!isContainNumber(msg)) {
        return null;
    } 

    const splitedMsg = msg.trim().split(" ");
    const value = parseFloat(splitedMsg[0]);
    const description = splitedMsg.slice(1).join(" ");

    return { value, description };
};
