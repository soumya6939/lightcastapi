const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { apiReference } = require('@scalar/express-api-reference');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const { connectToLightcast } = require('./controllers/lightcastController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LightCast API',
      version: '1.0.0',
      description: 'LightCast Skills API integration with Swagger documentation. This API provides endpoints to retrieve skills, extract skills from text, and find related skills using the LightCast platform.',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/lightcastRoutes.js', './server.js'], // Paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// OpenAPI JSON endpoint (required by Scalar and other tools)
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Scalar API Reference documentation (with interactive "Try it out" feature)
app.use('/scalar', apiReference({
  theme: 'purple',
  spec: {
    content: swaggerSpec,
  },
}));

// RapiDoc documentation (with interactive "Try it out" feature)
app.get('/rapidoc', (req, res) => {
  const html = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>LightCast API - RapiDoc</title>
    <script type="module" src="https://unpkg.com/rapidoc/dist/rapidoc-min.js"></script>
  </head>
  <body>
    <rapi-doc
      spec-url="/api-docs.json"
      theme="light"
      render-style="read"
      show-header="true"
      allow-try="true"
      show-info="true"
      show-components="true"
      show-models="true"
      schema-expansion-level="2"
      default-schema-tab="example"
      primary-color="#6c5ce7"
    ></rapi-doc>
  </body>
</html>
  `;
  res.send(html);
});

// Routes
const lightcastRoutes = require('./routes/lightcastRoutes');

app.use('/api/lightcast', lightcastRoutes);
// Health check endpoint
/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: Server is running
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
/**
 * @swagger
 * /:
 *   get:
 *     summary: API root endpoint
 *     tags: [General]
 *     responses:
 *       200:
 *         description: API information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 documentation:
 *                   type: string
 */
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to LightCast API',
    documentation: {
      swagger: `http://localhost:${PORT}/api-docs`,
      scalar: `http://localhost:${PORT}/scalar`,
      rapidoc: `http://localhost:${PORT}/rapidoc`,
    },
    endpoints: {
      skills: '/api/lightcast/skills',
      extract: '/api/lightcast/extract',
      related: '/api/lightcast/related',
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
  });
});



app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
  console.log(`Scalar API Reference available at http://localhost:${PORT}/scalar`);
  console.log(`RapiDoc documentation available at http://localhost:${PORT}/rapidoc`);
  
  // Connect to LightCast (non-blocking, server will start even if connection fails)
  try {
    await connectToLightcast();
  } catch (error) {
    console.warn('Warning: Could not connect to LightCast on startup. The server will continue running.');
    console.warn('You can retry the connection later. Error:', error.message);
  }
});


module.exports = app;

