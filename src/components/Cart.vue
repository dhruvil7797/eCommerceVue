<template>
<div>
    <Header></Header>
<b-container  id="container" >
    <b-alert :show="toshow" dismissible  variant="warning">{{ errorMessage }}</b-alert>
        <b-col>
            <b-row cols="12">
                <b-col v-for="product in this.products" :key="product.name" cols="4">

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
                    <b-card-text>Total Price - ${{ product.price  * product.quantity }}</b-card-text>
                    <b-card-text>
                        <label>Quantity = </label>
                        <b-button id="minus" variant="info"  @click="product.quantity-- , updateQuantity(product.quantity, product.cartid)" v-if="product.quantity >= 1">-</b-button>
                        <label>{{ product.quantity }}</label>
                        
                        <b-button id="plus" variant="info" @click="product.quantity++ , updateQuantity(product.quantity, product.cartid)">+</b-button>                    
                    </b-card-text>

                    
                </b-card>
                </b-col>
            </b-row>
        </b-col>
        <b-button v-b-modal.order id="placeorder" v-if="showplaceorder" v-on:click="placeOrder()" variant="info" >Place order</b-button>   
        <b-modal
            id="order"
            ref="modal"
            v-if="showmodal"
            title="Customer Information"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
        >
        <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group
            :state="firstnamestate"
            label="First Name"
            label-for="firstname"
            invalid-feedback="First Name is required"
            >
            <b-form-input
                id="firstname"
                name="firstname"
                v-model="firstname"
                :state="firstnamestate"
                required
          ></b-form-input>
        </b-form-group>
        <b-form-group
            :state="lastnamestate"
            label="Last Name"
            label-for="lastname"
            invalid-feedback="Last Name is required"
            >
            <b-form-input
                class="lastname"
                v-model="lastname"
                :state="lastnamestate"
                required
          ></b-form-input>
        </b-form-group>
        <b-form-group
            :state="emailstate"
            label="Email"
            label-for="email"
            invalid-feedback="Valid Email is required"
            >
            <b-form-input
                id="email"
                type="email"
                v-model="email"
                :state="emailstate"
                required
                
          ></b-form-input>
        </b-form-group>
        <b-form-group
            :state="addressState"
            label="Address"
            label-for="address"
            invalid-feedback="Address is required"
            >
            <b-form-input
                id="address"
                v-model="address"
                :state="addressState"
                required
                
          ></b-form-input>
        </b-form-group>
        <b-form-group
            :state="pincodeState"
            label="Pincode"
            label-for="Pincode"
            invalid-feedback="Pincode is required"
            >
            <b-form-input
                id="pincode"
                v-model="pincode"
                :state="pincodeState"
                required
                
          ></b-form-input>
        </b-form-group>
        <b-form-group
            :state="cityState"
            label="City"
            label-for="City"
            invalid-feedback="City is required"
            >
            <b-form-input
                id="city"
                v-model="city"
                :state="cityState"
                required
                
          ></b-form-input>
        </b-form-group>
        <b-form-group
            :state="provinceState"
            label="Province"
            label-for="province"
            invalid-feedback="Province is required"
            >
            <b-form-input
                id="province"
                v-model="province"
                :state="provinceState"
                required
                
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>                
  </b-container>
    <Footer></Footer>
</div>
 
</template>

<script> 

import Header from './Header.vue';
import Footer from "./Footer.vue";
import axios from "axios";


