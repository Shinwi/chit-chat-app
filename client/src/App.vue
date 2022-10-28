<template>
  <div>
    <div v-if="isChatRoom">
      <ChatRoom :socket="socket"/>
    </div>
   <div v-else class="homePage">
      <div class="wrapper">
        <h1>Welcome!</h1>
        <p>Have a chat!</p>
        <form>
          <input type="text" placeholder="Enter username" v-model="userName">
          <input placeholder="Enter Code" v-model="inviteRoomCode">
        </form>
        <button class="btn" @click="joinRoom()">Join Chat</button>
        <p class="or">
          Dont have a code?
        </p>
        <div class="not-member">
          <button class="btn" @click="createRoom()">Create Chatroom</button>
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
      if (!this.userName.length) { 
        alert('User name cannot be empty')
        return
      }
      // alert('creating room: ' + this.playerName)
      this.socket.emit('createRoom', {userName: this.userName})
      this.isChatRoom = true
    },
    joinRoom () {
      if (!this.inviteRoomCode.length || !this.userName.length) {
        alert('Username and room code cannot be empty')
        return
      }
      // alert('joining room: ' + this.inviteRoomCode)
      this.socket.emit('joinRoom', {userName: this.userName, roomCode: this.inviteRoomCode})
      this.isChatRoom = true
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
body{
  background: #dfe9f5;
}
.homePage {
  border: thin solid violet;
  width: 100vw;
  height: 100vh;
}
.wrapper{
  border: thick solid green;
  width: 330px;
  padding: 2rem 0 1rem 0;
  margin: 80px auto;
  background: #fff;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.1);
}
h1{
  font-size: 2rem;
  color: #07001f;
}
p{
  margin-bottom: 1.7rem;
}
form input{
  width: 85%;
  outline: none;
  border: none;
  background: #dfe9f5;
  padding: 12px 14px;
  margin-bottom: 10px;
  border-radius: 10px;
}
button{
  background:  rgb(245, 176, 27);
  color: #fff;
}
button:hover{
  background: rgba(201, 107, 0, 0.767);
}
.btn {
  font-size: 1.1rem;
  margin-top: 1rem;
  padding: 8px 0;
  border-radius: 5px; 
  border: none;
  width: 85%;
  cursor: pointer;
}
.or{
  margin-top: 1rem;
}
.icons i{
  color: #07001f;
  padding: 00.8rem 1.5rem;
  border-radius: 10px;
  margin-left: .9rem;
  font-size: 1.5rem;
  cursor: pointer;
  border: 2px solid #dfe9f5;
}
.icons i:hover{
  color: #fff !important;
  background: #07001f;
  transition: 1s;
}
.icons i:first-child{
  color: green;
}
.icons i:last-child{
  color: blue;
}
</style>
