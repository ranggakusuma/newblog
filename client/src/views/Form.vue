<template>
  <div>
    <div class="container my-2 py-2 px-4 rounded">
      <h1 class="text-center">{{title}}</h1>
      <LoginForm @formtitle="setTitle" @loginstatus="$emit('loginstatus')" v-if="$route.path=='/login'"/>
      <RegisterForm @formtitle="setTitle" @loginstatus="$emit('loginstatus')" v-else-if="$route.path=='/register'"/>
      <!-- <ArticleAdd @formtitle="setTitle" v-else-if="$route.path=='/myarticle/newarticle'"/> -->
      <Chat @formtitle="setTitle"></Chat>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import RegisterForm from '@/components/RegisterForm.vue';
import Chat from '@/components/Chat.vue';

export default {
  name: 'Formpage',
  components: {
    LoginForm,
    RegisterForm,
    Chat
  },
  data() {
    return {
      title: ''
    };
  },
  methods: {
    setTitle(payload) {
      console.log('set title')
      this.title = payload
    }
  }
}
</script>

<style>

</style>
