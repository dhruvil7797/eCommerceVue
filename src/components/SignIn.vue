<template>
<div>
    <Header></Header>
    <b-container>
        <b-alert :show="this.toshow" dismissible  variant="warning">{{ errorMessage }}</b-alert>
        <b-form>
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
                    id="pasword"
                    type="password"
                    v-model="form.password"
                    required
                    placeholder="Enter your password"
                ></b-form-input>
                </b-form-group>
                <b-button  v-on:click="login()" variant="primary">Login</b-button>

        </b-form>
    </b-container>
    <Footer></Footer>
</div>
 
</template>

<script> 

import Header from './Header.vue';
import Footer from "./Footer.vue"
import axios from "axios";
import router from "../Routes"



export default {
  name: 'SignIn',
  components:{
      Header,Footer
  },
  data (){

      return {

          form:{
              email:"",
              password:""

          },
          toshow:false,
          errorMessage:"",
          emailExist:false
      }
  },
  methods:{

    validateUser:async function(){
          
          if(this.form.email === ""){
              this.toshow = true;
              this.errorMessage = "Please enter your email";
              return false;
          }
          else if(!await this.validateEmail()){
              this.toshow = true;
              this.errorMessage = "Please enter valid email";
              return false;
          }

          else if(this.form.password === ""){
              this.toshow = true;
              this.errorMessage = "Please enter your password";
              return false;
          }
          
          await this.isEmailExist();
          console.log(this.emailExist);
          if(!this.emailExist){
              console.log("called");
              
              return false;
          }
          if(!await this.authenticateUser()){
              return false;
          }

            this.toshow = false;
            return true;
      },

    validateEmail:function validateEmail(){

          var re = /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
          return re.test(this.form.email);
          
    },
    login : async function onlogin(){

          if(await this.validateUser()){

             await axios.post("http://localhost:8000/api/signin",{
              email:this.form.email,
              password:this.form.password
            })
            .then(response => {

                
                if(response.data.authToken){        
                    const token = response.data.authToken;
                    localStorage.setItem("jwt", token);
                    localStorage.setItem("userID", response.data.user.email);    
                    localStorage.removeItem("sessionId");        
                    router.push({name:'dashboard'});
                }

            

            });
          }
          console.log(this.toshow);

          
    },
    isEmailExist:async function isEmailExist(){
        
        await axios.post("http://localhost:8000/api/checkemail",{
            email:this.form.email,
            isRegistered:true
        })
        .then(response => {

            if(response.data.email){
                this.toshow = false;
                this.errorMessage = response.data.email;
                this.emailExist = true;
            }else if(response.data.error){
                this.toshow = true;
                this.errorMessage = response.data.error;
                this.emailExist = false;
            }else if(response.data.emaildoesnotexists){
                this.toshow = true;
                this.errorMessage = response.data.emaildoesnotexists;
                this.emailExist = false;
            }
            
        

        });

    },
    authenticateUser:  function authenticateUser(){
        
        
         axios.post("http://localhost:8000/api/signin", {
            email:this.form.email,
            password:this.form.password
        })
        .then(response => {

            if(response.data.notautheticated){
                this.toshow = true;
                this.errorMessage = response.data.notautheticated;
                console.log(this.errorMessage);
                return false;
            }
        })
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