export default {
  name: 'Cart',
  components:{
      Header,Footer
  },
  data (){
      return {
          firstname:"",
          firstnamestate:null,
          lastname:"",
          lastnamestate:null,
          email:"",
          emailstate : null,
          address:"",
          addressState : null,
          pincode:"",
          pincodeState : null,
          city:"",
          cityState:null,
          province:"",
          provinceState : null,
          valid : null,
          carts:"",
          errorMessage:"",
          toshow:false,
          productid:"",
          quantity:0,
          products:[],
          showplaceorder:true,
          showmodal : false,
          productquantity:0
          

        

      }
  },
  mounted(){
      this.fetchcart();
  },
  methods:{
      updateQuantity:function updateQuantity(quantity,cartid){
          this.productquantity = quantity;
         // console.log(this.productquantity);
          
          if(event.target.id == "minus"){

              if(quantity == 0){
                 axios.post("http://localhost:8000/api/updatecart",{
                     cartid:cartid,
                     quantity:quantity
                 }).then(response =>{

                     if(response.data.message){
                         this.toshow = true;
                         this.errorMessage = response.data.message;
                         this.$nextTick(function(){
                             this.fetchcart();
                         })
                     }
                     
                 })
              }

          }else if(event.target.id == "plus"){

              axios.post("http://localhost:8000/api/updatecart",{
                     cartid:cartid,
                     quantity:quantity
                 }).then(response =>{

                     if(response.data.message){
                         this.toshow = true;
                         this.errorMessage = response.data.message;
                         
                     }
                     
                 })
          }
      },
      fetchcart:function(){
          this.products = []
          this.showplaceorder = false;
          axios.post("http://localhost:8000/api/fetchcart", {

          sessionId:localStorage.getItem("sessionId"),
          userId:localStorage.getItem("userID")

        }).then(response => {

          this.carts = response.data;
            console.log(this.carts);
          if(this.carts.length == 0){
              this.toshow = true;
              this.showplaceorder = false;
              this.errorMessage = "Cart is Empty";
              
          }else{
            
          this.carts.forEach(product => {
              
              const productquantity = product.quantity;
              const cartid = product._id;
              console.log(cartid);
              
            
             
              axios.post("http://localhost:8000/api/fetchparticular",{
                  productid:product.productid

              }).then(response =>{

                  this.data = response.data;
                  this.data.quantity = productquantity;
                  this.data.cartid = cartid;
                  
                  this.products.push(this.data);
                  this.showplaceorder = true;
                  
              })              
          });
          }
          
          
                })
      },
      placeOrder:function(){
          if(localStorage.getItem('jwt') == null){
              if(localStorage.getItem('sessionId') != null){
                  this.showmodal = true;
                 // console.log(id, totalprice, quantity);
              }
          }
      },
      checkFormValidity : function() {

        this.firstname === "" ? this.firstnamestate = false : this.firstnamestate = true;  
        this.lastname === "" ? this.lastnamestate = false : this.lastnamestate = true;
        this.validateEmail() === false ? this.emailstate = false : this.emailstate = true;
        this.address === "" ? this.addressState = false : this.addressState = true;
        this.pincode === "" ? this.pincodeState = false : this.pincodeState = true;
        this.city === "" ? this.cityState = false : this.cityState = true;
        this.province === "" ? this.provinceState = false : this.provinceState = true;
        return this.provinceState;
        
      },
      resetModal : function() {
        this.name = ''
        this.nameState = null
      },
      handleOk : function(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        
        this.handleSubmit()
      },
      handleSubmit:function(){

          if(!this.checkFormValidity()){
              return;
          }else{
          // this.showmodal = false;
          // this.addUser();
          console.log(this.productquantity);
          
          }
         
          
      },
      validateEmail:function(){

          if(this.email === ""){
              this.emailstate = false;
              return false;

          }else{
             var re = /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
             return re.test(this.email);
          }
      },

      addUser:function(){
          axios.post("http://localhost:8000/api/adduser",{
              firstname:this.firstname,
              lastname:this.lastname,
              email:this.email,
              address:this.address,
              pincode:this.pincode,
              city:this.city,
              province:this.province
          }).then(response => {

              if(response.data.email){
                  this.addOrder(response.data.email);
              }

              
          });
      },
      addOrder:function(email){

          var registeredUser = false;
          if(localStorage.getItem('jwt') !== null){
              registeredUser = true;
          }

          axios.post("http://localhost:8000/api//addorder",{
              userId:email,
              sessionId:localStorage.getItem("sessionId"),
              IsRegistered:registeredUser,
              paymentMethod:"Card",
              productquantity:this.productquantity
            
          }).then(response =>{
              console.log(response);
          });
          
      }
      
  }

}
</script>

<style>
#product{
    margin-top: 30px;
}

#placeorder{
    width: 100%;
    margin-bottom: 10px;
}
</style>
