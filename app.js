const transportRoutes = require('./routes/transport');
const partRoutes = require('./routes/parts');
const blogRoutes = require('./routes/blog');

require('dotenv').config(); 

const
  PORT = process.env.PORT || 3000,   
	express = require("express"),
	bodyParser = require("body-parser"),
  app = express();

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.text());

app.use('/transports', transportRoutes);
app.use('/parts', partRoutes);
app.use('/blog', blogRoutes);

const swaggerSetup = require('./swagger');
swaggerSetup(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});