const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';
const keys = require('./keys');

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'portfolio'
    },
    port: process.env.PORT || 3000,
    db: keys.db.mlab
  },

  test: {
    root: rootPath,
    app: {
      name: 'portfolio'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/portfolio-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'portfolio'
    },
    port: process.env.PORT || 3000,
    db: keys.db.mlab
  }
};

module.exports = config[env];
