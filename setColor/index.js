const axios = require('axios');

const config = {
  headers: {
    Authorization: `Bearer ${process.env.LIFX_TOKEN}`
  }
}

module.exports = async function (context, req) {
  let color = req.query.color;
  let userName = req.query.userName;
    if (color) {
      try {
        const res = await axios.put('https://api.lifx.com/v1/lights/all/state', { color: color }, config)
        context.res = {
          body: res.data.json
        };
        context.bindings.signalRMessage = {
          target: 'colorChanged',
          arguments: [ color, userName ]
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