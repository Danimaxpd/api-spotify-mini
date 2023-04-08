'use strict'

// Read the .env file.
require('dotenv').config()

// Require the framework
import Fastify from "fastify"

// Require library to exit fastify process, gracefully (if possible)
const closeWithGrace = require('close-with-grace')



// Instantiate Fastify with some config
const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
}
const app = Fastify({
  logger: envToLogger[environment] ?? true
})
// Register your application as a normal plugin.
const appService = require('./app.js')
app.register(appService);

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace({ delay: 500 }, async function ({ signal, err, manual }) {
  if (err) {
    app.log.error(err)
  }
  await app.close()
})

app.addHook('onClose', (instance, done) => {
  closeListeners.uninstall()
  done()
})

// Start listening.
app.listen({ port: process.env.PORT || 3000 }, '0.0.0.0', (err) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})