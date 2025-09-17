require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/authmiddleware');
const { authorizeRoles } = require('./middlewares/authenticate');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "DMA-API",
            version: "1.0.0",
            description: "An API for digital marketing agency, Nigeria",
        },
        servers: [
            {
                url: `http://localhost:${PORT}`
            },
            {
                url: "https://api.digitalmarketingagency.ng",
                description: "Production server" 
            }
        ]
    },
    apis: ["api/swagger.yaml"]
};
const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    swaggerOptions: {
        persistAuthorization: true,
    }
}));

// Import different route files
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const orgRoutes = require('./routes/orgRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const requestRoutes = require('./routes/requestRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
   origin: ["http://localhost:3000", "https://digitalmarketingagency.ng"], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header']
}));

// Mount routes to different paths
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes);
app.use('/api/orgs', orgRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/service-request', requestRoutes);
app.use('/api/admin', auth, authorizeRoles('admin'), adminRoutes)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));