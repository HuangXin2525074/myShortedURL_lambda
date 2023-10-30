const Responses = require("../untils/API_Responses");
const Dynamo = require("../models/Dynamo");
const constant = require("../untils/constants");
const { objectValidateUtils } = require("../untils/data-validate-utils");
const { idToShortURL, validateUrl } = require("../untils/until");
const config = require("../config/config.json");
const tableName = process.env.tableName;

const validateRequestData = async (params) => {
  const validate_field_list = [
    { attr: "origUrl", type: constant.FIELD_VALIDATE_TYPE.REQUIRED },
  ];

  return objectValidateUtils(params, validate_field_list);
};

const businessLogic = async (params) => {
  try {
    const { origUrl } = params.data;
    const valid = await validateRequestData(params.data);
    if (!valid || !validateUrl(origUrl)) {
      return Responses._400({
        status_code: 400,
        message: "error-request-data",
      });
    }

    let convert_url;
    // checking http/https included or not
    if (!/^https?:\/\//.test(origUrl)) {
      convert_url = "http://" + origUrl;
    } else {
      convert_url = origUrl;
    }

    //generated Partition key for dynamodb;
    const lastItem = await Dynamo.getLastItem(tableName);
    console.log("lastItem:", lastItem);
    let count_number = lastItem ? lastItem.count + 1 : 0;

    let shorted;

    while (!shorted) {
      //generated shortedURL based on count_number;
      shorted = idToShortURL(count_number);
      count_number++;
    }

    const URL_Store = await Dynamo.put(
      { shortUrl: shorted, count: count_number, origUrl: convert_url },
      tableName
    ).catch((err) => {
      console.log("error in dynamo put", err);
      return null;
    });

    if (!URL_Store) {
      return Responses._400({
        status_code: 400,
        error_message: "Failed to put url",
      });
    }

    URL_Store.shortUrl = `${config.SERVER_URL}/${shorted}`;

    return Responses._200({ URL_Store });
  } catch (err) {
    console.log(err);
    return Responses._400({
      status_code: 400,
      error_message: "Failed to put url",
    });
  }
};

module.exports = {
  businessLogic,
};
