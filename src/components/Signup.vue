<template>
  <div>
      <b-container>
        <Header></Header>
      <b-container id="userform">
        <b-alert :show="toshow" dismissible  variant="warning">{{ errorMessage }}</b-alert>
            <b-form>
                <b-form-group                
                    label="First Name"
                    label-for="firstname"
                >
                <b-form-input
                    id="firstname"
                    type="text"
                    v-model="form.firstname"
                    required
                    placeholder="Enter your first name"
                ></b-form-input>
                </b-form-group>
                <b-form-group                    
                    label="Last Name"
                    label-for="lasttname"
                >
                <b-form-input
                    id="lastname"
                    type="text"
                    v-model="form.lastname"
                    required
                    placeholder="Enter your Last name"
                ></b-form-input>
                </b-form-group>
                <b-form-group                    
                    label="Email"
                    label-for="email"
                >
                <b-form-input
                    id="email"
                    type="email"
                    v-model="form.email"
                    required
                    placeholder="Enter your email"
                ></b-form-input>
                </b-form-group>
                <b-form-group                    
                    label="Password"
                    label-for="password"
                >
                <b-form-input
                    id="password"
                    type="password"
                    v-model="form.password"
                    required
                    placeholder="Enter your password"
                ></b-form-input>
                </b-form-group>
                <b-form-group                    
                    label="Confirm Password"
                    label-for="confirmpassword"
                >
                <b-form-input
                    id="confirmpassword"
                    type="password"
                    v-model="form.confirmpassword"
                    required
                    placeholder="Enter your password again"
                ></b-form-input>
                </b-form-group>
                <b-form-group                    
                    label="Address"
                    label-for="address"
                >
                <b-form-input
                    id="address"
                    type="text"
                    v-model="form.address"
                    required
                    placeholder="Enter your address"
                ></b-form-input>
                </b-form-group>
                <b-form-group                    
                    label="Pincode"
                    label-for="pincode"
                >
                <b-form-input
                    id="pincode"
                    type="text"
                    v-model="form.pincode"
                    required
                    placeholder="Enter your pincode"
                ></b-form-input>
                </b-form-group>
                <b-form-group                    
                    label="City"
                    label-for="city"
                >
                <b-form-input
                    id="city"
                    type="text"
                    v-model="form.city"
                    required
                    placeholder="Enter your city"
                ></b-form-input>
                </b-form-group>
                <b-form-group                    
                    label="Province"
                    label-for="province"
                >
                <b-form-input
                    id="province"
                    type="text"
                    
                    v-model="form.province"
                    required
                    placeholder="Enter your Province"
                ></b-form-input>
                </b-form-group>
            </b-form>
            <b-button type="submit" v-on:click="submit()" variant="primary">Submit</b-button>
            <b-button type="reset"  v-on:click="reset()" variant="danger">Reset</b-button>
      </b-container>
        <Footer></Footer>
    </b-container>
  </div>
  
</template>
<script> 

import Header from './Header.vue';
import Footer from "./Footer.vue"
import axios from "axios";
import router from '../Routes';


export default {
  name: 'SignUp',
  components:{
      Header,Footer
  },
  data (){
      return {
          form:{
              firstname:"",
              lastname:"",
              email:"",
              password:"",
              confirmpassword:"",
              address:"",
              pincode:"",
              city:"",
              province:"",
                            
          },
          toshow:false,
          errorMessage: ""  
      }
  },
  methods:{

    submit: async function onSubmit(){

        if(this.checkFormData() === true){

           await axios.post("http://localhost:8000/api/signup",{
                   firstname:this.form.firstname,
                   lastname:this.form.lastname,
                   email:this.form.email,
                   password:this.form.password,
                   confirmpassword:this.form.confirmpassword,
                   address:this.form.address,
                   pincode:this.form.pincode,
                   city:this.form.city,
                   province:this.form.city

               })
               .then(response =>{
                console.log(response);
                
                if(response.data.error){
                    console.log("IF");
                    this.toshow = true;
                    this.errorMessage = response.data.error;

                }else{
                    alert("Registered Successfully...Login with email and password");
                    router.push({name:'signin'});
                }
                
          
          
      });
      
      
        }
            
       
    },

    checkFormData:function checkFormData(){

          if(this.form.firstname === ""){
            this.toshow = true;
            this.errorMessage = "Please enter first name";
            return false;
          }

          if(this.form.firstname.length < 3){
              this.toshow = true;
              this.errorMessage = "First name should not be less than 3 characters";
              return false;
          }
          if(this.form.lastname === ""){
              this.toshow = true;
              this.errorMessage = "Please enter last name";
              return false;
          }
          
          if(this.form.lastname.length < 3){
              this.toshow = true;
              this.errorMessage = "Last name should not be less than 3 characters";
              return false;
          }
          if(!this.validateEmail()){
              this.toshow = true;
              this.errorMessage = "Please enter valid email";
              return false;
          }
          if(this.isUserExist()){
              return false;
          }
          if(this.form.password === ""){
              this.toshow = true;
              this.errorMessage = "Please enter password";
              return false;
          }
          if(this.form.confirmpassword === ""){
              this.toshow = true;
              this.errorMessage = "Please enter password again";
              return false;
          }
          if(!this.isPasswordMatched()){
              this.toshow = true;
              this.errorMessage = "Passwords do not match";
              return false;
          }
          if(this.form.address === ""){
              this.toshow = true;
              this.errorMessage = "Please enter address";
              return false;
          }
          if(this.form.pincode === ""){
              this.toshow = true;
              this.errorMessage = "Please enter pinode";
              return false;
          }
          if(this.form.city === ""){
              this.toshow = true;
              this.errorMessage = "Please enter city";
              return false;
          }
          if(this.form.province === ""){
              this.toshow = true;
              this.errorMessage = "Please enter the province";
              return false;
          }
          this.toshow = false;
          return true;
      },
       reset:function onReset(){
          
          this.form.firstname = ""
          this.form.lastname = ""
          this.form.email = ""
          this.form.password = ""
          this.form.confirmpassword = ""
          this.form.address = ""
          this.form.pincode = ""
          this.form.city = ""
          this.form.province = "" 
      },
      validateEmail:function validateEmail(){
          var re = /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
          return re.test(this.form.email);
          
      },
      isPasswordMatched:function isvalidPassword(){
          return this.form.password === this.form.confirmpassword;
      },
      isUserExist:function(){

          axios.post("http://localhost:8000/api/checkemail",{
            email:this.form.email
        })
        .then(response => {

            console.log(response);
            if(response.data.email){
                this.toshow = true;
                this.errorMessage = response.data.email + " already exists...Please sign in to continue";
                return true;

            }else if(response.data.emaildoesnotexists){
                this.toshow = false;
                return false;
            }else{
                return false; 
            }
            
        });

      }
  }
}
</script>

<style scoped>


</style>
