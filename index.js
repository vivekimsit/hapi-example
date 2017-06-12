'use strict';
const Hapi = require('hapi');
const Joi = require('joi');
const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 8000
});

server.route({
  method: 'GET',
  path: '/',
  config: {
    handler: function(request, reply) {
      const hello = request.state.hello;
      reply(`Cookies! ${hello}`)
        .state('hello', 'world', {isSecure: false}); // isSecure=false so that its visible in devtools
    }
  }
});

server.start(() => console.log(`Started at: ${server.info.uri}`));
