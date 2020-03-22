<template >
<v-parallax id="parallax" dark src="@/assets/asknzD.jpg"   >

<div>
  <br>
<br>
<router-link :to="{name:'home'}" tag="button">
  <v-btn class="mb-1 ml-5" fab dark large color="purple" >
    
        <v-icon dark>mdi-home</v-icon>
      
  </v-btn>
  </router-link>
 
</div>

<v-layout align-center justify-center >


  <!-- <v-flex xs12 sm8 md4> -->
     <v-flex  md3>

       
 
     <v-card class="elevation-12" >
      <v-toolbar color="#0b5aa8" dark>
        <v-toolbar-title>Login</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-card-text>
        <v-form class="flex mb-0">
          <v-text-field
            label="Username"
            
            prepend-icon="person"
            type="text"
            v-model="username"
          ></v-text-field>

          <v-text-field
            id="password"
            label="Password"
            
            prepend-icon="lock"
            type="password"
            v-model="password"
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-col cols="auto" class="text-center pl-0">
          <v-row class="flex-column ma-0 fill-height justify-center">
            <v-col>
              <v-btn v-on:click="login()" color="primary" >Login</v-btn>
            </v-col>
            <v-col>
              
              <v-btn dark> <router-link :to="{name:'register'}" tag="button">Criar Conta</router-link></v-btn>
              
            </v-col>
          </v-row>
        </v-col>
      </v-card-actions>
    </v-card>
    
    
    <!-- <hero />
    
    <v-row align="center" justify="center">
      <v-col align="center" justify="center">
        <v-img src="@/assets/imgcomoFunciona2.png" width="70%" center></v-img>
      </v-col>
    </v-row>
 
   <Footer ></Footer> -->
   </v-flex>
  </v-layout>

    </v-parallax> 

</template>

<script>
//import buttonModalRegister from "./buttonModalRegister";
//import NavbarSemLog from "@/components/NavBarSemLog.vue";
//import hero from "@/components/hero.vue";
//import Footer from "@/components/footer.vue";
import Swal from "sweetalert2";

export default {
  components: {
    //NavbarSemLog,
    //hero,
    //Footer
    //buttonModalRegister
  },

  data() {
    return {
      dialog: false,
      username: "",
      password: "",
      
    };
  },
  mounted(){ document.getElementById('parallax').style.height = '100vh'}
  ,
  created(){},
  computed: {},
  methods: {
    login() {
      if (this.$store.getters.getLogin(this.username, this.password)) {
        this.$store.commit(
          "SET_LOGGED_USER",
          this.$store.getters.getLogin(this.username, this.password)
        );
        Swal.fire({
          title: "Login efetuado com sucesso!",
          icon: "success"
        }).then(this.$router.push({name:"home"}));
      } else {
         Swal.fire({
          title: "Dados incorretos!",
          icon: "error"
        });
      }
    }
  }
};
</script>

<style>


</style>



