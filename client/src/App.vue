<template>
  <div id="app">
    <h1>Chat app</h1>
    <input type="text" id="message-input" placeholder="Enter Name">
    <div class="options">
      <div>
        <button type="submit" id="send-button">Create room</button>
      </div>
      <span>Or</span>
      <div>
        <input type="text" id="message-input" placeholder="Enter room code">
        <button type="submit" id="send-button">Join</button>
      </div>
    </div>

    <!-- <div id="message-container"></div>
    <form id="send-container">
      <input type="text" id="message-input">
      <button type="submit" id="send-button">Send</button>
    </form> -->
  </div>
</template>

<script>

export default {
  name: 'App',
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
