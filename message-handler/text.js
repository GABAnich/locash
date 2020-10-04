module.exports.welcomeText = `
<b>Hi</b>,
You can track your expenses and incomes here.

<b>Usage</b>:
<code>+15000 salary</code>
<code>-20 coffee</code>

/stats_day - your daily transactions.
/stats_week - your weekly transactions.
/stats_month - your monthly transactions.
/stats_month_[month]_[year] - your transactions in specific month.
Example: /stats_month_January_2020
/stats_past_seven_day - your transactions in last 7 days.
/stats_year - your yearly transactions.
/stats_all - your all transactions.
/help - more information.
`;

module.exports.pleaseTryAgain = "Please try again...";

module.exports.done = "Done.\n/help - list of commands";

module.exports.commandNotFound = "Command not found";

module.exports.noTransactions = "There no transactions in this time range.";

module.exports.valueTooBig = "Value is too big";
