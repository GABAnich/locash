# locash

@locash_bot

Locash is free and open-source Telegram bot that solve one problem - keeps track of your money ;)

### Motivation

There a lot of apps that do the same. They might be paid, contains ads, they store your data and doesn't allow you to download  it until you paid. The project exist in order to provide freely ability to track expensives and incomes.


### Features
- track your income/spents
- daily/weekly/monthly/yearly/all/past_seven_days statistics


### Examples

![Example](https://github.com/GABAnich/locash/blob/master/img/example.png)


### How Locash works

![Architecture](https://github.com/GABAnich/locash/blob/master/img/locash-aws-new.png)


### Architecture in future :smirk:

![ArchitectureFuture](https://github.com/GABAnich/locash/blob/master/img/locash-aws-future.png)


### Instalation

1. `nvm use`
2. `npm install`
3. create telegram bot in @BotFather and set [WebHook](https://core.telegram.org/bots/api#setwebhook)
4. Copy `message-handler/credentials.example.json` into `message-handler/credentials.json`
5. Run `docker run -d -p 8000:8000 amazon/dynamodb-local`
6. Run `aws dynamodb create-table --cli-input-json file://transactions.json --endpoint-url http://<local-dynamodb>:8000`


### Example

1. `sam build`
2. `sam local start-api --env-vars env.json`
3. `curl -X POST -H "Content-Type: application/json" -d '{"message":{"chat": {"id": 31}, "text": "-20 coffee", "date": 1601022097 }}' http://127.0.0.1:3000/message/\?token\=<token>`

Or

1. `sam build`
2. `sam local invoke -e events/message2.json MessageHandlerFunction --env-vars env.json`

Echo current date

```bash
echo $(date +%s)
```

