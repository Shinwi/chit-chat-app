<template>
  <div>
    <h1>Room Code: {{ roomCode }}</h1>
    <div class="usersList">
        <div v-for="(user, idx) in this.usersInRoom" :key="user.userId">
            <h4>User {{ idx + 1}}: {{ user.userName }}</h4>
        </div>
    </div>
    <div id="message-container"></div>
    <form id="send-container">
      <input type="text" id="message-input">
      <button type="submit" id="send-button">Send</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'ChatRoom',
  props: ['socket'],
  data () {
    return {
        roomCode: '',
        usersInRoom: []
    }
  },
  created () {
    this.socket.on('roomInfoUpdate', data => {
        console.log(data)
        this.roomCode = data.roomCode
        this.usersInRoom = data.allUsersInRoom
    })
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
    width: 80%;
    display: flex;
}

#message-input {
    flex-grow: 1;
}
</style>
