const MongoLib = require('../lib/mongo');
const { ObjectId } = require('mongodb');

class ShopService {

  constructor() {
    this.collection = 'shop';
    this.mongoDB = new MongoLib();
  }

  async getShops({ tagsShops, columnTable }) {
    const query = tagsShops && { [columnTable]: { $in: tagsShops } };
    const shops = await this.mongoDB.getAll(this.collection, query);
    return shops || [];
  }

  async getShop({ shopId }) {
    const shop = await this.mongoDB.get(this.collection, shopId);
    return shop || {};
  }

  async createShop({ shop }) {
    shop.created = new Date();
    shop.branchOffice = [];
    const createShopId = await this.mongoDB.create(this.collection, shop);
    return createShopId;
  }

  async updatePushShop({ shopId, createBranchOfficeId } = {}) {
    const branchOffice = { branchOffice: ObjectId(createBranchOfficeId) };
    const updateShopId = await this.mongoDB.updatePush(this.collection, shopId, branchOffice);
    return updateShopId;
  }
}

module.exports = ShopService;