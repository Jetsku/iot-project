const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

const Event = sequelize.define('events', {
  temperature: Sequelize.FLOAT,
  humidity: Sequelize.FLOAT,
  tag: Sequelize.STRING,
}, {
  timestamps: true,
});

// toJSON method is automatically called when the object is serialized in Koa
Event.prototype.toJSON = function toJSON() {
  return {
    // This is a unique id for each sensor entry
    id: this.id,
    // Id and timestamps are generated automatically
    timestamp: this.createdAt,

    temperature: this.temperature,
    humidity: this.humidity,
    tag: this.tag,
  };
};

module.exports = Event;
