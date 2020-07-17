import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard';
import NewEmployee from '@/components/NewEmployee';
import ViewEmployee from '@/components/ViewEmployee';
import EditEmployee from '@/components/EditEmployee';
import Login from '@/components/Login';
import Register from '@/components/Register';
import firebase from 'firebase';

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      // to protect dashboard(more like not allow it show when loggout)
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
          // Dont want you going to login if you are a guest
         meta: {
          requiresGuest: true
        }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
          // Dont want you going to reg if you are a guest
          meta: {
            requiresGuest: true
          }
    },
    {
      path: '/new',
      name: 'new-employee',
      component: NewEmployee,
         // to protect dashboard(more like not allow it show when loggout)
         meta: {
          requiresAuth: true
        }
    },
    {
      path: '/edit/:employee_id',
      name: 'edit-employee',
      component: EditEmployee,
         // to protect dashboard(more like not allow it show when loggout)
         meta: {
          requiresAuth: true
        }
    },
    {
      path: '/:employee_id',
      name: 'view-employee',
      component: ViewEmployee,
         // to protect dashboard(more like not allow it show when loggout)
         meta: {
          requiresAuth: true
        }
    },
   
  ]
})

// Nav Guard
router.beforeEach((to, from, next) => {
  // check for requiredAuth guard
  if(to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NOT logged in
    if(!firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to the route by calling next()
      next();
    }
    // check for requiredGuest guard
  } else if(to.matched.some(record => record.meta.requiresGuest)) {
    // Check if logged in
    if(firebase.auth().currentUser) {
      // Go to Dashboard
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to the route by calling next()
      next();
    }
  } else {
     // Proceed to the route by calling next()
     next();
  }
});

export default router;

