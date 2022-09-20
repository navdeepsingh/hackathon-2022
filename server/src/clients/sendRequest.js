"use strict";

const apiClient = require("../lib/api");

async function sendRequest(context) {
  const url = context.getUrl();
  const headers = context.getRequestHeaders();
  return apiClient(context.method, url, context.timeout, context.data, headers);
}

module.exports = { sendRequest };
