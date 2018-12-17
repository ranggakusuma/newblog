<template>
  <b-form @submit.prevent="loginUser">
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
  name: "loginform",
  data() {
    return {
      email: "",
      password: "",
      loggedin: "",
      dismissSecs: 5,
      dismissCountDown: 0,
      errorMsg: ''
    };
  },
  mounted() {
    this.$emit("formtitle", "Login Form");
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    loginUser() {
      let input = {
        email: this.email,
        password: this.password
      };

      blogApi
        .post("/login", input)
        .then(({ data }) => {
          // console.log(data);
          localStorage.token = data.token;
          localStorage.email = data.email;
          localStorage._id = data._id;
          this.loggedin = data._id;
          this.$emit("loginstatus", this.loggedin);
          this.$router.push({ name: "home" });
          this.clearState();
        })
        .catch(err => {
          this.showAlert()
          this.errorMsg = err.response.data.message
          // console.log(err.response.data.message);
        });
    },
    clearState() {
      this.email = "";
      this.password = "";
      this.loggedin = "";
    }
  }
};
</script>

<style>
</style>
