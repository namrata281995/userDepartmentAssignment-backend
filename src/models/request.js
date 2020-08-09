const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        required :true,
        ref : 'User'
    },
    createdByName : String,
    status : {
        type : String,
        default : 'Pending'
    },
    department : {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Department'
        },
    departmentName : {
        type : String
    },
    assignedToName : {
        type : String
    },
    assignedTo : {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    message : String
}, { timestamps: true })

const request = mongoose.model('Request', requestSchema)

module.exports = request