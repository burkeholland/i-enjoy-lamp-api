const axios = require('axios');
const LIFX = require('lifx-http-api');

let client = new LIFX({
  bearerToken: process.env.LIFX_TOKEN
});

module.exports = async function (context, req) {
    if (req.query.color) {
      try {
        let result = await client.setState('all', { color: `${req.query.color}`, brightness: 1.0 });

        context.res = {
          body: result
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