import Router from "vue-router"
import Home from "./components/Home.vue"
import Cart from "./components/Cart.vue"
import SignUp from "./components/Signup.vue"
import SIgnIn from "./components/SignIn.vue"
import Dashboard from "./components/Dashboard.vue"
import Signout from "./components/Signout.vue";

import Vue from 'vue'

Vue.use(Router)




  const router  = new Router({
    mode:"history",
    routes:[
        {
            path:"/",
            name:"home", 
            component:Home,
            meta:{
                allAccess:true
            }
         },
        {
            path:"/cart", 
            name:"cart",
            component:Cart,
            meta:{
                allAccess:true
            }
            
         },
        {
            path:"/signup", 
            name:"signup", 
            component:SignUp,
            meta:{
                allAccess:false,
            }
         },
        {
            path:"/signin",
            name:"signin", 
            component:SIgnIn,
            meta:{
                allAccess:false,
            }
         },
        {
            path:"/user/dashboard",
            name:"dashboard", 
            component:Dashboard,
            meta:{
                allAccess : false,
            }
         },
         {
            path:"/signout",
            name:"signout", 
            component:Signout,
            meta:{
                allAccess : true,
            }
         }
    
    ]
     
  });


  router.beforeEach((to, from, next) => {

        if(to.matched.some(record => record.meta.allAccess)){
            next()
        }
        else {
            if(to.name === "dashboard"){

                

            if(localStorage.getItem("jwt") !== null){
                next()
            }
            else{
                next({
                    name:'signin'
                })
            }}



            if(to.name === "signin" || to.name === "signup"){
                if(localStorage.getItem("jwt") !== null){
                    next({
                        name:'dashboard'
                    })
                }
                else{
                    next()
                }
            }  
            
        }
  });

  export default router;