const express = require('express');
const router = express.Router();
const lightcastController = require('../controllers/lightcastController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Skill:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The skill ID
 *         name:
 *           type: string
 *           description: The skill name
 *         type:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             name:
 *               type: string
 *         description:
 *           type: string
 *         infoUrl:
 *           type: string
 *     SkillExtraction:
 *       type: object
 *       properties:
 *         confidence:
 *           type: number
 *           format: float
 *         skill:
 *           $ref: '#/components/schemas/Skill'
 *     LightCastResponse:
 *       type: object
 *       properties:
 *         attributions:
 *           type: array
 *           items:
 *             type: object
 *         data:
 *           type: array
 */

/**
 * @swagger
 * /api/lightcast/skills:
 *   get:
 *     summary: Get all skills from LightCast
 *     tags: [LightCast]
 *     parameters:
 *       - in: query
 *         name: typeIds
 *         schema:
 *           type: string
 *         description: Comma-separated skill type IDs (e.g., ST1,ST2)
 *         example: ST1,ST2
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Comma-separated fields to return (e.g., id,name,type,infoUrl)
 *         example: id,name,type,infoUrl
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of results to return
 *         example: 5
 *     responses:
 *       200:
 *         description: List of skills retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LightCastResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized - Invalid or expired token
 *       500:
 *         description: Server error
 */
router.get('/skills', async (req, res) => {
    try {
        const { typeIds, fields, limit, ...otherParams } = req.query;
        
        // Build query parameters
        const queryParams = {};
        if (typeIds) queryParams.typeIds = typeIds;
        if (fields) queryParams.fields = fields;
        if (limit) queryParams.limit = parseInt(limit);
        
        // Add any other query parameters
        Object.assign(queryParams, otherParams);
        
        const result = await lightcastController.getAllSkills(queryParams);
        res.json({
            success: true,
            data: result,
        });
    } catch (error) {
        res.status(error.message.includes('401') ? 401 : error.message.includes('400') ? 400 : 500).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * @swagger
 * /api/lightcast/extract:
 *   post:
 *     summary: Extract skills from text/document
 *     tags: [LightCast]
 *     parameters:
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *           default: en
 *         description: Language code for extraction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 description: Text to extract skills from
 *                 example: "Full Stack Web Developer with hands-on experience in designing and building scalable, secure, and user-friendly web applications using modern front-end and back-end technologies. Proficient in JavaScript, Node.js, Express, React/Angular, and SQL/NoSQL databases."
 *               confidenceThreshold:
 *                 type: number
 *                 format: float
 *                 minimum: 0
 *                 maximum: 1
 *                 default: 0.9
 *                 description: Minimum confidence threshold for skill extraction
 *     responses:
 *       200:
 *         description: Skills extracted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       confidence:
 *                         type: number
 *                         format: float
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       type:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *       400:
 *         description: Bad request - Missing or invalid input
 *       401:
 *         description: Unauthorized - Invalid or expired token
 *       500:
 *         description: Server error
 */
router.post('/extract', async (req, res) => {
    try {
        const { text, confidenceThreshold } = req.body;
        const { language } = req.query;
        
        if (!text) {
            return res.status(400).json({
                success: false,
                error: 'Text is required',
            });
        }
        
        const threshold = confidenceThreshold !== undefined ? parseFloat(confidenceThreshold) : 0.9;
        const lang = language || 'en';
        
        const result = await lightcastController.extractSkills(text, threshold, lang);
        
        // Transform response to include only required fields
        const filteredData = result.data ? result.data.map(item => ({
            confidence: item.confidence,
            id: item.skill?.id,
            name: item.skill?.name,
            type: {
                id: item.skill?.type?.id,
                name: item.skill?.type?.name
            }
        })) : [];
        
        res.json({
            success: true,
            data: filteredData,
        });
    } catch (error) {
        res.status(error.message.includes('401') ? 401 : error.message.includes('400') ? 400 : 500).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * @swagger
 * /api/lightcast/related:
 *   post:
 *     summary: Get related skills
 *     tags: [LightCast]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ids
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of skill IDs to find related skills for
 *                 example: ["KS1200364C9C1LK3V5Q1", "KS1275N74XZ574T7N47D", "KS125QD6K0QLLKCTPJQ0"]
 *     responses:
 *       200:
 *         description: Related skills retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/LightCastResponse'
 *       400:
 *         description: Bad request - Missing or invalid input
 *       401:
 *         description: Unauthorized - Invalid or expired token
 *       500:
 *         description: Server error
 */
router.post('/related', async (req, res) => {
    try {
        const { ids } = req.body;
        
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'ids array is required and must not be empty',
            });
        }
        
        const result = await lightcastController.getRelatedSkills(ids);
        const filteredData = result.data ? result.data.map(item => ({
            id: item.id,
            name: item.name,
            type: {
                id: item.type?.id,
                name: item.type?.name
            }
        })) : [];
        res.json({
            success: true,
            data: filteredData,
        });
    } catch (error) {
        res.status(error.message.includes('401') ? 401 : error.message.includes('400') ? 400 : 500).json({
            success: false,
            error: error.message,
        });
    }
});

module.exports = router;
