const _ = require('lodash');
const constant = require('./constants');


const objectValidateUtils = (org_data, validate_field_list) => {
  let flag = true;

  validate_field_list.forEach(row => {
    if (flag) {
      const current_data = row.attr ? org_data[row.attr] : org_data;
      switch (row.type) {
        case constant.FIELD_VALIDATE_TYPE.REQUIRED:
          if (_.isNull(current_data) || _.isUndefined(current_data) || (_.isString(current_data) && current_data.length <= 0)) { flag = false; }
          break;
        case constant.FIELD_VALIDATE_TYPE.INT:
          if (current_data && !_.isInteger(current_data)) { flag = false; }
          break;
        case constant.FIELD_VALIDATE_TYPE.NUMBER:
          if (current_data && !_.isFinite(current_data)) { flag = false; }
          break;
        case constant.FIELD_VALIDATE_TYPE.BOOL:
          if (current_data && !_.isBoolean(current_data)) { flag = false; }
          break;
      }
    }
    if (!flag) { console.log('validate request data:', { org_data, row }); }
  });

  return flag;
};

module.exports = {
  objectValidateUtils,
};
