<template>
  <v-content>
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
        <span>Gestão de Menus</span>
      </h2>
      <p
        class="center"
      >Nesta página poderá gerir todos menus disponiveis na nossa aplicação. Lembre-se que só pode adicionar menus a serviços já existentes.</p>
    </div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <div class="btnPos">
          <v-btn class="btnAdd" color="indigo" dark v-on="on">Adicionar Menu</v-btn>
        </div>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Adicionar Menu</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Nome do Menu*" v-model="name" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Link da Imagem*" v-model="imgLink" required></v-text-field>
              </v-col>
              <v-col cols="12">
                Entre cada item que insira utilize uma virgula para os separar.
                <v-text-field label="Comida*" v-model="food" required></v-text-field>
              </v-col>
              <v-col cols="12">
                Entre cada item que insira utilize uma virgula para os separar.
                <v-text-field label="Bebida*" v-model="drink" required></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-select
                  :items="services"
                  label="Serviços de Referencia*"
                  item-text="name"
                  item-value="_id"
                  v-model="idServico"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="addItem(),  dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <br />
    <table>
      <tr>
        <th>Nome</th>
        <th>Link da Imagem</th>
        <th>Comidas</th>
        <th>Bebidas</th>
        <th>Serviço Referente</th>
        <th>Actions</th>
      </tr>
      <tr v-for="menu in menus" :key="menu.id">
        <td>{{ menu.name }}</td>
        <td>
          <v-btn small @click="openPhoto(menu._id)" color="lightblue">Mostrar Link</v-btn>
        </td>
        <td>{{ menu.food.toString() }}</td>
        <td>{{ menu.drink.toString() }}</td>
        <td>{{ menu.idServico }}</td>
        <td>
          <v-btn small @click="removeService(menu._id)" color="error">Remover</v-btn>
        </td>
      </tr>
    </table>
    <br />
    <br />
    <Footer></Footer>
  </v-content>
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

.btnPos {
  display: flex;
  align-items: center;
  justify-content: center;
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
      services: [],
      dialog: false,
      idServico: "",
      name: "",
      imgLink: "",
      food: "",
      drink: "",
      menus: null,
      url: "https://goforkapi.herokuapp.com/menus"
    };
  },

  created() {
    axios
      .get("https://goforkapi.herokuapp.com/menus/")
      .then(res => {
        this.menus = res.data;
        console.log(this.menus);
      })
      .catch(error => {
        console.log(error);
      }),

      axios
      .get("https://goforkapi.herokuapp.com/services/")
      .then(res => {
        this.services = res.data;
        console.log(this.services);
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    async addItem() {
      /* this.$store.commit("ADDMENU", {
        id: this.$store.getters.getMenuLastId,
        idServico: this.idServico,
        name: this.name,
        imgLink: this.imgLink,
        food: this.food.split(','),
        drink: this.drink.split(','),
      }); */
      console.log(this.idServico);
      const response = await axios
        .post(this.url + "/", {
          idServico: this.idServico,
          name: this.name,
          imgLink: this.imgLink,
          food: this.food,
          drink: this.drink,
          selected: false
        })
        //.then(window.location.reload());
      if (response.data.error) {
        console.log("deu erro");
        console.log(response.data.error);
        Swal({
          type: "error",
          title: "Ocorreu um erro, tente mais tarde"
        });
      }
    },

    openPhoto(id) {
      for (let i = 0; i < this.menus.length; i++) {
        if (this.menus[i]._id == id) {
          Swal.fire(this.menus[i].imgLink);
        }
      }
    },

    removeService(id) {
      const swalButtons = Swal.mixin({
        customClass: {
          confirmButton: "confirm-button-class",
          cancelButton: "cancel-button-class"
        },
        buttonsStyling: true
      });

      swalButtons
        .fire({
          title: "Deseja mesmo remover este menu?",
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
            swalButtons.fire("Menu removido com sucesso", "", "success");
            for (let i = 0; i < this.menus.length; i++) {
              if (this.menus[i]._id === id) {
                let route = "https://goforkapi.herokuapp.com/menus/" + this.menus[i]._id;
                axios
                  .delete(route)
                  .then(res => {
                    console.log(res);
                  })
                  .catch(error => {
                    console.log(error);
                  });
                this.menus.splice(i, 1);
              }
            }
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