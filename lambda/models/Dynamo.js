const AWS = require("aws-sdk");

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
  async get(shortUrl, TableName) {
    const params = {
      TableName,
      Key: {
        shortUrl: shortUrl,
      },
    };

    const data = await documentClient.get(params).promise();

    if (!data || !data.Item) {
      throw Error(
        `There was an error fetching the data for ${shortUrl} from ${TableName}`
      );
    }
    console.log(data);

    return data.Item;
  },
  async put(data, TableName) {
    const params = {
      TableName,
      Item: {
        origUrl: data.origUrl,
        shortUrl: data.shortUrl,
        count: data.count,
      },
    };

    const res = await documentClient.put(params).promise();

    if (!res) {
      throw Error(`There was an error inserting ${data} in table ${TableName}`);
    }

    return data;
  },

  async getLastItem(TableName) {
    const params = {
      TableName: TableName,
    };
    let lastItem;
    await documentClient
      .scan(params, async (err, data) => {
        if (err) {
          console.error("Error scanning DynamoDB table:", err);
        } else {
          // Sort the results by the count
          const sortedItems = data.Items.sort((a, b) => b.count - a.count);

          // Retrieve the last item
          lastItem = sortedItems[0];
        }
      })
      .promise();

    return lastItem;
  },
};
module.exports = Dynamo;
