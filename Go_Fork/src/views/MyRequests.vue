<template>
  <div class="about">
    <NavbarSemLog />
    <div class="Div">
      <h2>
        <span>Meus Pedidos</span>
      </h2>
      <p class="center">Nesta página poderá verificar o estado dos seus pedidos efetuados.</p>
    </div>
    <br />
    <table>
      <tr>
        <th>Nome do Serviço Pedido</th>
        <th>Nome do Menu Pedido</th>
        <th>Montante a Pagar</th>
        <th>Estado</th>
        <th>Ações</th>
      </tr>
      <tr v-for="userRequest in userRequests" :key="userRequest._id">
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
            @click="payment(userRequest._id)"
            small
            color="primary"
          >Pagar</v-btn>
          <v-row justify="center">
            <h5
              v-if="userRequest.state == 5"
              small
              color="error"
            >Obrigado por partilhar a sua opinião</h5>
             <v-dialog v-model="dialog" persistent max-width="600px"> 
               <template v-slot:activator="{ on }" >
                  <v-btn v-if="userRequest.state == 4" @click="getEventClickedReviewID(userRequest._id)" v-on= "on"  small color="success">Partilhe a sua Experiência</v-btn>
                
              </template>
              <!-- <v-btn v-if="userRequest.state == 4" small color="success">Partilhe a sua Experiência</v-btn> -->

               <v-card>
                <v-card-title>
                  <span class="headline">Review</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <div class="text-left">
                          <h1>Deixe o seu rating e o seu comentário.</h1>
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
                    @click="dialog = false, reviewOrder(eventClickedReviewID)"
                  >Submeter Avaliação</v-btn>
                </v-card-actions>
              </v-card> -->
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
  background-color: #f24b44;
  color: white;
}

.filterDiv {
  display: flex;
  align-items: center;
  justify-content: center;
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
  background: #fafafa;
  padding: 0 10px;
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
      //userRequests: this.$store.state.requests,
      dialog: false,
      rating: 0,
      comment: "",
      users: null,
      loggedUser: null,
      Loguser: localStorage.getItem("userLoggedIn"),
      requests: [],
      userRequests: [],
      url: "http://localhost:3000/reviews",
      eventClickedReviewID: ""
    };
  },

  created() {
    /* this.userRequests = this.$store.getters.getUserRequests.filter(
      request => request.userId === this.$store.getters.getLoggedUser.id
    );
    this.users=this.$store.getters.getUsers;
    this.loggedUser=this.$store.getters.getLoggedUser; */

    axios
      .get("http://localhost:3000/users/")
      .then(res => {
        this.users = res.data;
        this.getLoggedUser();
        //console.log(this.users);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("http://localhost:3000/requests/")
      .then(res => {
        this.requests = res.data;
        this.getUserRequests();
        //console.log(this.requests);
      })
      .catch(error => {
        console.log(error);
      });
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
            if (this.loggedUser.rewards.acheivements[1].available == true) {
              this.loggedUser.rewards.acheivements[1].progress = 100;
              this.loggedUser.points =
                this.loggedUser.points +
                this.loggedUser.rewards.acheivements[1].points;
              this.loggedUser.rewards.acheivements[1].available = false;
            }

            if (
              this.loggedUser.rewards.acheivements[3].available == true &&
              this.loggedUser.rewards.acheivements[3].progress != 100
            ) {
              this.loggedUser.rewards.acheivements[3].progress += 10;
            } else if (
              this.loggedUser.rewards.acheivements[3].available == true &&
              this.loggedUser.rewards.acheivements[3].progress == 100
            ) {
              this.loggedUser.points =
                this.loggedUser.points +
                this.loggedUser.rewards.acheivements[2].points;
              this.loggedUser.rewards.acheivements[2].available = false;
              //console.log(this.loggedUser);
            }

            swalButtons.fire(
              "Pagamamento realizado com sucesso",
              "",
              "success"
            );
            for (let i = 0; i < this.userRequests.length; i++) {
              if (this.userRequests[i]._id == id) {
                let route =
                  "http://localhost:3000/requests/" + this.requests[i]._id;
                console.log("this.budget");
                axios
                  .put(route, {
                    state: 3
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

    async reviewOrder(id) {
      /* this.$store.commit("ADDREVIEW", {
        id: this.$store.getters.getReviewLastId,
        userId: this.$store.getters.getLoggedUser.id,
        userName: this.$store.getters.getLoggedUser.username,
        foto: this.$store.getters.getLoggedUser.foto,
        rating: this.rating,
        comment: this.comment
      }); */

      const response = await axios.post(this.url + "/", {
        userId: this.loggedUser._id,
        userName: this.loggedUser.username,
        foto: this.loggedUser.foto,
        rating: this.rating,
        comment: this.comment
      });
      //.then(window.location.reload());
      if (response.data.error) {
        console.log("deu erro");
        console.log(response.data.error);
        Swal({
          type: "error",
          title: "Ocorreu um erro, tente mais tarde"
        });
      }
      console.log(id);
     
       for (let i = 0; i < this.userRequests.length; i++) {
              if (this.userRequests[i]._id == id) {
                let route ="http://localhost:3000/requests/" + this.userRequests[i]._id;
                axios
                  .put(route, {
                    state: 5
                  })
                  .then(res => {
                    console.log(res);
                  })
                  .catch(error => {
                    console.log(error);
                  });
              }
            } 

      if (this.loggedUser.rewards.acheivements[2].available == true) {
        this.loggedUser.rewards.acheivements[2].progress = 100;
        this.loggedUser.points =
          this.loggedUser.points +
          this.loggedUser.rewards.acheivements[2].points;
        this.loggedUser.rewards.acheivements[2].available = false;
        console.log(this.loggedUser);

        for (let i = 0; i < this.users; i++) {
          if (this.loggedUser.id == this.users[i].id) {
            this.users[i] = this.loggedUser;
          }
        }
      }
      if (
        this.loggedUser.rewards.acheivements[4].available == true &&
        this.loggedUser.rewards.acheivements[4].progress != 100
      ) {
        this.loggedUser.rewards.acheivements[4].progress += 10;
      } else if (
        this.loggedUser.rewards.acheivements[4].available == true &&
        this.loggedUser.rewards.acheivements[4].progress == 100
      ) {
        this.loggedUser.points =
          this.loggedUser.points +
          this.loggedUser.rewards.acheivements[4].points;
        this.loggedUser.rewards.acheivements[4].available = false;
        console.log(this.loggedUser);

        for (let i = 0; i < this.users; i++) {
          if (this.loggedUser.id == this.users[i].id) {
            this.users[i] = this.loggedUser;
          }
        }
      }
    },

    getLoggedUser() {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i]._id == this.Loguser) {
          this.loggedUser = this.users[i];
          console.log(this.loggedUser);
          console.log("this.loggedUser");
        }
      }
    },

    getUserRequests() {
      for (let i = 0; i < this.requests.length; i++) {
        if (this.requests[i].userId == this.Loguser) {
          this.userRequests.push(this.requests[i]);
        }
      }
      console.log(this.userRequests);
    },

    getEventClickedReviewID(id){
      this.eventClickedReviewID = id
    }
  }
};
</script>
