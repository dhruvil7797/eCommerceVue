<template>
  <div id="app">
    <router-view></router-view>   
  </div>
</template>

<script>

//import axios from "axios";

export default {

  name: 'App',
  mounted(){

    window.onbeforeunload = function () {
      var hours = 1/60; // Reset when storage is more than 24hours
      var now = new Date().getTime();
      var setupTime = localStorage.getItem('sessionId');
        if (setupTime == null) {
          localStorage.setItem('sessionId', now);
        
        } else {
          if(now-setupTime > hours*60*60*1000) {
            localStorage.clear();
            localStorage.setItem('sessionId', now);
        }

  
  }
     }
    

}
}

</script>

<style>

</style>
