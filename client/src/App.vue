<template>
  <div id="app">
    <div v-if="isChatRoom">
      <ChatRoom :socket="socket"/>
    </div>
    <div v-else>
      <h1>Chat app</h1>
      <input type="text" id="message-input" placeholder="Enter Name" v-model="userName">
      <div class="options">
        <div>
          <button type="submit" id="send-button" :disabled="!userName.length" @click="createRoom()">Create room</button>
        </div>
        <span>Or</span>
        <div>
          <input type="text" id="message-input" placeholder="Enter room code" v-model="inviteRoomCode"> 
          <button type="submit" id="send-button" @click="joinRoom()">Join</button>
        </div>
      </div>
   </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import ChatRoom from './components/ChatRoom.vue'

export default {
  name: 'App',
  data () {
    return {
      socket: {},
      userName: '',
      inviteRoomCode: '',
      isChatRoom: false
    }
  },
  components: {
    ChatRoom
  },
  created () {
    // giving the socket obj the address of our (local) server
    this.socket = io('http://localhost:3000')

    // connecting to the server
    this.socket.on('connect', () => {
      console.log('user id: ' + this.socket.id)
    })
  },
  methods: {
    createRoom () {
      // alert('creating room: ' + this.playerName)
      this.socket.emit('createRoom', {userName: this.userName})
      this.isChatRoom = true
    },
    joinRoom () {
      alert('joining room: ' + this.inviteRoomCode)
      // emit joinRoom
      this.isChatRoom = true
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 70%;
  margin: auto;
}
.options {
  border: thin solid black;
  display: flex;
  justify-content: space-around;
}
</style>
