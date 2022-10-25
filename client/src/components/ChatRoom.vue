<template>
  <div>
    <h1>Room Code: {{ roomCode }}</h1>
    <div class="usersList">
        <div v-for="(user, idx) in this.usersInRoom" :key="user.userId">
            <h4>User {{ idx + 1}}: {{ user.userName }}</h4>
        </div>
    </div>
    <div id="message-container"></div>
    <div id="send-container">
      <input type="text" id="message-input" v-model="chatMessage">
      <button type="submit" id="send-button" @click="sendMessage()">Send</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ChatRoom',
  props: ['socket'],
  data () {
    return {
        roomCode: '',
        chatMessage:'',
        usersInRoom: []
    }
  },
  created () {
    this.socket.on('roomInfoUpdate', data => {
        this.roomCode = data.roomCode
        this.usersInRoom = data.allUsersInRoom
    }),
    this.socket.on('receivedMessage', data => {
        this.displayReceiverMessage(data.receivedMessage)
    })
  },
  methods: {
    sendMessage () {
        if (this.chatMessage.length === 0) return
        this.displaySenderMessage(this.chatMessage)
        this.socket.emit('sendMessage', {message: this.chatMessage, roomCode: this.roomCode})
        this.chatMessage = ''
    },
    displaySenderMessage (message) {
        let messageElement = document.createElement('p')
        let sender = this.usersInRoom.filter(u => u.userId === this.socket.id)
        messageElement.innerHTML = `${sender[0].userName}: ${message}`
        document.getElementById('message-container').appendChild(messageElement)
    },
    // this will only work when there is only 2 people in the room
    displayReceiverMessage (message) {
        let messageElement = document.createElement('p')
        let receiver = this.usersInRoom.filter(u => u.userId !== this.socket.id)
        messageElement.innerHTML = `${receiver[0].userName}: ${message}`
        document.getElementById('message-container').appendChild(messageElement)
    }
  }
}
</script>

<style>
.usersList {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: auto;
  margin-bottom: 20px;
  height: 100px;
}
/*chat messages styling*/
body {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
}

#message-container {
    width: 80%;
    max-width: 1200px;
}

#message-container div {
    background-color: #CCC;
    padding: 5px;
}

#message-container div:nth-child(2n) {
    background-color: #FFF;
}

#send-container {
    position: fixed;
    padding-bottom: 30px;
    bottom: 0;
    background-color: white;
    max-width: 1200px;
    width: 40%;
    margin: auto;
    display: flex; 
}

#message-input {
    flex-grow: 1;
}
</style>
