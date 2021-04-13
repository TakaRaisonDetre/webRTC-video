const express = require('express')
var io = require('socket.io')
({
    path:'/webrtc-video-chat'
})

const app = express()
const port = 8080

//app.get('/', (req, res)=> res.send("hellow world express check"))
app.use(express.static(__dirname+'/build'))
app.get('/', (req, res, next)=>{
    res.sendFile(__dirname + '/build/index.html')
})


const server = app.listen(port, ()=>console.log("Example App listening on port 8080"))