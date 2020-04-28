const express = require('express');
const ShopService = require('../services/shopService');
const BranchOfficeService = require('../services/branchOfficeService');

const {
  branchOfficeIdSchema,
  createBranchOfficeSchema,
  updateBranchOfficeSchema
} = require('../utils/schemas/branchOfficeSchema');

const {
  shopIdSchema,
  createShopSchema,
  updateShopSchema
} = require('../utils/schemas/shopSchema');

const validationHandler = require('../utils/middleware/validationHandler');

function branchOfficeApi(app) {
  const router = express.Router();
  app.use('/api/branch-office', router);

  const shopService = new ShopService();
  const branchOfficeService = new BranchOfficeService();  

  router.get('/', async function (req, res, next) {
    const { tagsBranchOffices } = req.query;
    try {
      const branchOffices = await branchOfficeService.getBranchOffices({ tagsBranchOffices });
      res.status(200).json({
        data: branchOffices
      });
    } catch (error) {
      next(error)
    }
  });

  router.get('/:branchOfficeId',
    validationHandler({ branchOfficeId: branchOfficeIdSchema }, 'params'),
    async function (req, res, next) {
      const { branchOfficeId } = req.params;
      try {
        const branchOffice = await branchOfficeService.getBranchOffice({ branchOfficeId });
        res.status(200).json({
          data: branchOffice,
        });
      } catch (error) {
        next(error)
      }
    });

  router.post('/:shopId',
    validationHandler({ shopId: shopIdSchema }, 'params'),
    validationHandler(createBranchOfficeSchema),
    async function (req, res, next) {
      const { shopId } = req.params;
      const { body: branchOffice } = req;
      try {
        const createBranchOfficeId = await branchOfficeService.createBranchOffice({ shopId, branchOffice });
        const updateShopId = await shopService.updatePushShop({shopId, createBranchOfficeId});
        res.status(201).json({
          data: createBranchOfficeId
        });
      } catch (error) {
        next(error)
      }
    });
}

module.exports = branchOfficeApi;