const express = require('express');
const cors = require('cors')

const connectDB = require('./config/database')
const cookieJwtAuth = require('./middlewares/cookieJwtAuth') //auth middleware

const userRoutes = require('./routes/userRoutes')
const paymentRoutes = require('./routes/paymentRoutes');
const dataRoutes = require('./routes/dataRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express()
const PORT = process.env.PORT

connectDB()

//Middlewares
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors({ 
    origin:"http://localhost:3000", 
    credentials:true 
}))

console.log('mongo ',process.env.MONGO_URI)

//routes
app.use('/api/user',userRoutes);
app.use('/api/payment',cookieJwtAuth,paymentRoutes);
app.use('/api/data',dataRoutes);
app.use('/api/admin',adminRoutes);

app.listen(PORT,()=>{
    console.log(`server is listening at http://127.0.0.1:${PORT}`)
})