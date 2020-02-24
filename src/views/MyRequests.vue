<template>
  <div class="about">
    <NavbarSemLog />
    <div class="Div">
      <h1 style="color:darkorange">Meus Pedidos</h1>
    </div>

    <table>
      <tr>
        <th>ID do Pedido</th>
        <th>Nome do Serviço Pedido</th>
        <th>Nome do Menu Pedido</th>
        <th>Montante a Pagar</th>
        <th>Estado</th>
        <th>Ações</th>
      </tr>
      <tr v-for="userRequest in userRequests" :key="userRequest.id">
        <td>{{ userRequest.id }}</td>
        <td>{{ userRequest.serviceName }}</td>
        <td>{{ userRequest.menuName }}</td>
        <td>{{ userRequest.budget }}</td>
        <td>
          <h5 v-if="userRequest.state == 1" small color="error">Em Analise</h5>
          <h5 v-if="userRequest.state == 2" small color="error">Pagamento em Falta</h5>
          <h5 v-if="userRequest.state == 3" small color="error">Pagamento Concluído</h5>
          <h5 v-if="userRequest.state == 4" small color="error">Evento Concluído</h5>
        </td>
        <td>
          <!-- <v-btn v-if="userRequest.state == 1" small color="error">Em Analise</v-btn> -->
          <v-btn
            v-if="userRequest.state == 2"
            @click="payment(userRequest.id)"
            small
            color="primary"
          >Pagar</v-btn>
          <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn
                  v-if="userRequest.state == 4"
                  small
                  color="success"
                  v-on="on"
                >Partilhe a sua Experiência</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Review</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <div class="text-left">
                          <h2>Deixe o seu rating e o seu comentário.</h2>
                          <h5>Poderá encontrar todos os rating e comentarios na página de Galeria</h5>
                        </div>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <div class="text-left">
                          <h5>Pontuação:</h5>
                          <v-rating v-model="rating"></v-rating>
                        </div>
                      </v-col>
                      <v-col cols="12">
                        <h5>Comentario:</h5>
                        <v-textarea
                          solo
                          v-model="comment"
                          name="input-7-4"
                          label="Escreva aqui o seu comentário"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*todos os comentario e ratings que submeter não poderão ser editados futuramente.</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog = false">Fechar</v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog = false, reviewOrder(userRequest.id)"
                  >Submeter Avaliação</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </td>
      </tr>
    </table>

    <Footer></Footer>
  </div>
</template>


<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  text-align: center;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

th {
  background-color: darkorange;
  color: white;
}

.filterDiv {
  display: flex;
  align-items: center;
  justify-content: center;
}

.Div {
  color: white;
  text-align: center;
}

.padding {
  padding-left: 5%;
  padding-right: 5%;
}

.margin {
  margin-top: 20px;
}

.marginBtn {
  margin-left: 20px;
}

footer {
  position: fixed;
  height: 150px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin-bottom: 0px;
}
</style>

