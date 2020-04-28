const express = require('express');
const ShopService = require('../services/shopService');
const BranchOfficeService = require('../services/branchOfficeService');

const {
  shopIdSchema,
  createShopSchema,
  updateShopSchema
} = require('../utils/schemas/shopSchema');

const validationHandler = require('../utils/middleware/validationHandler');

function shopApi(app) {
  const router = express.Router();
  app.use('/api/shop', router);

  const shopService = new ShopService();

  router.get('/', async function (req, res, next) {
    const { tagsShops } = req.query;
    try {
      const shops = await shopService.getShops({ tagsShops });
      await getShopsForId(shops);
      res.status(200).json({
        data: shops
      });
    } catch (error) {
      next(error)
    }
  });

  router.get('/:shopId',
    validationHandler({ shopId: shopIdSchema }, 'params'),
    async function (req, res, next) {
      const { shopId } = req.params;
      try {
        const shop = await shopService.getShop({ shopId });
        await getShopForId(shop);
        res.status(200).json({
          data: shop,
        });
      } catch (error) {
        next(error)
      }
    });

  router.post('/',
    validationHandler(createShopSchema),
    async function (req, res, next) {
      const { body: shop } = req;
      try {
        const createShopId = await shopService.createShop({ shop });
        res.status(201).json({
          data: createShopId
        });
      } catch (error) {
        next(error)
      }
    });
}

async function getShopsForId(shops) {
  const branchOfficeService = new BranchOfficeService();
  for await (const element of shops) {
    const { columnTable } = { columnTable: '_id' };
    const { tagBranchOffice } = { tagBranchOffice: element.branchOffice };
    element.branchOffice = await branchOfficeService.getBranchOffices({ tagBranchOffice, columnTable });
  }
  return shops;
}

async function getShopForId(shop) {
  const branchOfficeService = new BranchOfficeService();
  const { columnTable } = { columnTable: '_id' };
  const { tagBranchOffice } = { tagBranchOffice: shop.branchOffice };
  shop.branchOffice = await branchOfficeService.getBranchOffices({ tagBranchOffice, columnTable });
  return shop;
}

module.exports = shopApi;