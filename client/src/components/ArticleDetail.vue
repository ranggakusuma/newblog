<template>
  <div class="flex">
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

    <h1>{{title}}</h1>
    <small class>
      Posted by:
      <b>{{email}}</b>
    </small>
    <div class="my-3">{{text}}</div>
    <div class="border-bottom border-top">
      <router-link :to="'/myarticle/'+id+'/edit'">
        <b-button v-if="loginstatus == userId" class="align-right my-2 btn-success btn-sm mx-2">Edit</b-button>
      </router-link>
      <b-button
        v-if="loginstatus == userId"
        class="align-right my-2 btn-danger btn-sm mx-2"
        @click="deleteArticle(id)"
      >Delete</b-button>
    </div>

      <h4 class="my-2">Comments</h4>
    <div class="col-12 my-2" v-for="(comment, i) in comments" :key="i">
      <div  class="card py-2 px-2 my-2">
        <small class="mb-2">Email:
          <b>{{comment.email}}</b>
        </small>
        <p>{{comment.comment}}</p>
      </div>
      
      <b-button class="btn-sm btn-danger my-2" v-if="comment._id == loginstatus" @click="deleteComment(i)">Delete</b-button>
    </div>
    <div class="col-12 my-2">
      <b-form @submit.prevent="writeComment">
      <b-form-textarea
        id="textarea1"
        v-model="comment"
        placeholder="Enter something"
        :rows="3"
        :max-rows="6"
      ></b-form-textarea>
      <b-button variant="primary my-2" type="submit">Send</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import blogApi from "@/api/blogApi";
export default {
  props: ["loginstatus"],
  data() {
    return {
      title: "",
      text: "",
      email: "",
      userId: "",
      id: "",
      errorMsg: "",
      dismissSecs: 5,
      dismissCountDown: 0,
      comments: "test",
      comment: ""
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    readDetail() {
      // console.log(this.$route.params.articleId, 'ini article id nya ')
      let articleId = this.$route.params.articleId;
      console.log(articleId);
      blogApi
        .get("/article/" + articleId)
        .then(({ data }) => {
          // console.log(data)
          this.title = data.title;
          this.text = data.text;
          this.email = data.userId.email;
          this.userId = data.userId._id;
          this.id = data._id;
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    },
    deleteArticle() {
      let id = this.$route.params.articleId;
      blogApi
        .delete("article/" + id, {
          headers: {
            auth: localStorage.token
          }
        })
        .then(({ data }) => {
          this.$router.push({ name: "myarticle" });
        })
        .catch(err => {
          console.log(err, "error delete");
          this.errorMsg = err.response.data.message;
          this.showAlert();
        });
    },
    readComment() {
      let id = this.$route.params.articleId;
      var database = firebase.database().ref("/comment/" + id);

      database.on("value", comments => {
        this.comments = comments.val();
      });
    },
    writeComment() {
      // console.log(this.comment, 'write comment')
      let input = {
        _id: localStorage._id,
        email: localStorage.email,
        comment: this.comment
      }
      var database = firebase.database().ref("/comment/"+this.$route.params.articleId);
      
      database.push().set(input)
      this.comment = ''
    },
    deleteComment(id) {
      console.log(id, 'ini id nya ')
      var database = firebase.database().ref("/comment/"+this.$route.params.articleId + '/' + id);

      database.remove()
    }
  },
  mounted() {
    this.readDetail();
    this.readComment();
  },
  watch: {
    $route() {
      // console.log('ini article detail')
      this.readDetail();
      this.readComment();
    }
  }
};
</script>

<style>
</style>
