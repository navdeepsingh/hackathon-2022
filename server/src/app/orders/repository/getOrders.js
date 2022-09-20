"use strict";

const makeClient = require("../../../clients/client");

const endpoint = "https://pokeapi.co/api/v2/pokemon/ditto";

function getOrdersRepository(fastify) {
  const client = makeClient(fastify.config, endpoint, { baseURL: "" });

  return async (request) => {
    const response = await client.get(request);
    return { data: response };
  };
}

module.exports = getOrdersRepository;
