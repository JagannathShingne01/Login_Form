const jwt = require('jsonwebtoken')
const checkAuntheticated = (req, res, next)=>{
    const auth = req.headers[`authorization`];
    if(!auth){
        return res.satus(403)
            .json({ message: 'Unauthorized, JWT token is require' })
    }
    try{
        const decoded = jwt.verify(auth, process.env.JWT_SECRET)
        req.user = decoded;
        next();
    }catch(err){
        return res.satus(403)
        .json({ message: 'Unauthorized, JWT token is wrong' })
    }

}


module.exports = checkAuntheticated;