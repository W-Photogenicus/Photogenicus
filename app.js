const express = require("express");
const fileUpload = require("express-fileupload");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');

const app = express();
const routes = require('./routes/ImageRoutes');

app.use(cors());

app.use(function(req, res, next) {  
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});  

app.use(express.static(__dirname + "/public/true"));
app.use(express.static(__dirname + "/public/false"));
app.use(express.static(__dirname + "/public/fresh"));
app.use(express.static(__dirname + "/public"));
app.use(fileUpload());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});