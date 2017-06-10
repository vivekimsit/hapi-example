'use strict';
const Hapi = require('hapi');
const Joi = require('joi');
const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 8000
});

server.route({
  method: ['POST','PUT'],
  path: '/user/{id?}',
  config: {
    validate: {
      params: Joi.object().keys({
        id: Joi.number()
      }),
      payload: Joi.object().keys({
        id: Joi.number(),
        email: Joi.string()
      }).unknown(),
      query: Joi.object().keys({
        id: Joi.number()
      })
    },
    handler: function(request, reply) {
      reply({
        params: request.params,
        query: request.query,
        payload: request.payload
      })
    }
  }
});

server.start(() => console.log(`Started at: ${server.info.uri}`));
