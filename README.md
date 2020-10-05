# locash

@locash_bot

Locash is free and open-source Telegram bot that solve one problem - keeps track of your money ;)

### Motivation

There a lot of apps that do the same. They might be paid, contains ads, they store your data and doesn't allow you to download  it until you paid. The project exist in order to provide freely ability to track expensives and incomes.


### Features
- track your income/spents
- daily/weekly/monthly/yearly/all/past_seven_days statistics


### Examples

`Some photos` - will be in future


### Architecture or How Locash works

image of architecture


### Instalation

!!! not done

1. create telegram bot in @BotFather and set [WebHook](https://core.telegram.org/bots/api#setwebhook)
2. Setup `message-handler/credentials.json`
  2.1 `
  {
      "TELEGRAM_TOKEN": "<token>",
      "LOCAL_ENDPOINT": "responsible for AWS DynamoDB local instance"
  }`
3. `nvm use`
4. `npm install`
5. `sam local start-api`
6. `curl -X POST -H "Content-Type: application/json" -d '{"message":{"chat": {"id": 31}, "text": "-20 coffee", "date": 1601022097 }}' http://127.0.0.1:3000/message/\?token\=<token>`


