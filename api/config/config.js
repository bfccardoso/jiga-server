const path = require('path');
// config/config.js
module.exports = {
  PORT: 3000,
  API_PORT: 4000,
  DB_NAME: 'db.db',
  DB_PATH: path.join(__dirname, '..', 'db', 'db.db')
};