<script>
import NavbarSemLog from "@/components/NavBarSemLog.vue";
import Footer from "@/components/footer.vue";
import Swal from "sweetalert2";
export default {
  components: {
    NavbarSemLog,
    Footer
  },
  data: function() {
    return {
      userRequests: this.$store.state.requests,
      dialog: false,
      rating: 0,
      comment: "",
      users:null,
      loggedUser:null

    };
  },

  created() {
    this.userRequests = this.$store.getters.getUserRequests.filter(
      request => request.userId === this.$store.getters.getLoggedUser.id
    );
    this.users=this.$store.getters.getUsers;
    this.loggedUser=this.$store.getters.getLoggedUser;
  },

  methods: {
    payment(id) {
      const swalButtons = Swal.mixin({
        customClass: {
          confirmButton: "confirm-button-class",
          cancelButton: "cancel-button-class"
        },
        buttonsStyling: true
      });

      swalButtons
        .fire({
          title: "Deseja mesmo proceder com o pagamento?",
          text: "Verifique se concorda com o montante mostrado",
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
            if (this.loggedUser.rewards.achievements[1].available == true) {
              this.loggedUser.rewards.achievements[1].progress = 100;
              this.loggedUser.points =
                this.loggedUser.points +
                this.loggedUser.rewards.achievements[1].points;
              this.loggedUser.rewards.achievements[1].available = false;
              console.log(this.loggedUser);

              this.$store.state.loggedUser = this.loggedUser;

              for (let i = 0; i < this.users; i++) {
                if (this.loggedUser.id == this.users[i].id) {
                  this.users[i] = this.loggedUser;
                }
              }
              this.$store.state.users = this.users;
              console.log(this.users);
            }

            if (this.loggedUser.rewards.achievements[3].available == true && this.loggedUser.rewards.achievements[3].progress != 100){
              this.loggedUser.rewards.achievements[3].progress += 10;
            }
            
            else if (this.loggedUser.rewards.achievements[3].available == true && this.loggedUser.rewards.achievements[3].progress == 100) {
              
              this.loggedUser.points =
                this.loggedUser.points +
                this.loggedUser.rewards.achievements[2].points;
              this.loggedUser.rewards.achievements[2].available = false;
              console.log(this.loggedUser);

              this.$store.state.loggedUser = this.loggedUser;

              for (let i = 0; i < this.users; i++) {
                if (this.loggedUser.id == this.users[i].id) {
                  this.users[i] = this.loggedUser;
                }
              }
              this.$store.state.users = this.users;
              console.log(this.users);
            }
            
            swalButtons.fire(
              "Pagamamento realizado com sucesso",
              "",
              "success"
            );
            for (let i = 0; i < this.userRequests.length; i++) {
              if (this.userRequests[i].id === id) {
                this.userRequests[i].state = 3;
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

    reviewOrder(id) {
      this.$store.commit("ADDREVIEW", {
        id: this.$store.getters.getReviewLastId,
        userId: this.$store.getters.getLoggedUser.id,
        userName: this.$store.getters.getLoggedUser.username,
        foto: this.$store.getters.getLoggedUser.foto,
        rating: this.rating,
        comment: this.comment
      });
      if (this.loggedUser.rewards.achievements[2].available == true) {
              this.loggedUser.rewards.achievements[2].progress = 100;
              this.loggedUser.points =
                this.loggedUser.points +
                this.loggedUser.rewards.achievements[2].points;
              this.loggedUser.rewards.achievements[2].available = false;
              console.log(this.loggedUser);

              this.$store.state.loggedUser = this.loggedUser;

              for (let i = 0; i < this.users; i++) {
                if (this.loggedUser.id == this.users[i].id) {
                  this.users[i] = this.loggedUser;
                }
              }
              this.$store.state.users = this.users;
              console.log(this.users);
            }
            if (this.loggedUser.rewards.achievements[4].available == true && this.loggedUser.rewards.achievements[4].progress != 100){
              this.loggedUser.rewards.achievements[4].progress += 10;
            }
            
            else if (this.loggedUser.rewards.achievements[4].available == true && this.loggedUser.rewards.achievements[4].progress == 100) {
              
              this.loggedUser.points =
                this.loggedUser.points +
                this.loggedUser.rewards.achievements[4].points;
              this.loggedUser.rewards.achievements[4].available = false;
              console.log(this.loggedUser);

              this.$store.state.loggedUser = this.loggedUser;

              for (let i = 0; i < this.users; i++) {
                if (this.loggedUser.id == this.users[i].id) {
                  this.users[i] = this.loggedUser;
                }
              }
              this.$store.state.users = this.users;
              console.log(this.users);
            }
      this.userRequests = this.userRequests.filter(
        request => request.id !== id
      );
      this.$store.state.requests = this.userRequests;
    }
  }
};
</script>
