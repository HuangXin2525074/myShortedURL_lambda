const Responses = require('../untils/API_Responses');
const Dynamo = require('../models/Dynamo');

const tableName = process.env.tableName;

exports.handler = async(event) => {
    console.log('event', event);

    if (!event.pathParameters || !event.pathParameters.url) {
        // failed without an ID
        return Responses._400({ message: 'missing the ID from the path' });
    }

    let url = event.pathParameters.url;

    console.log("url:" , url);

    const URL_Store = await Dynamo.get(url, tableName).catch(err => {
        console.log('error in Dynamo Get', err);
        return null;
    });

    if (!URL_Store) {
        return Responses._400({ message: 'Shorted URL NOT FOUND' });
    }

    return Responses._200({ URL_Store });


};

