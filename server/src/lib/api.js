"use strict";

const http = require("http");
const https = require("https");
const axios = require("axios");
const { TIMEOUT_ERROR, INTERNAL_SERVER_ERROR } = require("../error/errorCodes");

const keepAliveHttpAgent = new http.Agent({
  keepAlive: true,
  scheduling: "lifo",
});

const keepAliveHttpsAgent = new https.Agent({
  keepAlive: true,
  scheduling: "lifo",
});

function getForwardedHeaders(headers) {
  return {
    accept: "application/json",
    "content-type": "application/json",
    ...headers,
  };
}

const RemoteServerTimeoutError = {
  status: 500,
  statusText: "Internal Server Error",
  headers: {},
  data: {
    errors: [
      {
        code: TIMEOUT_ERROR,
        message: "Remote server did not respond within expected time",
      },
    ],
  },
};

const RemoteServerConnectionReset = {
  status: 500,
  statusText: "Internal Server Error",
  headers: {},
  data: {
    errors: [
      {
        code: INTERNAL_SERVER_ERROR,
        message: "Connection was reset by remote server",
      },
    ],
  },
};
const DNSLookupError = {
  status: 500,
  statusText: "Internal Server Error",
  headers: {},
  data: {
    errors: [
      {
        code: INTERNAL_SERVER_ERROR,
        message: "DNS lookup failed",
      },
    ],
  },
};

const RemoteServerInternalError = {
  status: 500,
  statusText: "Internal Server Error",
  headers: {},
  data: {
    errors: [
      {
        code: INTERNAL_SERVER_ERROR,
        message: "Remote server did not respond",
      },
    ],
  },
};

const errorCodeToErrorResponseLookup = {
  ECONNABORTED: RemoteServerTimeoutError,
  ECONNRESET: RemoteServerConnectionReset,
  EAI_AGAIN: DNSLookupError,
};

function getErrorResponseFromErrorCode(errorCode) {
  return errorCodeToErrorResponseLookup[errorCode] || RemoteServerInternalError;
}

async function api(method, url, timeout, data, headers = {}) {
  const childError = new Error(`Request failed ${method} ${url}`);
  try {
    return await axios({
      method,
      url,
      data,
      headers: getForwardedHeaders(headers),
      httpAgent: keepAliveHttpAgent,
      httpsAgent: keepAliveHttpsAgent,
      timeout,
    });
  } catch (error) {
    if (!error.response) {
      error.response = getErrorResponseFromErrorCode(error.code);
      error.remoteResponseCode = "ClientError";
    } else {
      error.remoteResponseCode = error.response.status;
    }
    error.innerError = childError;
    throw error;
  }
}

module.exports = api;
