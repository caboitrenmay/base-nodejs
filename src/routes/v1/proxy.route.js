const express = require('express');
const validate = require('../../middlewares/validate');
const { proxyValidation } = require('../../validations');
const { proxyController } = require('../../controllers');

const router = express.Router();

router.get('/', validate(proxyValidation.getData), proxyController.getData);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Proxy
 *   description: Proxy
 */

/**
 * @swagger
 * /proxy:
 *   get:
 *     summary: Proxy get data
 *     description: Proxy get data.
 *     tags: [Proxy]
 *     parameters:
 *       - in: query
 *         name: proxy
 *         schema:
 *           type: string
 *         description: Url
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/NewsFeed'
 *                 title:
 *                   type: string
 *                   example: title
 *                 pubDate:
 *                   type: string
 *                   example: pubDate
 *                 generator:
 *                   type: string
 *                   example: generator
 *                 link:
 *                   type: string
 *                   example: link
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
