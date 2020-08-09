const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const Department = require('../models/department')
const router = new express.Router() 

router.post('/user', async (req,res) => {
    const user = new User(req.body)

    try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(200).send({ user , token });
    }
    catch(e){
     res.status(500).send(''+e);
    }
})

router.put('/user', auth.authentication , async (req,res) => {
    const user =  req.body   
    const updates = Object.keys(req.body)
    // need to add code for allowed updates
    try{
        const dbuser = req.user
        updates.forEach((update) => dbuser[update]=req.body[update])
        await dbuser.save()
        res.status(200).send(user);
    }
    catch(e){
     res.status(500).send(e);
    }
})

router.post('/user/login', async (req,res) => {
    const userid = req.body.userid
    const password = req.body.password
    try{
        let user = await User.findByCredential(userid,password) 
        const token = await user.generateAuthToken(); 
        const userdepartment = await Department.findById(user.department)    
        res.status(200).send({user, token, userdepartment})
    }
    catch(e){
     res.status(400).send(''+ e);
    }
})

router.post('/user/logout', auth.authentication, async (req,res) => {
    try{
         req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
         await req.user.save(); 
         res.status(200).send(true);
    }
    catch(e){
     res.status(400).send('e'+ e);
    }
})

router.post('/user/logoutAll', auth.authentication, async (req,res) => {
    try{
         const user = req.user;
         user.tokens = [];
         await user.save();
         res.status(200).send(true);
    }
    catch(e){
     res.status(400).send(e);
    }
})

//not needed
router.get('/user/me', auth.authentication , async (req,res) => {
    
    try{ 
         res.status(200).send(req.user)
    }
    catch(e){
     res.status(400).send(e);
    }
})

module.exports = router