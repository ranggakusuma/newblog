<template>
  <div id="app">

    <b-navbar toggleable="md" type="dark" variant="info" :sticky="true">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#">RangBlog</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form @submit.prevent="">
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-navbar-nav>
            <router-link to="/" tag="div"><b-nav-item href="#">Home</b-nav-item></router-link>
            <router-link to="/login" tag="div" v-if="!isLogin"><b-nav-item href="#">Login</b-nav-item></router-link>
            <router-link to="/register" tag="div"><b-nav-item href="#" v-if="!isLogin">Register</b-nav-item></router-link>
            <router-link to="/myarticle" tag="div"><b-nav-item href="#" v-if="isLogin">My Article</b-nav-item></router-link>
            <router-link to="/chat" tag="div"><b-nav-item href="#" v-if="isLogin">Chat here!</b-nav-item></router-link>
            <b-nav-item href="#" v-if="isLogin" @click="logoutUser">Logout</b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- here the view -->
    <router-view @loginstatus="checkLogin" :loginstatus="isLogin"/>
  </div>
</template>

<script>
import blogApi from '@/api/blogApi'
export default {
  data() {
    return {
      isLogin: ''
    }
  },
  methods: {
    checkLogin() {
      let token = localStorage.token
      // console.log(token)
      console.log('from check login')
      blogApi
        .get('/verify', {
          headers: {
            auth: token
          }
        })
        .then(({data}) => {
          // console.log(data)
          this.isLogin = data._id
        }).catch((err) => {
          // console.log(err.response.data.message)
        });
    },
    logoutUser() {
      localStorage.clear()
      this.isLogin = ''
      this.$router.push({name: 'home'})
    }
  },
  mounted() {
    this.checkLogin()
  }
}
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

body {
  background-color: #e5e5e5;
}

.container {
  background-color: #fff;
}
</style>
