const MongoLib = require('../lib/mongo');
const { ObjectId } = require('mongodb');

class BranchOfficeService {

  constructor() {
    this.collection = 'branchOffice';
    this.mongoDB = new MongoLib();
  }

  async getBranchOffices({ tagBranchOffice, columnTable}) {
    const query = tagBranchOffice && { [columnTable]: { $in: tagBranchOffice } };
    const shops = await this.mongoDB.getAll(this.collection, query);
    return shops || [];
  }

  async getBranchOffice({ branchOfficeId }) {
    const branchOffice = await this.mongoDB.get(this.collection, branchOfficeId);
    return branchOffice || {};
  }

  async createBranchOffice({ shopId, branchOffice }) {
    branchOffice.created = new Date();
    branchOffice.shop = ObjectId(shopId);
    const createBranchOfficeId = await this.mongoDB.create(this.collection, branchOffice);
    return createBranchOfficeId;
  }
}

module.exports = BranchOfficeService;