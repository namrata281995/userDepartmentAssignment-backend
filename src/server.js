const express = require('express')
const app = express()
const cors = require('cors')
require('./db/mongoose')

const port = process.env.PORT || 5003
const http = require('http')
const socketio = require('socket.io')

const server = http.createServer(app) 
const io = socketio(server)

const userRouter = require('./routers/user')
const departmentRouter = require('./routers/department')
const requestRouter = require('./routers/request') 

app.use(express.json())
app.use(cors())

app.use(userRouter)
app.use(departmentRouter)
app.use(requestRouter) 

io.on('connection', (socket) => {
    console.log('socket io connection')

    socket.on('join',(userid) => {
        socket.join(userid)
    })

    socket.on('requestupdate', ({userid, status, username}) => {
        console.log(userid,username, status)
        socket.to(userid).emit('notify',`${username} has ${status} your request. Please check your requests.`)
    })

    socket.on('createrequest', ({ userid, sender, department}) => {
        socket.to(userid).emit('notify',`You have a new request from ${sender} from department - ${department}. Please check your department requests.`)
    })
})

server.listen(port, ()=> { 
    console.log('Connected Successfully!!')
})
