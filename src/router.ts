import Vue from 'vue';
import Router from 'vue-router';
import Upload from './views/Upload.vue';
import Download from './views/Download.vue';
import Home from './views/Home.vue';
import PageNotFound from './views/PageNotFound.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import firebase from 'firebase';
import Upload2 from './views/Upload-Auth.vue';

Vue.use(Router)

let router = new Router({
  
  routes: [
    {
      path: '/',
      name: 'upload',
      component: Upload,
      meta: {
        requiresAuth: false
    }
    },
    {
      path: '/upload-Auth',
      name: 'upload-Auth',
      component: Upload2,
      meta: {
        requiresAuth: true
    }
    },
    { 
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresGuest: true
    }

    },
    { 
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
    }

    },
    {
      path: '/download/:fileUrl',
      name: 'download',
      component: Download ,
      meta: {
        requiresAuth: false
      }
      
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
          requiresAuth: false
      }
    },
    {
      path: '*',
      name: 'pagenotfound',
      component: PageNotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!firebase.auth().currentUser) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else if(to.matched.some(record => record.meta.requiresGuest)){
    if(firebase.auth().currentUser) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;