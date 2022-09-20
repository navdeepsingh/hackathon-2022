"use strict";

const Fastify = require("fastify");
const fastifyCors = require("@fastify/cors");
const fastifyRoutes = require("fastify-routes");

const routes = require("./app/routes");
const configPlugin = require("./plugins/config");
const { fastifySchema } = require("./commons/configs");

async function create() {
  // eslint-disable-next-line no-console
  console.info("Starting application");

  const fastify = Fastify({
    disableRequestLogging: true,
    trustProxy: true,
  });

  fastify.register(configPlugin(fastifySchema));
  fastify.register(fastifyCors, {
    origin: true,
    methods: ["GET"],
    credentials: true,
    preflightContinue: true,
  });
  fastify.register(fastifyRoutes);
  fastify.register(routes);

  // eslint-disable-next-line no-console
  console.info("Configured server");

  await fastify.ready();

  // eslint-disable-next-line no-console
  console.info("Server is ready to start");

  return fastify;
}

module.exports = { create };
