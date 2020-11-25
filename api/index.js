require('dotenv').config();
const cors          = require('cors');
var express         = require('express');
var bodyParser      = require('body-parser');
var MongoClient     = require("mongoose");
var compression     = require('compression');
var helmet          = require('helmet');
const port          = process.env.PORT;

var app = express();
app.use(cors());
app.options('*', cors());

app.use(helmet())
app.use(compression());

// parse application/json
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(express.json({type: '*/*',limit: '500mb', extended: true}));
app.use(express.static('public'));
require('./app/web')(app);
app.listen(port);