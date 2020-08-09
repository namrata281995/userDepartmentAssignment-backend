const mongoose = require('mongoose')

// mongoose.connect('mongodb://127.0.0.1:27017/userdepartmentapp',{
//     useNewUrlParser: true,
//     useCreateIndex : true,
//     useUnifiedTopology: true
// })

mongoose.connect('mongodb+srv://namrata:nami@28@cluster0.emtnv.mongodb.net/userdepartmentapp?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useCreateIndex : true,
    useUnifiedTopology: true
})


