const { JWT_SECRET = "gamenews-super-secret-key" } = process.env;
const { MONGO_URI = "mongodb://127.0.0.1:27017/gamenews_db" } = process.env;

module.exports = {
  JWT_SECRET,
  MONGO_URI,
};
