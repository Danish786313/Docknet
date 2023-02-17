const path = require('path');
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config()
const { sequelize } = require('./models');

app.use(expressLayouts)
app.set('layout', './layouts/default')
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// app.use(cors())

// swagger defining
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerdoc = YAML.load('./api.yaml') 
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerdoc));

const auth = require('./routes/authroute');
const availability = require('./routes/availabilityrout');
const apointment = require('./routes/apointmentrout');
const speciality = require("./routes/specialityroute");
const banner = require("./routes/bannerrout")
const admin = require("./routes/adminrout")
const docter = require("./routes/docterrout")
const patient = require("./routes/patientrout")
const payment = require("./routes/paymentrout")
const region = require("./routes/regionroute")
const bankdetail = require("./routes/bankdetailrout")

app.use(bodyParser.json())
app.use(cookieParser());
app.use(cors())

app.post('/test', (req, res) => {
    console.log(req.body, "ye")
    console.log(typeof req.body.time)
    res.status(200).json({
        message: "Hello Kolonizer from master"
    })
})

app.use("/upload", express.static("upload"));
app.use("/api", auth);
app.use("/api", admin)
app.use("/api", docter)
app.use("/api", patient)
app.use("/api", availability)
app.use("/api", apointment)
app.use("/api", speciality)
app.use("/api", banner)
app.use("/payment", payment)
app.use("/api", region)
app.use("/api", bankdetail)
// app.use("/master/document", express.static("document"));
app.use(express.static('public'));
app.use('/images', express.static(__dirname + 'public/images'));

app.use("/", (req, res) => {
    res.render('pages/index', { 
		title: 'Donate for Animals'
	});
})


const port = (process.env.PORT || 4000)

//Starting a server
app.listen(port, async () => {
    sequelize.sync().then(() => {
        console.log("Database connected")
    }).catch(() => {
        console.log("Database not connected")
    })
    console.log(`Example app listening at http://localhost:${port}`)
    // console.log(`swagger url http://localhost:${port}/api-docs`)
})
