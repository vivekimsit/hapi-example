'use strict';
const Hapi = require('hapi');
const Joi = require('joi');
const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 8000
});

server.state('hello', {
  ttl: 60 * 60 * 1000,
  isHttpOnly: true,
  isSecure: false,
  encoding: 'iron',
  password: 'a5LewP10pXNbWUdYQakUfVlk1jUVuLuUU6E1WEE302k'
})

server.route({
  method: 'GET',
  path: '/',
  config: {
    handler: function(request, reply) {
      const hello = request.state.hello ? request.state.hello.name : 'guest';
      reply(`Cookies, ${hello}`)
        .state('hello', {name: 'foo'});
    }
  }
});

server.start(() => console.log(`Started at: ${server.info.uri}`));
