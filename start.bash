#!/bin/bash

echo "--- Run DynamoDB ---"
docker run -d -p 8000:8000 amazon/dynamodb-local

echo "--- Create Transactions table ---"
aws dynamodb create-table --cli-input-json file://transactions.json --endpoint-url http://127.17.0.2:8000

echo "--- Generate transactions ---"
node generate-transactions/index $1 $2 $3 > data.json

echo "--- Insert data into Transactions ---"
aws dynamodb batch-write-item --request-items file://data.json --endpoint-url http://127.17.0.2:8000     

echo "--- Remove data.json"
rm data.json

echo "--- Sam build ---"
sam build

echo "--- Local start API ---"
sam local start-api --env-vars env.json

