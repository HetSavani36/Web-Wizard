import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'UniSync API',
      version: '1.0.0',
      description: `UniSync is a unified university management platform that brings together essential student services in one place.

Modules included:
- Forms: Access and submit official university forms
- CIE: View marks and progress
- Events: Stay updated with campus activities
- Polls: Participate in student polls and surveys
- Vault: Secure document storage

This API enables developers to build apps that streamline campus workflows and enhance the student experience.`,
      contact: {
        name: 'UniSync Team',
        email: 'support@unisync.com'
      }
    },
    servers: [
      { url: 'http://localhost:5000', description: 'Local server' },
      { url: 'https://api.unisync.com', description: 'Production server' }
    ]
  },
  components: {
    securitySchemes: {
    cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "accessToken",  // 👈 name of your auth cookie
    },
    },
},
  apis: ['../routes/**/*.js' , '../controllers/**/*.js'], // path to your route files
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log(Object.keys(swaggerSpec.paths)); 
app.listen(3000, () => console.log('Server running on http://localhost:3000'));

export default swaggerSpec
