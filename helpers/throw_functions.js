function classException(message, code) {
  return {"message": {message}, code};
}

module.exports = {
  classException,
};