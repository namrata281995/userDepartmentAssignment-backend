const express = require('express') 
const auth = require('../middleware/auth')
const Department = require('../models/department')
const User = require('../models/user')
const router = new express.Router()
const mongoose = require('mongoose') 

router.post( '/department' , 
 async (req, res)=> {
    try{ 
        const department = new Department(req.body) 
        await department.save();
        res.status(200).send(department)
    }
    catch(e){
        res.status(500).send(''+e)
    }
})


router.get('/department/all' , auth.authentication, async (req, res)=> {
    try{  
        const department = await Department.find()  
        res.status(200).send(department) 
    }
    catch(e){
        res.status(500).send(''+e)
    }
})

router.get('/department/except/:id' , auth.authentication, async (req, res)=> {
    try {  
        // here id is departmentid
        const department = await Department.find({ _id: { $ne :  req.params.id } })
        res.status(200).send(department)
    }
    catch(e){
        res.status(500).send(''+e)
    }
})

router.get('/department/user/:id' , auth.authentication, async (req, res)=> {
    try{  
        const users = await User.find({ department : req.params.id}) 
        res.status(200).send(users)
    }
    catch(e){
        res.status(500).send(''+e)
    }
})

//not in use
router.put('/department/:id' , async (req, res)=> {
    try {  
        const department = await Department.findByIdAndUpdate(req.params.id, req.body) 
        res.status(200).send(department)
    }
    catch(e){
        res.status(500).send(''+e)
    }
})

// router.delete('/department/:id' , auth.authentication, async (req, res)=> {
//     try{  
//         const quiz = await Quiz.findByIdAndDelete(req.params.id) 
//         res.status(200).send(true)
//     }
//     catch(e){
//         res.status(500).send(''+e)
//     }
// })

module.exports = router