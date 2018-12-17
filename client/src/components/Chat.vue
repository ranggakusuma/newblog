<template>
  <div class="container d-flex justify-content-center">
    <b-card-group deck>
      <b-card header="Chatting" class="FixedHeightContainer" header-tag="header">
        <div class="Content">
          <b-card v-for="(chat, i) in chats" :key="i" class="my-2">
            <div slot="header" class="emailChat">
              {{chat.email}}
            </div>
            <p>{{chat.message}}</p>
          </b-card>
        </div>
        <!-- <b-button href="#" variant="primary">Go somewhere</b-button> -->
        <div slot="footer">
          <b-form @submit.prevent="sendChat">
            <div class="input-group align-item-center">
              <input type="text" placeholder="Input something .." class="form-control" v-model="message">
              <div class="input-group-append">
                <button type="submit" class="btn btn-primary">
                  <span class="input-group-addon" style="width: 1%;">
                    <i class="fa fa-send"></i>
                  </span>
                </button>
              </div>
            </div>
          </b-form>
        </div>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      chats: {}
    }
  },
  mounted() {
    // console.log("mounted here");
    this.$emit("formtitle", "Chatting Blogger");
    this.readChat()
  },
  methods: {
    sendChat() {
      console.log(this.message)
      var database = firebase.database().ref('chats');
      database.push().set({
        email: localStorage.email,
        message: this.message
      })
      this.message = ''
    },
    readChat() {
      let database = firebase.database().ref('chats');

      database.on('value', (data) => {
        this.chats = data.val()
      })
    }
  }
};
</script>

<style>
.FixedHeightContainer {
  /* float:right; */
  /* height: 250px; */
  width: 100vh;
  padding: 3px;
  /* background: #f00; */
}
.Content {
  height: 224px;
  overflow: auto;
  background: #fff;
}
.emailChat{
  font-style: italic;
  font-weight: bold;
  font-size: 12px
}
</style>
