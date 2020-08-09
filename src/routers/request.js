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
        //get the department details for the userid
        
        const request = await Request.find({ department : req.user.department})
        // get department name
        res.status(200).send(request)
    }
    catch(e){
        res.status(500).send(''+e)
    }
})

router.get('/request/own', auth.authentication, async (req, res) =>{
    try{         
        
        const request = await Request.find({ createdBy : req.user._id }).sort({ updatedAt : -1})
        // get department name
        res.status(200).send(request)
    }
    catch(e){
        res.status(500).send(''+e)
    }
})

// router.delete('/mcqquestions/:id', auth.authentication, auth.authorization , async (req, res) =>{
//     try{        
//         await MCQQuestion.findByIdAndDelete(req.params.id)
//         res.status(200).send(true)
//     }
//     catch(e){
//         res.status(500).send(''+e)
//     }
// })

// //old
// router.get('/mcqquestions/:quizid', async (req, res) => {
//     try {         
//         const quizid = req.params.quizid
//         const { noofquestions } = await Quiz.findById(quizid) 
//         //logic to get random questions 
//         const questions = await MCQQuestion.aggregate([ 
//             { $match : { quiz : mongoose.Types.ObjectId(quizid) }} , 
//             { $sample : { size : noofquestions.noofmcqquestions } }
//         ])   

//         questions.forEach( element => {  
//             element.options.forEach( option => delete option.iscorrect)
//         });


//         //put questions into mcqresponse for student
//         res.status(200).send(questions)
//     }
//     catch(e){
//         res.status(500).send(''+e)
//     }
// })

module.exports = router