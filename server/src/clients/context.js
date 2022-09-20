"use strict";

const { URL } = require("url");
const { buildURL } = require("../lib/url");

class Context {
  constructor({
    getHeaders,
    name,
    method,
    request,
    baseURL,
    endpoint,
    pathVariables,
    data,
    timeout,
    forwardedHeaders = [],
    extraHeaders,
    warnOnStatusCodes = [],
    warnOnErrorCodes = [],
    addQueryParams = {},
  }) {
    this.getHeaders = getHeaders;
    this.name = name;
    this.method = method;
    this.request = request;
    this.baseURL = baseURL;
    this.endpoint = endpoint;
    this.pathVariables = pathVariables;
    this.data = data;
    this.timeout = timeout;
    this.forwardedHeaders = forwardedHeaders;
    this.extraHeaders = extraHeaders;
    this.warnOnStatusCodes = warnOnStatusCodes;
    this.warnOnErrorCodes = warnOnErrorCodes;
    this.addQueryParams = addQueryParams;
  }

  getUrl() {
    const url = new URL(
      this.baseURL + buildURL(this.endpoint, this.pathVariables)
    );

    Object.keys(this.addQueryParams).forEach((key) => {
      url.searchParams.append(key, this.addQueryParams[key]);
    });

    return url.toString();
  }

  getRequestHeaders() {
    return this.getHeaders(this.request, {
      forwardedHeaders: this.forwardedHeaders,
      extraHeaders: this.extraHeaders,
    });
  }
}

module.exports = Context;
