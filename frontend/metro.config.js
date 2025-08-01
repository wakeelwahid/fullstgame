
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Customize the config before returning it.
config.resolver.assetExts.push(
  // Adds support for `.db` files for SQLite databases
  'db'
);

module.exports = config;
