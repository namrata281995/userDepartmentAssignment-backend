const express = require('express') 
const auth = require('../middleware/auth')
const mongoose = require('mongoose') 
const router = new express.Router()
const Request = require('../models/request')
const User = require('../models/user')

router.post('/request', auth.authentication, async (req, res) => {
    try{ 
        const request = new Request(req.body)
        request.createdBy = req.user._id 
        await request.save()
        res.status(200).send(request)
    }
    catch(e){
        res.status(500).send(''+e)
    }
})

router.put('/request/:id/:status', auth.authentication, async (req, res) =>{
    try{        
        const request = await Request.findByIdAndUpdate(req.params.id, { status : req.params.status }) 
        request.status = req.params.status
        res.status(200).send(request)
    }
    catch(e){
        res.status(500).send(''+e)
    }
})
 
// get all department requests
router.get('/request/all', auth.authentication, async (req, res) =>{
    try{         
        
        const request = await Request.find({ department : req.user.department}) 
        res.status(200).send(request)
    }
    catch(e){
        res.status(500).send(''+e)
    }
})

router.get('/request/own', auth.authentication, async (req, res) =>{
    try{         
        
        const request = await Request.find({ createdBy : req.user._id }).sort({ updatedAt : -1}) 
        res.status(200).send(request)
    }
    catch(e){
        res.status(500).send(''+e)
    }
})


module.exports = router