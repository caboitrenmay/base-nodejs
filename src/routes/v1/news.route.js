const express = require('express');
const validate = require('../../middlewares/validate');
const { newsValidation } = require('../../validations');
const { newsController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/feed')
  .get(newsController.getEditorRss)
  .post(validate(newsValidation.getNewsFeed), newsController.getNewsFeed);

router
  .route('/rss')
  .get(auth(), validate(newsValidation.getRss), newsController.getAllRss)
  .post(auth(), validate(newsValidation.createRss), newsController.createRss);

router
  .route('/:id')
  .patch(auth('manageUsers'), validate(newsValidation.updateRss), newsController.updateRss)
  .delete(auth('manageUsers'), validate(newsValidation.deleteRss), newsController.deleteRss);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: News
 *   description: News
 */

/**
 * @swagger
 * /news/feed:
 *   get:
 *     summary: Get editor choice rss
 *     description: Everyone can retrieve editor choice rss.
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of rss
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
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
 *                     $ref: '#/components/schemas/Rss'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   post:
 *     summary: Proxy get news feed
 *     description: Proxy get news feed.
 *     tags: [News]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - proxy
 *             properties:
 *               proxy:
 *                 type: string
 *             example:
 *               proxy: https://vnexpress.net/rss/tin-moi-nhat.rss
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

/**
 * @swagger
 * /news/rss:
 *   post:
 *     summary: Create a rss
 *     description: Rss.
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - link
 *               - source
 *             properties:
 *               name:
 *                 type: string
 *               link:
 *                 type: string
 *                 format: link
 *                 description: must be unique
 *               source:
 *                 type: string
 *             example:
 *               name: Trang chủ
 *               link: https://vnexpress.net/rss/tin-moi-nhat.rss
 *               source: vnexpress
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Rss'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all rss
 *     description: Only admins can retrieve all rss.
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: name
 *       - in: query
 *         name: source
 *         schema:
 *           type: string
 *         description: source
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of rss
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
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
 *                     $ref: '#/components/schemas/Rss'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /news/{id}:
 *   patch:
 *     summary: Update a rss news
 *     description: Update a rss news.
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               link:
 *                 type: string
 *                 format: link
 *                 description: must be unique
 *               source:
 *                 type: string
 *             example:
 *               name: Trang chủ
 *               link: https://vnexpress.net/rss/tin-moi-nhat.rss
 *               source: vnexpress
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a rss
 *     description: Delete a rss
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: rss id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
