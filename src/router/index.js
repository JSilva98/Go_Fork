import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import register from "@/views/Register.vue";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue"
import services from "@/views/Catalog.vue";
import Menu from "@/views/Menu.vue";
import MyRequests from "@/views/MyRequests.vue";
import Galery from "@/views/Galeria.vue";
import Profile from "@/views/Profile.vue";
import novoPedido from "@/views/novoPedido.vue";
import UserBackOffice from "@/views/BackOffice/User.vue"
import RequestsBackOffice from "@/views/BackOffice/Requests.vue"
import CatalogBackOffice from "@/views/BackOffice/CatalogManager.vue"
import MenusBackOffice from "@/views/BackOffice/Menus.vue"
import ErrorPage from "@/views/ErrorPage.vue";
import ErrorPageUserInvalid from "@/views/ErrorPageLoggedUser.vue"
//import LogIn from "@/components/buttonModalLogin.vue"
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/errorPage",
    name: "errorPage",
    component: ErrorPage
  },
  {
    path: "/errorPageInvalidUser",
    name: "errorPageInvalidUser",
    component: ErrorPageUserInvalid
  },
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/Login",
    name: "login",
    component: Login
  },
  {
    path: "/Register",
    name: "register",
    component: register
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  },
  {
    path: "/novoPedido",
    name: "novo-pedido",
    component: novoPedido,
    beforeEnter: (to, from, next) => {
      if(store.state.loggedUser.id==-1){
        next("/logIn")
      }else{
        next();
      }
    }
  },
  {
   path: "/userbackoffices",
   name: "user-backoffice",
   component: UserBackOffice,
   beforeEnter: (to, from, next) => {
     if(store.state.loggedUser.id== 0){
       next()
     }else{
       next("/");
     }
   }
  },
  {
    path: "/requestbackoffices",
    name: "request-backoffice",
    component: RequestsBackOffice,
    beforeEnter: (to, from, next) => {
      if(store.state.loggedUser.id== 0){
        next()
      }else{
        next("/errorPageInvalidUser");
      }
    }
   },
   {
    path: "/catalogbackoffices",
    name: "catalog-backoffice",
    component: CatalogBackOffice,
    beforeEnter: (to, from, next) => {
      if(store.state.loggedUser.id== 0){
        next()
      }else{
        next("/errorPageInvalidUser");
      }
    }
   },
   {
    path: "/menusbackoffices",
    name: "menus-backoffice",
    component: MenusBackOffice,
    beforeEnter: (to, from, next) => {
      if(store.state.loggedUser.id== 0){
        next()
      }else{
        next("/errorPageInvalidUser");
      }
    }
   },
   {
    path: "/services",
    name: "services",
    component: services
   },
   {
    path: "/myrequests",
    name: "myrequests",
    component: MyRequests,
    beforeEnter: (to, from, next) => {
      if(store.state.loggedUser.id!= -1){
        next()
      }else{
        next("/errorPageInvalidUser");
      }
    }
   },
   {
    path: "/galery",
    name: "galery",
    component: Galery
   },
   {
    path: "/profile",
    name: "profile",
    component: Profile,
    beforeEnter: (to, from, next) => {
      if(store.state.loggedUser.id!= -1){
        next()
      }else{
        next("/errorPageInvalidUser");
      }
    }
   },
   {
    path: "/menu/:serviceId",
    name: "menu",
    component: Menu,
   /* children: [
      { path: '', component: UserHome },
    ]*/
   },
   {
    path: '*',
    name:'404', 
    component: ErrorPage
}
];

const router = new VueRouter({
  routes
});

export default router;
