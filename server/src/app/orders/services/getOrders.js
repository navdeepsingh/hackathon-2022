"use strict";

const makeGetOrders = require("../repository/getOrders");

function getOrdersService(fastify) {
  const getOrders = makeGetOrders(fastify);

  return async (request) => {
    const {
      data: { orders },
    } = await getOrders(request);

    return {
      orders,
    };
  };
}

module.exports = getOrdersService;
