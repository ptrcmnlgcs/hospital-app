// routes.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginView.vue'
import RegisterPage from '../views/RegisterView.vue'
import NavigationBar from '../components/NavigationBar.vue'
import AddPatient from '../components/AddPatient.vue';
import EditPatient from '../components/EditPatient.vue';
import AdminViewPatient from '../components/AdminViewPatient.vue';
import ViewOwnRecords from '../components/ViewOwnRecords.vue';
import EditProfile from '../components/EditProfile.vue';


const routes = [
  { path: '/', component: LoginPage, name: 'login' },
  { path: '/register', component: RegisterPage, name: 'register' },
  {
    path: '/home', component: NavigationBar, name: 'home',
    beforeEnter: (to, from, next) => {
      // check if user is logged in and redirect to login page if not
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/')
      }
    }
  },
  { path: '/add-patient', name: 'AddPatient', component: AddPatient },
  { path: '/edit-patient', name: 'EditPatient', component: EditPatient },
  { path: '/admin-view-patient', name: 'AdminViewPatient', component: AdminViewPatient },
  { path: '/view-own-records', name: 'ViewOwnRecords', component: ViewOwnRecords },
  { path: '/edit-profile', name: 'EditProfile', component: EditProfile },
  {
    path: '/logout',
    name: 'logout',
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      console.log('logout');
      localStorage.removeItem('token');
      next('/');
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
