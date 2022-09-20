"use strict";

const schema = {
  tags: ["Orders"],
  summary: "",
  description: "",
  response: {
    200: {
      description: "",
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            orders: { type: "array" },
          },
        },
      },
    },
  },
};

module.exports = schema;
