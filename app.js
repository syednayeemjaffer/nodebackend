require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const connectDB = require('./config/Database');
const userRoutes = require('./routes/UserRoutes');
const swaggerJson = require('./swagger.json');
const swaggerUi = require('swagger-ui-express');
connectDB();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("img"));
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
