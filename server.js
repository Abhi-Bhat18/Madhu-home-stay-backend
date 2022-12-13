const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()
const connectDB = require('./config/database')
const PORT = process.env.PORT
const userJwtAuth = require('./middlewares/cookieJwtAuth')

const userRoutes = require('./routes/userRoutes')
const paymentRoutes = require('./routes/paymentRoutes');
const dataRoutes = require('./routes/dataRoutes');
connectDB()

//Middlewares
app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

//routes
app.use('/api/user',userJwtAuth,userRoutes);
app.use('',paymentRoutes);
app.use('/api/data',dataRoutes);



app.listen(PORT,()=>{
    console.log(`server is listening at http://127.0.0.1:${PORT}`)
})