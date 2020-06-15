<template>
  <div>
    <v-toolbar color="#0b5aa8" dark>
      <v-toolbar-title>
        <router-link :to="{name: 'home'}" tag="button">
          Go Fork
           <v-img src="../assets/logoV2.png" class="img" contain max-height="60"></v-img>
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <router-link :to="{name:'services'}" tag="button">
          <v-btn text>Serviços</v-btn>
        </router-link>
        <router-link :to="{name:'galery'}" tag="button">
          <v-btn text>Galeria</v-btn>
        </router-link>
        <router-link :to="{name:'login'}" tag="button" v-if="getLoggedUser().id==-1">
          <v-btn text>Login</v-btn>
        </router-link>
        <v-menu offset-y v-if="getLoggedUser().type==3">
          <template v-slot:activator="{ on }" @click="checkNewNotifications=false">
            <v-btn text v-on="on">
              <span v-if="checkNewNotifications == true">
                <v-icon color="primary">mdi-bell</v-icon>
              </span>
              <span v-if="checkNewNotifications == false">
                <v-icon>mdi-bell</v-icon>
              </span>
            </v-btn>
          </template>

          <v-list v-if="getLoggedUser().type==3">
            <v-list-item v-for="notification in notifications" :key="notification.id">
              <v-list-item-title>
                <v-btn text v-if="notification.state === 0">Sem Notificações</v-btn>
                <v-btn
                  @click="updateNotification(notifications.id)"
                  text
                  v-if="notification.state === 1"
                >O seu pedido do {{notification.serviceName}} encontra-se em Análise</v-btn>
                <br />

                <router-link :to="{name:'myrequests'}" tag="button">
                  <v-btn
                    @click="updateNotification(notifications.id)"
                    text
                    v-if="notification.state === 2"
                  >O seu pedido do {{notification.serviceName}} encontra-se disponivél para Pagamento</v-btn>
                </router-link>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu offset-y v-if="getLoggedUser().id!=-1">
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on">
              <v-icon>mdi-account</v-icon>
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-if="getLoggedUser().type==3">
              <v-list-item-title>
                <router-link :to="{name:'profile'}" tag="button">
                  <v-btn text>Perfil</v-btn>
                </router-link>
              </v-list-item-title>
            </v-list-item>
            <v-list-item v-if="getLoggedUser().type==3">
              <v-list-item-title>
                <router-link :to="{name:'myrequests'}" tag="button">
                  <v-btn text>Meus Pedidos</v-btn>
                </router-link>
              </v-list-item-title>
            </v-list-item>
            <v-list-item v-if="getLoggedUser().type==1">
              <v-list-item-title>
                <router-link :to="{name:'adminMainPage'}" tag="button">
                  <v-btn text>Admin Dashboard</v-btn>
                </router-link>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <router-link :to="{name:'home'}" tag="button">
                  <v-btn text v-on:click="logout()">Log Out</v-btn>
                </router-link>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<style scoped>
.img {
  margin-top: 120px;
}
</style>

<script>
export default {
  components: {
  },

  data() {
    return {
      notification: 0,
      qtNotification: 0,
      saveNotification: 0,

      notifications: null
    };
  },
  beforeCreate: function() {
    this.loggedUser = this.$store.getters.getLoggedUser;
  },
  created: function() {
    console.log(this.notification);

    this.notifications = this.$store.getters.getNotifications.filter(
      notification =>
        notification.userId === this.$store.getters.getLoggedUser.id
    );
  },

  updated: function() {
    this.loggedUser = this.$store.getters.getLoggedUser;
  },
  computed: {
    checkNewNotifications: function() {
      return this.notifications.some(
        notification =>
          notification.new == true
      );
    }
  },
  methods: {
    logout() {
      this.$store.commit("LOGOUT");
    },
    getLoggedUser() {
      return this.$store.getters.getLoggedUser;
    },

    updateNotification(id) {
      this.notifications = this.notifications.filter(
        notification => notification.id !== id
      );
      this.$store.state.notifications = this.notifications;
    },

    /*bellClick() {
      for(let i=0;i< this.notifications.length;i++)
      {
        if(this.notifications[i].new==true){
          this.notifications[i].new=false;
        }
      }
       this.checkNewNotifications()
    }*/
  }
};
</script>
