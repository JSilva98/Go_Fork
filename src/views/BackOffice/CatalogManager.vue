<template>
  <v-content>
    <NavbarSemLog />
    <div><router-link :to="{name:'adminMainPage'}" tag="button">
          <v-btn class="cBtn" dark small color="#0b5aa8"> <v-icon dark>mdi-arrow-left-bold-circle-outline</v-icon></v-btn>
        </router-link>
    </div>
    <div>
       <h2>
        <span>Gestão de Serviços</span>
      </h2>
       <p class="center">Nesta página poderá gerir todos serviços disponiveis na nossa aplicação.</p>
    </div>
    
    <div>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <div class="btnPos">
            <v-btn class="btnAdd" color="indigo" dark v-on="on">Adicionar Serviço</v-btn>
          </div>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Adicionar Serviço</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Nome do Serviço*" v-model="name" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Link da Imagem*" v-model="imgLink" required></v-text-field>
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
        <th>Nome</th>
        <th>Link da Imagem</th>
        <th>Actions</th>
      </tr>
      <tr v-for="service in services" :key="service.id">
        <td>{{ service.name }}</td>
       <td><v-btn small @click="openPhoto(service._id)" color="lightblue">Mostrar Link</v-btn></td>
        <td>
          <v-btn small @click="removeService(service._id)" color="error">Remover</v-btn>
        </td>
      </tr>
    </table>
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
  background-color: #F24B44;
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

Footer {
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
import axios from "axios";
export default {
  components: {
    NavbarSemLog,
    Footer
  },

  data: function() {
    return {
      dialog: false,
      name: "",
      imgLink: "",
      services: null,
      url:"https://goforkapi.herokuapp.com/services"
    };
  },

  created() {
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
      /* this.$store.commit("ADDSERVICE", {
        id: this.$store.getters.getServLastId,
        name: this.name,
        imgLink: this.imgLink
      }); */

       const response = await axios
        .post(this.url + "/", {
          name: this.name,
          imgLink: this.imgLink,
          selected: false
        })
        //.then(window.location.reload());
      if (response.data.error) {
        console.log("deu erro");
        console.log(response.data.error);
        Swal({
          type: "error",
          title: "Ocorreu um erro, tente mais tarde"
        })
      }
    },

    openPhoto(id) {
      for (let i = 0; i < this.services.length; i++) {
              if (this.services[i].id == id) {
               Swal.fire(this.services[i].imgLink)
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
          title: "Deseja mesmo remover este serviço?",
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
            swalButtons.fire("Serviço removido com sucesso", "", "success");
            for (let i = 0; i < this.services.length; i++) {
              if (this.services[i]._id === id) {
                let route = "https://goforkapi.herokuapp.com/services/" + this.services[i]._id;
                axios
                  .delete(route)
                  .then(res => {
                    console.log(res);
                  })
                  .catch(error => {
                    console.log(error);
                  });
                this.services.splice(i, 1);
              }
            }

            console.log(this.services);
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