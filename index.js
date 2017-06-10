'use strict';
const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000
});

const goodOptions = {
  reporters: {
    reporter: [{
      module: 'good-console',
      args: [{log: '*', response: '*'}]
    }, 'stdout'],
  }
};

server.register({
  register: require('good'),
  options: goodOptions,
}, err => {
  server.route({
    method: 'GET',
    path: '/',
    handler: (response, reply) => {
      // reply('Hello, Hapi'); content-type: text/html
      // reply({hello: 'world'}); content-type: application/json
      // reply(Promise.resolve('Hello, world')); Promise is supported too
      // reply(new Error('Oops')); 500 Internal Server Error
      reply(require('fs').createReadStream(__filename));
    }
  });

  server.route({
    method: 'GET',
    path: '/{name}',
    handler: (response, reply) => {
      reply(`Hello, ${request.params.name}`);
    }
  });

  server.start(() => console.log(`Started at: ${server.info.uri}`));
});
