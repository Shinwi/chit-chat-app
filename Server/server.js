const {addUser, getUsersInRoom} = require('./users')

// init the socketio connection
const io = require('socket.io')(3000, {
    cors: {
        origin: ['http://localhost:8080']
    }
})

io.on('connection', socket => {
    console.log(socket.id + ' just connected!')

    // creating a room and adding user to it
    socket.on('createRoom', (payload) => {
        console.log('crrt room')
        console.log(payload)
        console.log(socket.id.slice(-6))
        let roomCode = socket.id.slice(-6)
        let userName = payload.userName
        // registering the new player
        addUser(socket.id, userName, roomCode)

        // adding user to the room
        socket.join(roomCode)
        
        let allUsersInRoom = getUsersInRoom(roomCode)
        console.log('ALL PLAYERS IN ROOM')
        console.log(allUsersInRoom)
        // sending back to client info about created room
        io.sockets.in(roomCode).emit('roomInfoUpdate', {roomCode, userName, allUsersInRoom})
    })
})
