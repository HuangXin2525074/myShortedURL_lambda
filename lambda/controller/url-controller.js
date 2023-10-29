const Responses = require('../untils/API_Responses');
const constant = require('../untils/constants');
const { objectValidateUtils} = require('../untils/data-validate-utils');
const urlService = require('../service/url-service');

const validateRequestData = async (params) => {
  const validate_field_list = [
    { attr: 'method', type: constant.FIELD_VALIDATE_TYPE.REQUIRED },
    { attr: 'data', type: constant.FIELD_VALIDATE_TYPE.REQUIRED },
  ];

  return objectValidateUtils(params, validate_field_list);
};

exports.handler = async (event) => {
  console.log('event', event);
  try {
    const params = JSON.parse(event.body);
    console.log("params:", params);
    const valid = await validateRequestData(params);
    if (!valid) {
      return Responses._400({ status_code: 400,error_message: "error-request-data" });
    }
    const method = params.method;

    switch (method) {
      case 'create-shorted-url':
        return await urlService.createShortedURL(params);
      default:
        return Responses._400({ status_code: 400,error_message: "method not found" });
    }

  } catch (err) {
    console.log("err:", err);
    return Responses._400({ status_code: 400,error_message: "error-request-data" });
  }


};