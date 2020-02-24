<template>
  <v-content>
    <NavbarSemLog />
    <div class="Div">
      <h1 style="color:darkorange">Gestão de Menus</h1>
    </div>
    <div>
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
                    item-value="id"
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
    </div>
    <br />
    <table>
      <tr>
        <th>ID do Menu</th>
        <th>Nome</th>
        <th>Link da Imagem</th>
        <th>Comidas</th>
        <th>Bebidas</th>
        <th>Serviço Referente</th>
        <th>Actions</th>
      </tr>
      <tr v-for="menu in menus" :key="menu.id">
        <td>{{ menu.id }}</td>
        <td>{{ menu.name }}</td>
        <td>{{ menu.imgLink }}</td>
        <td>{{ menu.food }}</td>
        <td>{{ menu.drink }}</td>
        <td>{{ menu.idServico }}</td>
        <td>
          <v-btn small @click="removeService(menu.id)" color="error">Remover</v-btn>
        </td>
      </tr>
    </table>
    <br> <br>
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
  background-color: darkorange;
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
      services: this.$store.state.services,
      dialog: false,
      idServico: 0,
      name: "",
      imgLink: "",
      food: [],
      drink: [],
      menus: this.$store.state.menus
    };
  },
  methods: {
    addItem() {
      this.$store.commit("ADDMENU", {
        id: this.$store.getters.getMenuLastId,
        idServico: this.idServico,
        name: this.name,
        imgLink: this.imgLink,
        food: this.food.split(','),
        drink: this.drink.split(','),
      });
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
              if (this.menus[i].id == id) {
                this.menus.splice(i, 1);
              }
            }
            this.$store.state.menus = this.menus
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