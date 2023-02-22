const regExp = /(https?:\/\/)(w{3}\.)?([a-zA-Z0-9-]{0,63}\.)([a-zA-Z]{2,4})(\/[\w\-._~:/?#[\]@!$&'()*+,;=]#?)?/;
const MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb';

module.exports = {
  regExp,
  MONGO_URL,
};
