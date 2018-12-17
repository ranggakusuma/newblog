<template>
  <div class="home">
    <div class="container my-2 py-2 rounded">
      <div class="row">
        <div class="col-4">
          <router-link to="/myarticle/newarticle" tag="div"><b-button :variant="'outline-success'">Add New</b-button></router-link>
          <MyArticles v-for="(article ) in Articles" :key="article._id" :article="article"/>
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
import blogApi from '@/api/blogApi'
import MyArticles from '@/components/MyArticles.vue';

export default {
  name: 'myarticle',
  props: ['loginstatus'],
  components: {
    // HelloWorld,
    MyArticles,
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
        .get('/article/my', {
          headers: {
            auth: localStorage.token
          }
        })
        .then(({data}) => {
          console.log(data);
          this.Articles = data
        }).catch((err) => {
          console.log(err.response.data.message);
        });
    },
  },
  mounted() {
    console.log('kepanggil ')
    this.readAllArticle();
  },
  watch: {
    $route() {
      this.readAllArticle();
    }
  }

};
</script>
