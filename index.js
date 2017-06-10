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
      server.log('error', 'Oh, no!');
      server.log('info', 'replying');
      reply('Hello, Hapi');
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
