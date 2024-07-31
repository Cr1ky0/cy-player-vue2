const { defineConfig } = require('@vue/cli-service');
const prod = require('./config.prod');
const dev = require('./config.dev');
const config = process.env.NODE_ENV === 'production' ? prod : dev;
module.exports = defineConfig(config);
