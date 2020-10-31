const path = require("path");
require("dotenv").config();

module.exports = {
  distDir: "build",
  env: {
    API_URL: process.env.API_URL,
    API_OG: process.env.API_OG,
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    API_OG: process.env.API_OG,
  },

  webpack: (config) => {
    config.resolve.alias["components"] = path.join(__dirname, "components");
    config.resolve.alias["public"] = path.join(__dirname, "public");

    return config;
  },
};
