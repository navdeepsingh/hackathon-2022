"use strict";

const getOrdersSchema = require("./schema/getOrders");
const getOrdersHandler = require("./handlers/getOrders");

async function routes(fastify) {
  fastify.get(
    "/orders",
    { schema: getOrdersSchema },
    getOrdersHandler(fastify)
  );
}

module.exports = routes;
