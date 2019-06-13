module.exports.parseResponse = (response) => {
  let error_description = 'Undefined error';
  let error_code = 99;
  let error_name = 'Unknown';
  if (typeof response === 'string') {
    error_description = response;
  } else {
    if (response instanceof Object) {
      if (response.hasOwnProperty('error')) {
        const error = response.error;
        error_description = error.error_description;
        error_code = error.error_code;
        error_name = error.name;
      } else {
        // error_code = error.error_code;
        error_name = response.name;
        error_description = response.message;
      }
    } else {
      if (response.hasOwnProperty('error_description')) {
        error_description = response.error_description;
      } else {

      }
      if (response.hasOwnProperty('error_code')) {
        error_code = response.error_code;
      } else {

      }
    }
  }
  return { error_code, error_name, error_description };
};

module.exports.globalHandler = (err, req, res, next) => {
  res.status(400);
  res.send(parseResponse(err));
};