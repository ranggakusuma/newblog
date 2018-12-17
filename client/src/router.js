import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import MyArticle from './views/MyArticle.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Form.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Form.vue'),
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import(/* webpackChunkName: "chat" */ './views/Form.vue'),
    },
    {
      path: '/myarticle',
      name: 'myarticle',
      component: MyArticle,
      children: [
        {
          path: 'newarticle',
          name: 'newarticle',
          component: () => import(/* webpackChunkName: "new-article" */ './components/ArticleAdd.vue'),
        },
        {
          path: ':articleId',
          name: 'articledetail',
          component: () => import(/* webpackChunkName: "article-detail" */ './components/ArticleDetail.vue'),
        },
        {
          path: ':articleId/edit',
          name: 'articleedit',
          component: () => import(/* webpackChunkName: "article-edit" */ './components/ArticleEdit.vue'),
        },
      ],
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: ':articleId',
          name: 'articledetail',
          component: () => import(/* webpackChunkName: "article-detail" */ './components/ArticleDetail.vue'),
        },
      ],
    },
  ],
});
