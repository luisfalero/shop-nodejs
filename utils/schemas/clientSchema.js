const joi = require('@hapi/joi');

const clientIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const documentType = joi.string().max(10);
const document = joi.string().max(20);
const firtsname = joi.string().max(100);
const lastname = joi.string().max(100);
const address = joi.string().max(100);
const reference = joi.string().max(100);
const phone = joi.string().max(15);

const createClientSchema = {
  documentType: documentType.required(),
  document: document.required(),
  firtsname: firtsname.required(),
  lastname: lastname.required(),
  address: address.required(),
  reference: reference.required(),
  phone: phone.required()
};

const updateClientSchema = {
  firtsname: firtsname,
  lastname: lastname,
  address: address,
  reference: reference,
  phone: phone
};

module.exports = {
  clientIdSchema,
  createClientSchema,
  updateClientSchema
};