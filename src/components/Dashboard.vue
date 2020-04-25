<template>
<div>
    <Header></Header>
    <b-container>
        <b-alert :show="showalert" dismissible variant="warning" >{{ message }}</b-alert>
        <form>
            <b-form-group
                label="First Name"
                label-for="firstname"
            >
             <b-form-input
                type="text"
                required
                v-model="firstname"
                placeholder="Enter First Name"
        ></b-form-input>
      </b-form-group>
      <b-form-group
                label="Last Name"
                label-for="lastname"
            >
             <b-form-input
                type="text"
                required
                v-model="lastname"
                placeholder="Enter Last Name"
        ></b-form-input>
      </b-form-group>
      <b-form-group
                label="Email"
                label-for="email"
            >
             <b-form-input
                type="email"
                disabled
                required
                v-model="email"
                placeholder="Enter Email"
        ></b-form-input>
      </b-form-group>
      <b-form-group
                label="Address"
                label-for="address"
            >
             <b-form-input
                type="text"
                required
                v-model="address"
                placeholder="Enter Your Address"
        ></b-form-input>
      </b-form-group>
      <b-form-group
                label="Pincode"
                label-for="pincode"
            >
             <b-form-input
                type="text"
                required
                v-model="pincode"
                placeholder="Enter Pincode"
        ></b-form-input>
      </b-form-group>
      <b-form-group
                label="City"
                label-for="city"
            >
             <b-form-input
                type="text"
                required
                v-model="city"
                placeholder="Enter City"
        ></b-form-input>
      </b-form-group>
      <b-form-group
                label="Province"
                label-for="province"
            >
             <b-form-input
                type="text"
                required
                v-model="province"
                placeholder="Enter Province"
        ></b-form-input>
      </b-form-group>
      <b-button @click="updateUser" variant="info">Update Info</b-button>
        </form>
    </b-container>
    <Footer></Footer>
</div>
 
</template>

<script> 

import Header from './Header.vue';
import Footer from "./Footer.vue";
import axios from "axios";


export default {
  name: 'SignIn',
  components:{
      Header,Footer
  },
  data (){
      return {
          firstname:"",
          lastname:"",
          email:"",
          address:"",
          pincode:"",
          city:"",
          province:"",
          showalert : false,
          message:""
      }
  },
  mounted(){
      if(localStorage.getItem('jwt') !== null){
          
          axios.post("http://localhost:8000/api/getuser",{
              email:localStorage.getItem("userID"),
              isRegistered:true
          }).then(response =>{

              const data = response.data;
              this.firstname = data.firstname;
              this.lastname = data.lastname;
              this.email = data.email;
              this.address = data.address;
              this.pincode = data.pincode;
              this.city = data.city;
              this.province = data.province;
              
          })
      }
  },
  methods:{
      updateUser:function(){
          
          if(this.validateInfo()){
              axios.post("http://localhost:8000/api/updateuser", {
                  firstname:this.firstname,
                  lastname:this.lastname,
                  email:this.email,
                  address:this.address,
                  pincode:this.pincode,
                  city:this.city,
                  province:this.province
              }).then(response =>{
                  this.showalert = true;
                  this.message = response.data.message;

              })
          }

      },
      validateInfo:function(){

          if(this.firstname == ""){
              this.showalert = true;
              this.message = "Please enter first name";
              return false;

          } 
          if(this.lastname == ""){
              this.showalert = true;
              this.message = "Please enter last name";
              return false;

          }
          if(this.address == ""){
              this.showalert = true;
              this.message = "Please enter Address";
              return false;
          }
          if(this.pincode == ""){
              this.showalert = true;
              this.message = "Please enter Pincode";
              return false;
          }
          if(this.province == ""){
              this.showalert = true;
              this.message = "Please enter Province";
              return false;
          }
          return true;

      }
  }
}
</script>

<style>
#product{
    margin-top: 30px;
}
</style>
