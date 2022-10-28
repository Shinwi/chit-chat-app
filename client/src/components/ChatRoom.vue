<template>
  <div class="chatPage">
    <div class="roomCodeContainer">
      <h1>Room Code: {{ roomCode }}</h1>
    </div>
    <div class="usersList">
        <div v-for="(user, idx) in this.usersInRoom" :key="user.userId">
            <h4>User {{ idx + 1}}: {{ user.userName }}</h4>
        </div>
    </div>
    <div class="chat">
      <div class="chat__messages" id="message-container"></div>
      <div class="chat__input">
        <input type="text" style="width:60%; height:fit-content;" placeholder="Enter your message here" v-model="chatMessage" @keyup.enter="sendMessage()">
        <button type="submit"  @click="sendMessage()" >Send</button>
      </div>
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
        messageElement.setAttribute('style', 'color:white;')
        let sender = this.usersInRoom.filter(u => u.userId === this.socket.id)
        messageElement.innerHTML = `${sender[0].userName}: ${message}`
        document.getElementById('message-container').appendChild(messageElement)
    },
    // this will only work when there is only 2 people in the room
    displayReceiverMessage (message) {
        let messageElement = document.createElement('p')
        messageElement.setAttribute('style', 'color:white;')
        let receiver = this.usersInRoom.filter(u => u.userId !== this.socket.id)
        messageElement.innerHTML = `${receiver[0].userName}: ${message}`
        document.getElementById('message-container').appendChild(messageElement)
    }
  }
}
</script>

<style scoped>
.roomCodeContainer {
  border: thin solid black;
  text-align: center;
}
.usersList {
  border: thin solid rebeccapurple;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: auto;
  /*we can increase height here later??*/
  /*this div can be container to the users names and profile pic??*/
}


/* CHAT */
.chat {
  display: flex;
  flex-direction: column;
  flex: 0.75;
  background-color: #363a3f;
  height: 80vh;
  width: 100%;
  border: thin solid red;
}

.chat__input {
  color: lightgray;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-radius: 5px;
  margin: 20px;
  border-top: 1px solid gray;
  background-color: #474b53;
}

.chat__input > input {
  padding: 15px;
  background: transparent;
  border: none;
  outline-width: 0;
  color: white;
  font-size: large;
  width: 100%;
}

.chat__input > form {
  flex: 1;
}

.chat__inputButton {
  display: none;
}

.chat__inputIcons > .MuiSvgIcon-root {
  padding: 5px;
}

.chat__messages {
  flex: 1;
  overflow: scroll;
}

.chat__messages::-webkit-scrollbar {
  display: none;
}

.chat__messages {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
