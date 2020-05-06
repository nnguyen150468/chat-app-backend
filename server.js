require('dotenv').config()
const Filter = require('bad-words')
const http = require('http');
const socketio = require('socket.io')
const app = require('./app');

const server = http.createServer(app);


const io = socketio(server)

io.on("connection", function(socket){
    
    socket.on("chat", (chatObj, cb) =>{
        const filter = new Filter();
        console.log('chatObj', chatObj)
        if(filter.isProfane(chatObj.text)){
            return cb("Bad words are not allowed");
        }

        io.emit("message", chatObj)
    })
    console.log("establihsed a connection")
})

server.listen(process.env.PORT, () => {
    console.log("server listening on port " + process.env.PORT);
});
