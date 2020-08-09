const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    userid : {
        type : String,
        required : true,
        unique : true,
        trim : true
    }, 
    password : {
        type : String,
        required : true,
        trim : true
    },
    tokens :[{
        token : String
    }],
    username : {
        type : String
    },
    department : {
        type : String,
        ref : 'Department'
    }
})

userSchema.statics.findByCredential = async function(userid, password){ 
    const user = await User.findOne({ userid })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.methods.generateAuthToken = async function(){
    const user = this

    const token = jwt.sign({_id : user._id},'thisismyjwttoken')   
    user.tokens.push({token})

    await user.save()

    return token;
}

userSchema.methods.toJSON = function(){
    const user = this
    const userObj = user.toObject();

    delete userObj.tokens
    delete userObj.password 
    return userObj;
}

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8) 
    }

    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User
