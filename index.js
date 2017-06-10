'use strict';
const Hapi = require('hapi');
const Boom = require('boom');
const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 8000
});

server.register(require('vision'), () => {

  server.views({
    engines: {
      hbs: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'views'
  });

  server.ext('onPreResponse', (request, reply) => {
    const resp = request.response;
    if (!resp.isBoom) return reply.continue; // continue normal flow

    reply.view('error', resp.output.payload)
      .code(resp.output.statusCode);
  });

  server.route({
    method: 'GET',
    path: '/{name?}',
    handler: (request, reply) => {
      reply(Boom.badRequest());
    }
  });

  server.start(() => console.log(`Started at: ${server.info.uri}`));
});
