const express = require('express');
const cors = require('cors');
const path = require('path');		
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
app.use(express.static('static/build'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors({ 
    origin:"https://darling-parfait-b389ea.netlify.app/", 
    credentials:true 
}))


//routes
app.use('/api/user',userRoutes);
app.use('/api/payment',cookieJwtAuth,paymentRoutes);
app.use('/api/data',dataRoutes);
app.use('/api/admin',adminRoutes);

app.get('*',(req,res)=>{
	res.sendFile(path.join(__dirname,'static/build/index.html'));
})

app.listen(1337,()=>{
    console.log(`server is listening at http://164.92.98.182:1337}`)
})
		
