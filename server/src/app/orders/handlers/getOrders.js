"use strict";

const makeGetOrders = require("../services/getOrders");

function getOrdersHandler(fastify) {
  const getOrders = makeGetOrders(fastify);
  return async (request, _reply) => {
    return getOrders(request);
  };
}

module.exports = getOrdersHandler;
