const path = require('path');
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser');
const morgan = require("morgan");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config()
const { sequelize } = require('./models');

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(expressLayouts)
app.set('layout', './layouts/default')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
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
const slots = require("./routes/slotsrout")
const prescription = require("./routes/Prescriptionrout")
const review = require("./routes/reviewrout")
const duplicate = require("./routes/duplicateprofilerout")
const healthRecord = require("./routes/healthrecordrout")

app.use(cookieParser());
app.use(cors())

app.get('/test', (req, res) => {
    console.log(req.body)
    res.status(200).json({
        message: "Hello in test API"
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
app.use("/api", slots)
app.use("/api", prescription)
app.use("/api", review)
app.use("/api", duplicate)
app.use("/api", healthRecord)
// app.use("/master/document", express.static("document"));
app.use(express.static('public'));
app.use('/images', express.static(__dirname + 'public/images'));

app.use("/razorpay", (req, res) => {
    res.render('pages/index', { 
		title: 'Donate for Animals'
	});
})


const port = (process.env.PORT || 4000)

//Starting a server
app.listen(port, async () => {
    // sequelize.sync({alter: true}).then(() => { 
    //     console.log("Database connected")
    // }).catch(() => { 
    //     console.log("Database not connected")
    // })
    console.log(`Example app listening at http://localhost:${port}`)
    // console.log(`swagger url http://localhost:${port}/api-docs`)
})