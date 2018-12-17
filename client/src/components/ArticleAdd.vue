<template>
  <b-form @submit.prevent="newArticle">
    <div class="row">
      <h1>Add new Article</h1>
      <div class="row">
        <div class="col-12">
          <b-alert
            :show="dismissCountDown"
            dismissible
            variant="danger"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
          >{{errorMsg}} | dismiss after {{dismissCountDown}} seconds...</b-alert>
        </div>
      </div>
      <div class="col-12">
        <b-form-group id="title" label="Title: " label-for="title">
          <b-form-input
            id="title"
            type="text"
            v-model="title"
            placeholder="Enter article's title"
            autocomplete="off"
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="col-12">
        <b-form-group id="text" label="Text: " label-for="text">
          <b-form-textarea
            id="textarea2"
            v-model="text"
            placeholder="Enter something"
            :rows="3"
          ></b-form-textarea>
        </b-form-group>
      </div>
      <div class="col12">
        <b-button variant="primary" type="submit">Submit</b-button>
      </div>
    </div>
  </b-form>
</template>

<script>
import blogApi from '@/api/blogApi'

export default {
  data() {
    return {
      title: "",
      text: "",
      dismissSecs: 5,
      dismissCountDown: 0,
      errorMsg: ""
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    newArticle() {
      let input = {
        title: this.title,
        text: this.text
      }
      blogApi
        .post('/article', input, {
          headers: {
            auth: localStorage.token
          }
        })
        .then(({data}) => {
          this.$router.push({name: 'myarticle'})
        }).catch((err) => {
          console.log(err)
          this.errorMsg = err.response.data.message
          this.showAlert()
        });
      
    }
  }
};
</script>

<style>
</style>
