<template>
  <div class="about">
    <NavbarSemLog />
    <div class="Div">
      <h2>
        <span>Admin Dashboard</span>
      </h2>
      <p class="center">Nesta página poderá gerir todos os componentes existentes na aplicação.</p>
    </div>
    <br />
    <v-row>
      <v-col cols="3">
        <router-link :to="{name:'user-backoffice'}" tag="button">
          <v-btn class="cBtn" dark large color="#F24B44"> <v-icon dark>mdi-account-box-outline</v-icon>Gestão de Utilizadores</v-btn>
        </router-link> 
        <!-- <v-hover v-slot:default="{ hover }">
                <v-card color="grey lighten-4" height="100 px" outlined flat>
                  
                  <v-img max-height="100" max-width="100" src="@/assets/userManagment.png">
                  <router-link
                    :to="{name:'user-backoffice'}"
                    tag="button"
                    :class="{ btn: true, 'btn-danger': true, 'btn-sm': true }"
                  >
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-1 white--text"
                      style="height: 100%;"
                    >Gestão de Utilizadores</div>
                    </router-link>
                  </v-img>
                </v-card>
              </v-hover> -->
      </v-col>
      <v-col cols="3">
          <router-link :to="{name:'request-backoffice'}" tag="button">
          <v-btn class="cBtn" dark large color="#F24B44"> <v-icon dark>mdi-format-list-bulleted</v-icon>Gestão de Pedidos</v-btn>
        </router-link>
      </v-col>
      <v-col cols="3">
          <router-link :to="{name:'catalog-backoffice'}" tag="button">
          <v-btn class="cBtn" dark large color="#F24B44"> <v-icon dark>mdi-credit-card</v-icon>Gestão de Serviços</v-btn>
        </router-link>
      </v-col>
      <v-col cols="3">
          <router-link :to="{name:'menus-backoffice'}" tag="button">
          <v-btn class="cBtn" dark large color="#F24B44"> <v-icon dark>mdi-credit-card-multiple</v-icon>Gestão de Menus</v-btn>
        </router-link>
      </v-col>
    </v-row>
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

.cBtn {
  margin-left: 20px;
  margin-right: 20px;
  text-align: center;
}

.cBtn2 {
  margin-left: 80px;
  margin-right: 20px;
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
  background: #fafafa;
  padding: 0 10px;
}
</style>

<script>
import NavbarSemLog from "@/components/NavBarSemLog.vue";
import Footer from "@/components/footer.vue";
export default {
  components: {
    NavbarSemLog,
    Footer
  },
  data: function() {
    return {};
  }
};
</script>
