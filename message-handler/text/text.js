module.exports = {
    welcomeText: {
        en: `
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
`,
        uk: `
<b>Привіт</b>,
Ви можете тут вести облік ваших витрат та доходів.

<b>Використання</b>:
<code>+15000 зарплата</code>
<code>-20 кава</code>

/stats_day - транзакції за день.
/stats_week - транзакції за тиждень.
/stats_month - транзакції за місяць.
/stats_month_[month]_[year] - транзакції за конкретний місяць.
Приклад: /stats_month_January_2020
/stats_past_seven_day - транзакції за остані 7 днів.
/stats_year - транзакції за рік.
/stats_all - всі транзакції.
/help - більше інформації.
`,
    },
    pleaseTryAgain: {
        en: "Please try again...",
        uk: "Будь ласка спробуйте пізніше...",
    },
    done: {
        en: "Done.\n/help - list of commands",
        uk: "Готово.\n/help - список команд",
    },
    commandNotFound: {
        en: "Command not found",
        uk: "Команду не знайдено",
    },
    noTransactions: {
        en: "There no transactions in this time range.",
        uk: "Немає транзакції за цей період.",
    },
    valueTooBig: {
        en: "Value is too big",
        uk: "Значення занадто велике",
    },
    income: { en: "Income", uk: "Дохід" },
    spending: { en: "Spending", uk: "Витрати" },
    total: { en: "Total", uk: "Підсумок" },
};
