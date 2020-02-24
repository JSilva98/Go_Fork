<template>
  <div>
    <NavbarSemLog />
    <stepper/>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";

import NavbarSemLog from "@/components/NavBarSemLog.vue";
import stepper from "@/components/stepper.vue"
import Footer from "@/components/footer.vue";

export default {
  name: "home",
  components: {
    NavbarSemLog,
stepper,
    Footer
  },

  data() {
    return {
      e1: 0
    };
  } /*
  methods:{
    getLoggedUser(){

    }
  }*/
};
</script>