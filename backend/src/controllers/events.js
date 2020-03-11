const database = require('../database');

exports.list = async (ctx) => {
  const options = {};

  const events = await database.Event.findAll(options);

  const response = {
    results: events,
  };

  ctx.body = response;
};

exports.create = async (ctx) => {
  const params = ctx.request.body;
  console.log(params);

  const event = await database.Event.create({
    temperature: params.data.temperature,
    tag: params.tag.id, 
    humidity: params.humidity,
  });

  ctx.body = event;
  ctx.status = 201;
};
