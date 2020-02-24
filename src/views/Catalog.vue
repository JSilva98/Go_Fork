<template>
  <div>
    <NavbarSemLog />
    <div>
      <h1 class="center">Serviços</h1>
     <br>
          <v-row justify="space-between">
            <v-col v-for="service in services" v-bind:key="service.id" md="3" class="ma-5">
              <v-hover v-slot:default="{ hover }">
                <v-card color="grey lighten-4" height="150 px" outlined flat>
                  
                  <v-img :aspect-ratio="16/9" :src="service.imgLink">
                  <router-link
                    :to="{ name: 'menu', params: { serviceId: service.id } }"
                    tag="button"
                    :class="{ btn: true, 'btn-danger': true, 'btn-sm': true }"
                  >
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-1 white--text"
                      style="height: 100%;"
                    >{{service.name}}</div>
                    </router-link>
                  </v-img>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
    </div>

    <Footer></Footer>
  </div>
</template>

<style scoped>
footer {
    position: fixed;
    height: 150px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin-bottom: 0px;
}

.center {
  margin-top: 25px;
  text-align: center;
}
</style>

<script>
import NavbarSemLog from "@/components/NavBarSemLog.vue";
import Footer from "@/components/footer.vue";

export default {
  name: "home",
  components: {
    NavbarSemLog,
    Footer
  },
  data: function() {
    return {
      services: [],
    };
  },
   created() {
    this.services = this.$store.getters.getServices;}

};
</script>
