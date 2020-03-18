const database = require('../database');
const { Op } = require('sequelize')

exports.list = async (ctx) => {
  const { tag, id } = (ctx.query);

  const tago = tag ? {tag: tag} : {};

  const idint = parseInt(id);
  const ido = Number.isInteger(idint) ? {id: {[Op.gt]:idint}} : {};

  const options = Object.assign(tago, ido);

  const events = await database.Event.findAll({where: options});

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
    humidity: params.data.humidity,
    tag: params.tag.id,
  });

  ctx.body = event;
  ctx.status = 201;
};
