"use strict";

require("make-promises-safe");
const once = require("lodash.once");
const { configs } = require("./src/commons/configs");
const { create: createServer } = require("./src/index");

async function stopFastify(fastify) {
  fastify.log.info("Stopping service");
  await fastify.close();
  fastify.log.info("Stopped");
}

function addSignalListeners(fastify) {
  async function close() {
    try {
      await stopFastify(fastify);
    } catch (err) {
      fastify.log.error(err, "Error stopping server");
      process.exit(1);
    }
  }

  const closeOnce = once(close);

  const signals = ["SIGTERM", "SIGINT"];
  signals.forEach((signal) => {
    process.on(signal, async () => {
      fastify.log.info(`Received ${signal}`);
      await closeOnce(fastify);
    });
  });
}

async function startFastify(fastify) {
  try {
    await fastify.listen(configs.PORT, configs.HOST);
    addSignalListeners(fastify);
  } catch (err) {
    fastify.log.error(err, "Error starting service");
    process.exit(1);
  }
}

async function start() {
  const fastify = await createServer();

  await fastify.ready();
  await startFastify(fastify);
}

try {
  start();
} catch (error) {
  // eslint-disable-next-line no-console
  console.error(error);
}
