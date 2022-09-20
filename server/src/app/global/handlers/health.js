"use strict";

async function healthHandler(_request, _reply) {
  return { health: "OK" };
}

module.exports = healthHandler;
