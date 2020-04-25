<template>
<div>
    <Header></Header>
 <b-container  id="container" >
     <b-alert :show="toshow" dismissible  variant="warning">{{ message }}</b-alert>
        <b-col>
            <b-row cols="12">
                <b-col v-for="product in products" :key="product.name" cols="4">
                <b-card  
                    id="product"
                    v-bind:title="product.name"
                    v-bind:img-src="product.image"
                    img-alt="Image"
                    img-top
                    img-height="200"
                    img-width="130"
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2"
                >
                    <b-card-text>
                        {{product.description}}
                    </b-card-text>
                    <b-card-text>Price - ${{ product.price }}</b-card-text>

                    <b-button v-on:click="saveTocart(product._id)" variant="primary">Add to Cart</b-button>
                </b-card>
                </b-col>
            </b-row>
        </b-col>
  </b-container>
  <Footer></Footer>
</div>
 
</template>

<script> 

import Header from './Header.vue'
import Footer from "./Footer.vue"
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';





export default {
  name: 'Home',
  components:{
      Header,Footer
  },
  data (){
      
      return {
          products : null,
          id:"",
          name:"",
          sessionId:"",
          userId:"",
          quantity:1,
          isRegistered:false,
          message:"",
          toshow:false
          
      }
  },
  mounted(){
      
      axios.get(`http://localhost:8000/api/fetchAll`)
      .then(response =>{
          
          const data = response.data;
          this.products = data
          
          
      })
      .catch((error)=>{
          console.log(error);
          
      });
      
  },
  methods:{
      saveTocart:function addtocart(id){
          this.id = id;
          axios.post("http://localhost:8000/api/fetchparticular", {
              productid:id
          })
          .then(() =>{


              if(localStorage.getItem("jwt") == null){

                if(localStorage.getItem("sessionId") == null){

                  this.sessionId = uuidv4();
                  localStorage.setItem("sessionId", this.sessionId);

                }else{
                    this.sessionId = localStorage.getItem("sessionId");
                    this.isRegistered = false;
                }
                          

              }else{
                  this.userId = localStorage.getItem("userID");
                  this.isRegistered = true
              }


            axios.post("http://localhost:8000/api/addtocart", {
                userId:this.userId,
                sessionId:this.sessionId,
                productid:this.id,
                quantity:this.quantity,
                registeredUser:this.isRegistered
            }).then(response =>{
                
                
                if(response.data.message){
                    this.message = response.data.message;
                    this.toshow = true;
                }else if(response.data.productalreadyexists){
                    this.message = response.data.productalreadyexists;
                    this.toshow = true;
                }

            });



          });
          
      }
  }
}
</script>

<style>

</style>
