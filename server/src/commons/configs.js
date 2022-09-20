"use strict";

const envSchema = require("env-schema");

const appSchema = {
  type: "object",
  properties: {
    HOST: {
      type: "string",
      default: "127.0.0.1",
    },
    PORT: {
      type: "integer",
      default: 4444,
    },
  },
};

const fastifySchema = {
  type: "object",
  properties: {
    // URLs
    BASE_URL: {
      type: "string",
      default: "https://staging.falabella.com/s",
    },
  },
};

const configs = envSchema({ schema: appSchema, dotenv: true });

module.exports = { configs, fastifySchema };
