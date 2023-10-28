const AWS = require('aws-sdk');
const Responses = require('../untils/API_Responses');
const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.tableName;

exports.handler  = async(event) => {
    console.log('event', event);

    if (!event.pathParameters || !event.pathParameters.url) {
        // failed without an url
        return Responses._400({ status_code: 400,error_message: 'missing the ID from the path' });
    }


    const {url} = event.pathParameters;
    console.log("url:" , url);

    const queryResponse = await docClient.query({
        TableName: tableName,
        Key:{
          shortUrl: url
        },
        KeyConditionExpression: "shortUrl = :v_url",
        ExpressionAttributeValues: {
          ":v_url": url
        },
      }).promise();

    if (queryResponse.Items.length < 1) {
        return Responses._404({ status_code: 404,error_message: 'URL NOT FOUND' });
    }

    console.log("origUrl:",queryResponse.Items[0].origUrl);

    return Responses._302(queryResponse.Items[0].origUrl);

};

