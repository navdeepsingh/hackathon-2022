"use strict";

const fastifyPlugin = require("fastify-plugin");
const fastifyEnv = require("@fastify/env");

function config(configSchema) {
  return fastifyPlugin((fastify, opts, next) => {
    fastify.register(fastifyEnv, { schema: configSchema, data: opts });
    next();
  });
}

module.exports = config;
