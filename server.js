const express = require('express');
const { Socket } = require('socket.io');
const app = express();
const http = require('http').createServer(app)


const PORT = process.env.PORT || 3000


app.use(express.static(__dirname + '/public'))      // looks inside the public folder directly

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('connected...  ');
    
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    })
})

http.listen(PORT, () => {
    console.log(`Listening on port - ${PORT}`);
})