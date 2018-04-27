<template>
  <div class="hello">

    <h1>Messages : </h1>
    <br>
    <p v-for="(message, index) in messages" :key="index">- {{message.content}} ({{message.author}})</p>
    <br>
    <input type="text" v-model="msg.content" placeholder="Message" />
    <input type="text" v-model="msg.author" placeholder="Author" />
    <button @click="sendMsg()">Send</button>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      messages: [],
      msg: {
        content: "",
        author: ""
      }
    }
  },

  sockets: {
			new_message: function(msg) {
				this.messages.push(msg);
      },
      messages: function(messages) {
        this.messages = messages;
      }
	},

  methods: {
    sendMsg: function () {
      if (this.msg.content !== "" && this.msg.author !== "") {
        this.$socket.emit('post_message', this.msg);
        this.msg.content = "";
        this.msg.author = "";
      } else {
        alert('No field can stay empty !');
      }
    }
  },

  created() {
    this.$socket.emit('get_messages');
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
</style>
