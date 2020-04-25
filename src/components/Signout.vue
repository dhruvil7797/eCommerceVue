<template>
<div>
    <Header></Header>
    <b-container>
       
    </b-container>
    <Footer></Footer>
</div>
 
</template>

<script> 

import Header from './Header.vue';
import Footer from "./Footer.vue"
import router from "../Routes"


export default {
  name: 'Signout',
  components:{
      Header,Footer
  },
  data (){

      return {

          
      }
  },
  
  mounted(){
      localStorage.removeItem('jwt');
      localStorage.removeItem('userID');
      router.push({name:'home'});
      
  }
}
</script>

<style>
#product{
    margin-top: 30px;
}
</style>
