const express = require('express');
const ClientService = require('../services/clientService');

const {
  clientIdSchema,
  createClientSchema,
  updateClientSchema
} = require('../utils/schemas/clientSchema');

const validationHandler = require('../utils/middleware/validationHandler');

function clientApi(app) {
  const router = express.Router();
  app.use('/api/client', router);

  const clientService = new ClientService();

  router.get('/', async function (req, res, next) {
    const { tagsClients } = req.query;
    try {
      const clients = await clientService.getClients({ tagsClients });
      res.status(200).json({
        data: clients
      });
    } catch (error) {
      next(error)
    }
  });

  router.get('/:clientId',
    validationHandler({ clientId: clientIdSchema }, 'params'),
    async function (req, res, next) {
      const { clientId } = req.params;
      try {
        const client = await clientService.getClient({ clientId });
        res.status(200).json({
          data: client,
        });
      } catch (error) {
        next(error)
      }
    });

  router.post('/',
    validationHandler(createClientSchema),
    async function (req, res, next) {
      const { body: client } = req;
      try {
        const createClientId = await clientService.createClient({ client });
        res.status(201).json({
          data: createClientId
        });
      } catch (error) {
        next(error)
      }
    });

  router.put('/:clientId',
    validationHandler({ clientId: clientIdSchema }, 'params'),
    validationHandler(updateClientSchema),
    async function (req, res, next) {
      const { clientId } = req.params;
      const { body: client } = req;
      try {
        const updatedClientId = await clientService.updateClient({ clientId, client });
        res.status(200).json({
          data: updatedClientId
        });
      } catch (error) {
        next(error)
      }
    });
}

module.exports = clientApi;