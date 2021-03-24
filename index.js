const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 8000;

//Allow pre-flight checks
const corsOptions = {
  origin: "*",
};

//Add Cors to the express app
app.use(cors());

//Add the body parser
app.use(bodyParser.json());

//add router
const router = require('./routers/router')

//use router
app.use('/inventoryNbi67', router.getRouter);
app.use('/cartNbi67', router.postRouter);
app.use('/cartNbi67', router.deleteRouter);
app.use('/cartNbi67/checkout', router.checkoutRouter);

//Listen to port 8000
app.listen(port, () => {
  console.log(`Web Service Listening on port ${port}`);
});


