const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/database");
const cookieJwtAuth = require("./middlewares/cookieJwtAuth"); //auth middleware

const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const dataRoutes = require("./routes/dataRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const PORT = process.env.PORT || 1337;

connectDB();

//Middlewares
app.use(express.static('static/dist'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'https://madhuhomestaysirsi.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/payment", cookieJwtAuth, paymentRoutes);
app.use("/api/data", dataRoutes);
app.use("/api/admin", adminRoutes);

app.get('*',(req,res)=>{
	res.sendFile(path.join(__dirname,'static/dist/index.html'));
})

app.listen(1337,()=>{
    console.log(`server is listening at http://127.0.0.1:1337`)
})
