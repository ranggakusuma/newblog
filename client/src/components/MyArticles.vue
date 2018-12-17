<template>
    <div class="list-group my-2" >
      <!-- {{article._id}} -->
      <router-link :to="'/myarticle/' + article._id" tag="div">
      <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between border-bottom ">
          <h5 class="mb-3 ">{{article.title}}</h5>
        </div>
        <p class="mb-1">{{article.text | highlight}}</p>
        <small>{{article.userId.email}}</small>
      </a>
      </router-link>
    </div>
</template>

<script>
import blogApi from '@/api/blogApi';

export default {
  name: 'articles',
  data() {
    return {
    };
  },
  props: ['article'],
  filters: {
    highlight(v) {
      return v.substring(0,100) + ' ...'
    }
  },
  
};
</script>

<style scoped>

</style>
