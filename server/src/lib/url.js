"use strict";

const template = require("url-template");

function buildURL(rawURL, pathVariables) {
  const parser = template.parse(rawURL);
  return parser.expand(pathVariables);
}

module.exports = { buildURL };
