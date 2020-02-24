<template>
  <div>
    <NavbarSemLog />
    <br />
    <v-tabs v-model="tabs" centered background-color="transparent" color="#F24B44">
      <v-tab v-for="menu in menus" v-bind:key="menu.namee">{{menu.name}}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tabs"  >
      <v-tab-item fluid v-for="menu in menus" v-bind:key="menu.name" background-color="transparent" >
        <v-container fill-height>
          <v-layout align-center>
            <v-flex>
              <h3 class="display-3">{{menu.name}}</h3>
             <v-divider class="my-3"></v-divider>
              <v-row>
                <v-col cols="3">
                   <br>
                   <v-icon>mdi-silverware-variant</v-icon>
                  Comida:
                  <ul v-for="items in menu.food" :key="items">
                    <li>{{items}}</li>     
                  </ul>
                </v-col>
                <v-col cols="3">
                   <br>
                   <v-icon>mdi-glass-tulip</v-icon>
                  Bebida:
                   <ul v-for="items in menu.drink" :key="items">
                    <li>{{items}}</li>     
                  </ul>
                </v-col>
                <v-col cols="6">
                  <v-img
                    class="imgStyle"
                    max-height="800"
                    max-width="350"
                    :src="menu.imgLink"
                    aspect-ratio="1.7"
                  ></v-img>
                </v-col>
              </v-row>
            </v-flex>
          </v-layout>
        </v-container>

        <div background-color="transparent">
          <!-- <div> v-if="getService($route.params.serviceId).id == menu.idServiço"> -->
          <h1 class="center"></h1>
        </div>

        <!--  <h1 class="center">Menu Details: {{ getService($route.params.serviceId).id }}</h1> -->
      </v-tab-item>
    </v-tabs-items>

    <br />
    <br />

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

.imgStyle {
  margin-top: 15px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
//commite test
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
      menus: [], //this.$store.state.menus,
      serviceId: "",
      tabs: null
    };
  },
  created() {
    this.menus = this.$store.getters.getMenus.filter(
      menu => menu.idServico === this.$route.params.serviceId
    );
    //this.currentItem = this.menus[0].name;
    //getService($route.params.serviceId)
    //this.serviceId=this.$route.params.serviceId,
    console.log(this.menus);
  },

  methods: {
    getService(id) {
      console.log(id);
      return this.menus.filter(menu => menu.idServico === id);
    }
  }
};
</script>
