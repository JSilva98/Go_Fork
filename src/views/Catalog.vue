<template>
  <div>
    <NavbarSemLog />
    <div>
      <h2><span>Serviços</span></h2>
      <p class="center">Nesta página encontram-se uma variedade de serviços e menus que poderão ser usufruídos pelos nossos clientes.</p>
     <br>
          <v-row justify="space-between">
            <v-col v-for="service in services" v-bind:key="service.id" md="3" class="ma-5">
              <v-hover v-slot:default="{ hover }">
                <v-card color="grey lighten-4" height="150 px" outlined flat>
                  
                  <v-img :aspect-ratio="16/9" :src="service.imgLink">
                  <router-link
                    :to="{ name: 'menu', params: { serviceId: service._id } }"
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

h2 {
   width: 100%; 
   text-align: center; 
   border-bottom: 1px solid #000; 
   line-height: 0.1em;
   margin-top: 25px; 
} 

h2 span { 
    background:#fafafa; 
    padding:0 10px; 
}
</style>

<script>
import NavbarSemLog from "@/components/NavBarSemLog.vue";
import Footer from "@/components/footer.vue";
import axios from "axios";
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
    axios
        .get("https://goforkapi.herokuapp.com/services/")
        .then(res => {
          this.services = res.data;
        })
        .catch(error => {
          console.log(error);
        })
    }

};
</script>
