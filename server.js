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

io.listen(server)

// https://www.tutorialspoint.com/socket.io/socket.io_namespaces.htm
const peers = io.of('/webrtcPeer')

// keep a reference of all socket connection
let connectedPeers = new Map()

peers.on('connection', socket=>{
    console.log(socket.id)
    socket.emit('connection-success', {succuss:socket.id})
   
    connectedPeers.set(socket.id, socket)

    socket.on('disconnect',()=>{
        console.log('disconnected')
        connectedPeers.delete(socket.id)
    })

    socket.on('offerOrAnswer', (data)=>{
        // send  to the other peer if any
        for(const [socketID, socket] of connectedPeers.entries()){
            // dont send to self
            if(socketID !== data.socketID){
                console.log(socketID, data.payload.type)
                socket.emit('offerOrAnswer', data.payload)
            }
        }
    })

    socket.on('candidate', (data)=>{
        // send candidate to the other peer(s) if any
        for (const [socketID, socket] of connectedPeers.entries()){
            // if kdo not send to self
            if(socketID !== data.socketID){
                console.log(socketID, data.payload)
                socket.emit('candidate', data.payload)
            }
        }
    })

})
