const Responses = require('../untils/API_Responses');
const Dynamo = require('../models/Dynamo');
const constant = require('../untils/constants');
const { objectValidateUtils } = require('../untils/data-validate-utils');
const { idToShortURL, validateUrl } = require('../untils/until');
const tableName = process.env.tableName;

const validateRequestData = async (params) => {
    const validate_field_list = [
        { attr: 'origUrl', type: constant.FIELD_VALIDATE_TYPE.REQUIRED },
    ];

    return objectValidateUtils(params, validate_field_list);
};


const businessLogic = async (params) => {

    try {
        const { origUrl } = params.data;
        const valid = await validateRequestData(params.data);
        if (!valid || !validateUrl(origUrl)) {
            return Responses._400({ message: "error-request-data" });
        }

        
        //generated Partition key for dynamodb;
        const lastItem = await Dynamo.getLastItem(tableName);
        console.log("lastItem:", lastItem);
        let count_number = lastItem ? lastItem.count + 1 : 0;




         //generated shortedURL based on count_number;
        const shorted = idToShortURL(count_number);
      
        const URL_Store = await Dynamo.put({shortUrl: shorted, count:count_number, origUrl: origUrl}, tableName).catch(err => {
            console.log('error in dynamo put', err);
            return null;
        });


        if (!URL_Store) {
            return Responses._400({ message: 'Failed to put url' });
        }

        return Responses._200({URL_Store});


    } catch (err) {
        console.log(err);
        return Responses._400({ message: 'Failed to put url' });
    }
}

module.exports = {
    businessLogic,
};