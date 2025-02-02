import swaggerJsdoc from 'swagger-jsdoc';

/**
 * @swagger
 * components:
 *   schemas:
 *     MusicSubmissionInput:
 *       type: object
 *       properties:
 *         band:
 *           type: string
 *         contact:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         attestation:
 *           type: boolean
 *         imageFiles:
 *           type: array
 *           items:
 *             type: string
 *             format: binary
 *         audioFiles:
 *           type: array
 *           items:
 *             type: string
 *             format: binary
 *       example:
 *         band: 'Example Band Name'
 *         contact: 'Contact Name'
 *         email: 'example@email.com'
 *         phone: '111-555-9999'
 *         attestation: true,
 *         imageFiles: ['mockimagefile']
 *         audioFiles: ['mockaudiofile']
 *     MusicSubmissionResponse:
 *       type: object
 *       properties:
 *         referenceId:
 *           type: string
 *       example:
 *         referenceId: '679fc027d5645c180302cf59'
 */

const options: swaggerJsdoc.Options = {
    failOnErrors: true,
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'Wristband File Server Docs',
            version: '1.0.0',
        },
    },
    apis: [
        './src/common/presentation/config/swagger.ts',
        './src/healthCheck/presentation/routes/healthCheckRoutes.ts',
        './src/streaming/presentation/routes/audioStreamingRoutes.ts',
        './src/submissions/presentation/routes/musicSubmissionRoutes.ts',
    ],
};

export const swaggerSpec = swaggerJsdoc(options);
