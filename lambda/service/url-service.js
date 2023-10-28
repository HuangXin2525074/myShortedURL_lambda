const createShortedURLInstance = require('../modules/create-shorted-url');
const Responses = require('../untils/API_Responses');


const createShortedURL = async (params) => {
    try {
        const logicResult = await createShortedURLInstance.businessLogic(params);
        return logicResult;

    } catch (err) {
        return Responses._400({ status_code: 400,error_message: err });
    }

}

module.exports = {
    createShortedURL,
};


