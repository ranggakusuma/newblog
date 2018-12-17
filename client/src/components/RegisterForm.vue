<template>
  <b-form @submit.prevent="registUser">
    <div class="row">
      <div class="col-12">
        <b-alert
          :show="dismissCountDown"
          dismissible
          variant="danger"
          @dismissed="dismissCountDown=0"
          @dismiss-count-down="countDownChanged"
        >{{errorMsg}} | dismiss after {{dismissCountDown}} seconds...
        </b-alert>
      </div>
    </div>


    <div class="row">
      
      <div class="col-6">
        <b-form-group id="name" label="Name: " label-for="name">
          <b-form-input
            id="name"
            type="text"
            v-model="name"
            placeholder="Enter your name"
            autocomplete="off"
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="col-6">
        <b-form-group id="phone" label="phone: " label-for="phone">
          <b-form-input
            id="phone"
            type="text"
            v-model="phone"
            placeholder="Enter your phone"
            autocomplete="off"
          ></b-form-input>
        </b-form-group>
      </div>
    </div>

    <div class="row">
      
      <div class="col-6">
        <b-form-group id="emailGroup" label="Email: " label-for="email">
          <b-form-input
            id="email"
            type="text"
            v-model="email"
            placeholder="Enter your email"
            autocomplete="off"
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="col-6">
        <b-form-group id="passwordGroup" label="Password: " label-for="password">
          <b-form-input
            id="password"
            type="password"
            v-model="password"
            placeholder="Enter your password"
            autocomplete="off"
          ></b-form-input>
        </b-form-group>
      </div>
    </div>

    
    

    <div class="row">
      <div class="col-12">
        <b-button :variant="'outline-success'" :type="'submit'">Submit</b-button>
      </div>
    </div>
  </b-form>
</template>

<script>
import blogApi from "@/api/blogApi";

export default {
  name: "registerform",
  data() {
    return {
      email: "",
      password: "",
      phone: "",
      name: "",
      loggedin: "",
      dismissSecs: 5,
      dismissCountDown: 0,
      errorMsg: ''
    };
  },
  mounted() {
    this.$emit("formtitle", "Register Form");
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    registUser() {
      let input = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        password: this.password
      };
      // console.log(input)

      blogApi
        .post('/register', input)
          .then(({data}) => {
            this.$router.push({ name: "home" });
            this.clearState();
          }).catch((err) => {
            this.errorMsg = err.response.data.message
            this.showAlert()
          });
    },
    clearState() {
      this.name = "";
      this.phone = "";
      this.email = "";
      this.password = "";
      this.loggedin = "";
    }
  }
};
</script>

<style>
</style>
