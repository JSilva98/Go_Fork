<template>
  <div class="about">
    <NavbarSemLog />
    <div><router-link :to="{name:'adminMainPage'}" tag="button">
          <v-btn class="cBtn" dark small color="#0b5aa8"> <v-icon dark>mdi-arrow-left-bold-circle-outline</v-icon></v-btn>
        </router-link></div>
    <div>
       <h2>
        <span>Gestão de Utilizadores</span>
      </h2>
       <p class="center">Nesta página poderá gerir todos utilizadores existentes na plataforma, tal como tornar um utilizador em administrador e vice-versa.</p>
    </div>
    <div class="filterDiv">
        <div class="form-inline padding">
          <v-row>
            <v-col cols="8">
              <v-text-field v-model="nameFilter" label="Filtrar por Username"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-btn class="margin" @click="filterUsersByName" small color="indigo" dark>Filtrar</v-btn>
            </v-col>
          </v-row>
        </div>
    </div>
    <table>
      <tr>
       <!--  <th>ID do Utilizador</th> -->
        <th>Username</th>
        <th>Email</th>
        <th>Password</th>
        <th>Tipo de Utilizador</th>
        <th>Ações</th>
      </tr>
      <tr v-for="user in filteredUsers" :key="user.id">
        <!-- <td>{{ user.id }}</td> -->
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.password }}</td>
        <td>{{ user.type }}</td>
        <td>
          <v-btn small @click="removeUser(user.id)" color="error">Remover</v-btn>
          <v-btn
            small
            class="marginBtn"
            v-if="user.type == '1'"
            @click="removeAdmin(user.id)"
            color="success"
          >Retirar Admin</v-btn>
          <v-btn
            small
            class="marginBtn"
            v-if="user.type == '3'"
            @click="addAdmin(user.id)"
            color="success"
          >Tornar Admin</v-btn>
        </td>
      </tr>
    </table>
    <Footer ></Footer>
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
  background-color: #F24B44;
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

.center {
  margin-top: 25px;
  text-align: center;
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

Footer{
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
      filteredUsers: null,
      users: null,
      nameFilter: "",
      
      username: ""
    };
  },

  created() {
    axios
      .get("http://localhost:3000/users")
      .then(res => {
        this.users = res.data;
        this.filteredUsers = res.data;
        console.log("users:");
        console.log(this.users);
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    removeUser(id) {
      const swalButtons = Swal.mixin({
        customClass: {
          confirmButton: "confirm-button-class",
          cancelButton: "cancel-button-class"
        },
        buttonsStyling: true
      });

      swalButtons
        .fire({
          title: "Deseja mesmo remover este utilizador?",
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
            swalButtons.fire("Utilizador removido com sucesso", "", "success");
            this.filteredUsers = this.users.filter(user => user.id != id);
             this.$store.state.users = this.filteredUsers
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalButtons.fire("Cancelado", "A sua ação foi cancelada", "error");
          }
        });
    },

    removeAdmin(id) {
      const swalButtons = Swal.mixin({
        customClass: {
          confirmButton: "confirm-button-class",
          cancelButton: "cancel-button-class"
        },
        buttonsStyling: true
      });

      swalButtons
        .fire({
          title: "Deseja mesmo remover este utilizador da posição de admin?",
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
            swalButtons.fire("Utilizador removido com sucesso", "", "success");
            for (let i = 0; i < this.users.length; i++) {
              if (this.users[i].id === id) {
                this.users[i].type = 3;
                console.log(this.users[i].type);
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
    addAdmin(id) {
      const swalButtons = Swal.mixin({
        customClass: {
          confirmButton: "confirm-button-class",
          cancelButton: "cancel-button-class"
        },
        buttonsStyling: true
      });

      swalButtons
        .fire({
          title: "Deseja mesmo tornar este utilizador em admin?",
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
            swalButtons.fire("Utilizador removido com sucesso", "", "success");
            for (let i = 0; i < this.users.length; i++) {
              if (this.users[i].id === id) {
                this.users[i].type = 1;
                console.log(this.users[i].type);
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
    filterUsersByName() {
       this.filteredUsers = [];
        let filterNameResult = false;
      for (let i = 0; i < this.users.length; i++) {
           this.username = this.users[i].username
        let upperName = this.username.toUpperCase();
        let upperFilterName = this.nameFilter.toUpperCase();

        filterNameResult = upperName.includes(upperFilterName);

        if (filterNameResult) {
          this.filteredUsers.push(this.users[i]);
        }
      }
    }
  }
};
</script>
