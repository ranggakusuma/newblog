<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <Articles/> -->
    <div class="container my-2 py-2 rounded">
      <div class="row">
        <div class="col-4">
          <Articles v-for="(article, i ) in Articles" :key="i" :article="article"/>
        </div>
        <div class="col-8">
          <router-view :loginstatus="loginstatus"></router-view>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import blogApi from '@/api/blogApi';
import Articles from '@/components/Articles.vue';

export default {
  name: 'home',
  components: {
    // HelloWorld,
    Articles,
  },
  data() {
    return {
      Articles: [],
    };
  },
  methods: {
    readAllArticle() {
      // console.log('reading all article');
      blogApi
        .get('/article')
        .then(({data}) => {
          // console.log(data);
          this.Articles = data
        }).catch((err) => {
          console.log(err.response.data.message);
        });
    },
  },
  mounted() {
    this.readAllArticle();
  },
  props: ['loginstatus']
};
</script>
