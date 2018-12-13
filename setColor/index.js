const axios = require('axios');
const LIFX = require('lifx-http-api');

let client = process.env.LIFX_TOKEN && new LIFX({
  bearerToken: process.env.LIFX_TOKEN
});

module.exports = async function (context, req) {
    let color = req.query.color;
    if (color) {
      try {
        if (client) {
          let result = await client.setState('all', { color, brightness: 1.0 });

          context.res = {
            body: result
          };
        }
        context.bindings.signalRMessage = {
          target: 'colorChanged',
          arguments: [ color ]
        };
      }
      catch (err) {
        context.res = {
          status: 500,
          body: err
        };
      }
    }
    else {
      context.res = {
        status: 500,
        body: 'Please pass the color parameter'
      }
    }
};