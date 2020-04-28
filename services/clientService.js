const MongoLib = require('../lib/mongo');

class ClientService {

  constructor() {
    this.collection = 'client';
    this.mongoDB = new MongoLib();
  }

  async getClients({ tagsClients, columnTable }) {
    const query = tagsClients && { [columnTable]: { $in: tagsClients } };
    const clients = await this.mongoDB.getAll(this.collection, query);
    return clients || [];
  }

  async getClient({ clientId }) {
    const client = await this.mongoDB.get(this.collection, clientId);
    return client || {};
  }

  async createClient({ client }) {
    client.created = new Date();
    const createClientId = await this.mongoDB.create(this.collection, client);
    return createClientId;
  }

  async updateClient({ clientId, client } = {}) {
    const updateClientId = await this.mongoDB.update(this.collection, clientId, client);
    return updateClientId;
  }
}

module.exports = ClientService;