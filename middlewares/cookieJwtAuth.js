const jwt = require('jsonwebtoken')

const userJwtAuth = (req,res,next)=>{
    const token = req.headers['x-access-token']
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded)
        if(decoded){
            req.userId = decoded.id
            next()
        }else{
            throw new Error('Token Expired');
        }
    }
    catch(error){
        console.log(error)
        return res.json({status:'error','user':false})
    }
}

module.exports = userJwtAuth