const joi = require('@hapi/joi');

const shopIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const name = joi.string().max(100);
const scheduleStart = joi.string().max(10);
const scheduleEnd = joi.string().max(10);
const workdays = joi.array().items(joi.number());

const createShopSchema = {
  name: name.required(),
  schedule: {
    start: scheduleStart.required(),
    end: scheduleEnd.required()
  },
  workdays: workdays.required()
};

const updateShopSchema = {
  name: name,
  schedule: {
    start: scheduleStart,
    end: scheduleEnd
  },
  workdays: workdays
};

module.exports = {
  shopIdSchema,
  createShopSchema,
  updateShopSchema
};