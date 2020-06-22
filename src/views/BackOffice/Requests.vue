<template>
  <div>
    <NavbarSemLog />
    <div>
      <router-link :to="{name:'adminMainPage'}" tag="button">
        <v-btn class="cBtn" dark small color="#0b5aa8">
          <v-icon dark>mdi-arrow-left-bold-circle-outline</v-icon>
        </v-btn>
      </router-link>
    </div>
    <div>
      <h2>
        <span>Gestão de Pedidos</span>
      </h2>
      <p class="center">Nesta página poderá gerir todos pedidos efetuados pelos nossos utilizadores.</p>
    </div>

    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="request in requests" :key="request.id">
          <v-card class="ma-3 padding" outlined>
            <v-list-item-content>
              <div class="overline">{{request.id}}</div>
              <v-list-item-title class="headline mb-1">{{request.serviceName}}</v-list-item-title>
              <v-list-item-subtitle>{{request.menuName}}</v-list-item-subtitle>
              <v-list-item-subtitle>Data: {{request.date}}</v-list-item-subtitle>
              <v-list-item-subtitle>Hora: {{request.time}}</v-list-item-subtitle>
              <v-list-item-subtitle>Extras: {{request.extras}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-card-text>
              Informação do Cliente:
              <div class="subheading">Utilizador: {{request.username}}</div>
              <div class="subheading" v-if="requests.local !== '' ">Local: {{request.local}}</div>
            </v-card-text>
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="budget[request._id]" label="Orçamento"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-card-actions>
                  <v-btn
                    color="primary"
                    v-if="request.state == 1"
                    @click="sendBudget(request._id , budget[request._id]), updateNotification(request.userId)"
                    class="ma-1"
                  >
                    Enviar
                    <v-icon dark small class="pa-1">mdi-send</v-icon>
                  </v-btn>
                  <td>
                    <v-btn small @click="removeRequest(request._id)" color="error">Remover</v-btn>
                  </td>
                  <v-btn
                    color="success"
                    v-if="request.state == 3"
                    @click="endEvent(request._id)"
                  >Concluido</v-btn>
                  <v-btn color="error" v-if="request.state == 4">
                    Locked
                    <v-icon dark small class="pa-1">mdi-lock</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <Footer></Footer>
  </div>
</template>


<style scoped>
template {
  color: #ffcc66;
}

.padding {
  padding-left: 5%;
  padding-right: 5%;
}

.filterDiv {
  color: white;
  text-align: center;
}

.margin {
  margin-top: 20px;
}

.marginBtn {
  margin-left: 20px;
}

.cBtn {
  margin-top: 20px;
  margin-left: 20px;
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

.center {
  margin-top: 25px;
  text-align: center;
}
</style>


<script>
import NavbarSemLog from "@/components/NavBarSemLog.vue";
import Footer from "@/components/footer.vue";
import Swal from "sweetalert2";
import axios from "axios";
export default {
  components: {
    NavbarSemLog,
    Footer
  },
  data: function() {
    return {
      requests: null,
      notifications: this.$store.state.notifications,
      budget: []
    };
  },

  created() {
    axios
      .get("https://goforkapi.herokuapp.com/requests/")
      .then(res => {
        this.requests = res.data;
        console.log(this.requests);
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    updateNotification(id) {
      for (let i = 0; i < this.requests.length; i++) {
        if (this.requests[i].id == id) {
          this.$store.commit("UPDATENOTIFICATION", {
            id: this.$store.getters.getNotificationLastId,
            userId: this.$store.getters.getLoggedUser.id,
            userName: this.$store.getters.getLoggedUser.username,
            state: 2,
            serviceName: this.requests[i].serviceName,
            menuName: this.requests[i].menuName,
            new: true
          });
        }
      }
    },

    endEvent(id) {
      const swalButtons = Swal.mixin({
        customClass: {
          confirmButton: "confirm-button-class",
          cancelButton: "cancel-button-class"
        },
        buttonsStyling: true
      });

      swalButtons
        .fire({
          title: "Deseja dar este evento como terminado?",
          text: "Não vai ser possivel reverter esta ação",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sim",
          confirmButtonColor: "#009933",
          cancelButtonText: "Não",
          cancelButtonColor: "#990000",
          reverseButtons: true
        })
        .then(result => {
          if (result.value) {
            swalButtons.fire("Evento terminado com sucesso", "", "success");
            console.log("id");

            for (let i = 0; i < this.requests.length; i++) {
              if (this.requests[i]._id == id) {
               let route ="https://goforkapi.herokuapp.com/requests/" + this.requests[i]._id;
                console.log(this.budget)
                axios
                  .put(route, {
                    state: 4
                  })
                  .then(res => {
                    console.log(res);
                  })
                  .catch(error => {
                    console.log(error);
                  });
              }
            }
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalButtons.fire("Cancelado", "A sua ação foi cancelada", "error");
          }
        });
    },

    sendBudget(id, value) {
      const swalButtons = Swal.mixin({
        customClass: {
          confirmButton: "confirm-button-class",
          cancelButton: "cancel-button-class"
        },
        buttonsStyling: true
      });

      swalButtons
        .fire({
          title: "Deseja enviar este orçamento?",
          text: "Não vai ser possivel reverter esta ação",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sim",
          confirmButtonColor: "#009933",
          cancelButtonText: "Não",
          cancelButtonColor: "#990000",
          reverseButtons: true
        })
        .then(result => {
          if (result.value) {
            swalButtons.fire("Orçamento enviado com sucesso", "", "success");
            console.log(id);
            console.log(value)
             for (let i = 0; i < this.requests.length; i++) { 
              if (this.requests[i]._id === id) {
                let route ="https://goforkapi.herokuapp.com/requests/" + this.requests[i]._id;
                console.log(this.budget)
                axios
                  .put(route, {
                    state: 2,
                    budget: value
                  })
                  .then(res => {
                    console.log(res);
                  })
                  .catch(error => {
                    console.log(error);
                  });
              }
            } 
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalButtons.fire("Cancelado", "A sua ação foi cancelada", "error");
          }
        });
    },

    removeRequest(id) {
      const swalButtons = Swal.mixin({
        customClass: {
          confirmButton: "confirm-button-class",
          cancelButton: "cancel-button-class"
        },
        buttonsStyling: true
      });

      swalButtons
        .fire({
          title: "Deseja mesmo remover este pedido?",
          text: "Não vai ser possivel reverter esta ação",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sim",
          confirmButtonColor: "#009933",
          cancelButtonText: "Não",
          cancelButtonColor: "#990000",
          reverseButtons: true
        })
        .then(result => {
          if (result.value) {
            swalButtons.fire("Pedido removido com sucesso", "", "success");
            for (let i = 0; i < this.requests.length; i++) {
              if (this.requests[i]._id === id) {
                let route =
                  "https://goforkapi.herokuapp.com/requests/" + this.requests[i]._id;
                axios
                  .delete(route)
                  .then(res => {
                    console.log(res);
                  })
                  .catch(error => {
                    console.log(error);
                  });
                this.requests.splice(i, 1);
              }
            }

            console.log(this.requests);
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalButtons.fire("Cancelado", "A sua ação foi cancelada", "error");
          }
        });
    }
  }
};
</script>
