"use strict";

const globalRoutes = require("./global/routes");
const ordersRoutes = require("./orders/routes");

async function routes(fastify) {
  fastify.register(globalRoutes);
  fastify.register(ordersRoutes);
}

module.exports = routes;
