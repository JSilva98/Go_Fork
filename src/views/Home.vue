<template>
  <div>
    <!--<Navbar v-if="logedUser==false"></Navbar>-->
    <NavbarSemLog />
    <hero />
    <v-row align="center" justify="center">
      <v-col align="center" justify="center">
        <v-img src="@/assets/imgcomoFunciona2.png" width="70%" center></v-img>
      </v-col>
    </v-row>
   <Footer ></Footer>
  </div>
</template>



<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
//commite test
import NavbarSemLog from "@/components/NavBarSemLog.vue";
import hero from "@/components/hero.vue";
import Footer from "@/components/footer.vue";

export default {
  name: "home",
  components: {
    NavbarSemLog,
    hero,
    Footer
  }
  /*
data() {
    return {
    logedUser:getLoggedUser(),
    };
  },
  methods:{
    getLoggedUser(){

    }
  }*/
};
</script>
