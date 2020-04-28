const joi = require('@hapi/joi');

const branchOfficeIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const name = joi.string().max(80);
const address = joi.string().max(100);
const phone = joi.string().max(15);
const priceMinimal = joi.number().min(0);
const priceDelivery = joi.number().min(0);
const priceAdditionalStatus = joi.boolean();
const priceAdditionalPrice = joi.number().min(0);
const zone = joi.array().items(joi.string().max(100));
const activatedWeb = joi.boolean();
const activatedMobile = joi.boolean();

const createBranchOfficeSchema = {
  name: name.required(),
  address: address.required(),
  phone: phone.required(),
  price: {
    minimal: priceMinimal.required(),
    delivery: priceDelivery.required(),
    additional: {
      status: priceAdditionalStatus.required(),
      price: priceAdditionalPrice.required()
    }
  },
  zone: zone.required(),
  activated: {
    web: activatedWeb.required(),
    mobile: activatedMobile.required()
  }
};

const updateBranchOfficeSchema = {
  name: name,
  address: address,
  phone: phone,
  price: {
    minimal: priceMinimal,
    delivery: priceDelivery,
    additional: {
      status: priceAdditionalStatus,
      price: priceAdditionalPrice
    }
  },
  zone: zone,
  activated: {
    web: activatedWeb,
    mobile: activatedMobile
  }
};

module.exports = {
  branchOfficeIdSchema,
  createBranchOfficeSchema,
  updateBranchOfficeSchema
};