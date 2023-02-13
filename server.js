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
app.use(cors({
  origin:["http://localhost:5173","https://madhuhomestaysirsi.com"],
  credentials:true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin", "Access-Control-Request-Method", "Access-Control-Request-Headers", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials", "Access-Control-Allow-Methods", "Access-Control-Allow-Headers", "X-Access-Token"]
}));

app.use(express.static('static/dist'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//routes
app.use("/api/user", userRoutes);
app.use("/api/payment",cookieJwtAuth, paymentRoutes);
app.use("/api/data", dataRoutes);
app.use("/api/admin", adminRoutes);

app.get('*',(req,res)=>{
	res.sendFile(path.join(__dirname,'static/dist/index.html'));
})

app.listen(1337,()=>{
    console.log(`server is listening at http://127.0.0.1:1337`)
})
