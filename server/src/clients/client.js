"use strict";

const Context = require("./context");
const { sendRequest } = require("./sendRequest");

function sanitizeHeader(header) {
  return Object.keys(header).reduce(
    (acc, key) =>
      header[key] === undefined ? acc : { ...acc, [key]: header[key] },
    {}
  );
}

function getHeaders(request, { extraHeaders }) {
  const { headers } = request;

  return sanitizeHeader({
    ...headers,
    ...extraHeaders,
  });
}

async function act(context) {
  try {
    return await sendRequest(context);
  } catch (error) {
    throw new Error(error);
  }
}

function client(
  config,
  endpoint,
  {
    baseURL: overriddenBaseURL,
    timeout = 0,
    warnOnStatusCodes = [],
    warnOnErrorCodes = [],
  } = {}
) {
  const baseURL = overriddenBaseURL || config.BASE_URL;

  async function get(
    request,
    {
      pathVariables = {},
      extraHeaders = {},
      timeoutFromConfig = false,
      addQueryParams = {},
    } = {}
  ) {
    const context = new Context({
      getHeaders,
      name: "FA API",
      method: "GET",
      request,
      baseURL,
      endpoint,
      pathVariables,
      extraHeaders,
      data: undefined,
      timeout: timeoutFromConfig || timeout,
      warnOnStatusCodes,
      warnOnErrorCodes,
      addQueryParams,
    });
    return act(context);
  }

  async function post(
    request,
    {
      pathVariables = {},
      extraHeaders = {},
      data = {},
      timeoutFromConfig,
      addQueryParams = {},
    } = {}
  ) {
    const context = new Context({
      getHeaders,
      name: "FA API",
      method: "POST",
      request,
      baseURL,
      endpoint,
      pathVariables,
      extraHeaders,
      data,
      timeout: timeoutFromConfig || timeout,
      warnOnStatusCodes,
      warnOnErrorCodes,
      addQueryParams,
    });
    return act(context);
  }

  async function put(
    request,
    {
      pathVariables = {},
      extraHeaders = {},
      data = {},
      timeoutFromConfig,
      addQueryParams = {},
    } = {}
  ) {
    const context = new Context({
      getHeaders,
      name: "FA API",
      method: "PUT",
      request,
      baseURL,
      endpoint,
      pathVariables,
      extraHeaders,
      data,
      timeout: timeoutFromConfig || timeout,
      warnOnStatusCodes,
      warnOnErrorCodes,
      addQueryParams,
    });
    return act(context);
  }

  async function patch(
    request,
    {
      pathVariables = {},
      extraHeaders = {},
      data = {},
      timeoutFromConfig,
      addQueryParams = {},
    } = {}
  ) {
    const context = new Context({
      getHeaders,
      name: "FA API",
      method: "PATCH",
      request,
      baseURL,
      endpoint,
      pathVariables,
      extraHeaders,
      data,
      timeout: timeoutFromConfig || timeout,
      warnOnStatusCodes,
      warnOnErrorCodes,
      addQueryParams,
    });
    return act(context);
  }

  // Using del as method name because delete is reserved keyword
  async function del(
    request,
    {
      pathVariables = {},
      extraHeaders = {},
      timeoutFromConfig = false,
      addQueryParams = {},
    } = {}
  ) {
    const context = new Context({
      getHeaders,
      name: "FA API",
      method: "DELETE",
      request,
      baseURL,
      endpoint,
      pathVariables,
      extraHeaders,
      data: {},
      timeout: timeoutFromConfig || timeout,
      warnOnStatusCodes,
      warnOnErrorCodes,
      addQueryParams,
    });
    return act(context);
  }

  return { get, post, put, patch, del };
}

module.exports = client;
