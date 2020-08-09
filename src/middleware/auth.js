const User = require('../models/user')

const authentication = async function(req, res, next){
    try{
        // get token from the request header
        const token = req.header('Authorization').replace('Bearer ','')
        // find the user which has the given token
        const user = await User.findOne({'tokens.token' : token })

        req.token = token
        req.user = user
        
        next()
    }
    catch(e){
        res.status(401).send(e + 'Unable to Authenticate.')
    }
}

const authorization = async function(req, res, next){
    try{
        // get token from the request header
        const token = req.header('Authorization').replace('Bearer ','')
         
        if(!req.user.isadmin)
        throw new Error('')
        next()
    }
    catch(e){
        res.status(401).send('Unable to Authorize.')
    }
}

module.exports = { authentication , authorization}