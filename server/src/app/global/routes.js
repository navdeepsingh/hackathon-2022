"use strict";

const healthHandler = require("./handlers/health");
const healthSchema = require("./schema/health");

async function routes(fastify) {
  fastify.get("/health", { schema: healthSchema }, healthHandler);
}

module.exports = routes;
