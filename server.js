const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()
const connectDB = require('./config/database')
const PORT = process.env.PORT
const userJwtAuth = require('./middlewares/cookieJwtAuth')

const userRoutes = require('./routes/userRoutes')
const paymentRoutes = require('./routes/paymentRoutes');

connectDB()

//Middlewares
app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

//routes
app.use('/api/user',userRoutes);
app.use('',paymentRoutes);


app.get('/',(req,res)=>{
   res.send('Welcome to Madhu Home Stay')
})
app.get('/test',(req,res)=>{
    
    if(token){
        console.log(token)
        res.json({
            'status':'ok',
            token
        })
    }
    else{
        return res.location('/Login');
    }
})

app.listen(PORT,()=>{
    console.log(`server is listening at http://127.0.0.1:${PORT}`)
})