<template>
    <b-container id="container" >
        <b-navbar type="dark" variant="dark">
            <b-navbar-brand router-link="home" to="/">EcommerVue</b-navbar-brand>
            <b-navbar-nav >
              <b-nav-item router-link="cart" to="/cart" >Cart</b-nav-item>
              <b-nav-item v-if="isLoggedIn" router-link="dashboard" to="/user/dashboard">Dashboard</b-nav-item>
              <b-nav-item v-if="!isLoggedIn" router-link="signup" to="/signup">Sign Up</b-nav-item>
              <b-nav-item v-if="!isLoggedIn" router-link="signin" to="/signin">Sign In</b-nav-item>
              <b-nav-item v-if="isLoggedIn" router-link="signout" to="/signout">Sign Out</b-nav-item>
            </b-navbar-nav>
        </b-navbar>
    </b-container>
  
</template>

<script> 
export default {
  
  name: 'Base',
  data () {
      return {
        
        isLoggedIn : false
          
      }
  },
  mounted(){
      if(localStorage.getItem('jwt') === null){
        this.isLoggedIn = false
      }
      else{
        this.isLoggedIn = true
      }
      
      

  }

}
</script>

<style>
.router-link-exact-active{
  background:grey;
  
}

</style>
