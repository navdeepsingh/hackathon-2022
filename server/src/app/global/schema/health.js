"use strict";

const schema = {
  tags: ["Health"],
  summary: "Check the health of the service",
  description: "",
  response: {
    200: {
      description: "The service is healthy and ready to receive requests.",
      type: "object",
      properties: {
        health: { type: "string" },
      },
    },
  },
};

module.exports = schema;
