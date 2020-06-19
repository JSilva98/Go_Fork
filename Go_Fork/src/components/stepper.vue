<template>
  <v-content>
    <br />
    <h1 style="text-align: center">Faça o seu pedido</h1>

    <br />
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" @click="e1 = 1" color="#F24B44">
          <v-btn text>Tipo de Serviço</v-btn>
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2" @click="e1 = 2" color="#F24B44">
          <v-btn text>Menu</v-btn>
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 3" step="3" @click="e1 = 3" color="#F24B44">
          <v-btn text>Data e hora</v-btn>
        </v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 4" step="4" @click="e1 = 4" color="#F24B44">
          <v-btn text>Vestuário</v-btn>
        </v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 4" step="5" @click="e1 = 5" color="#F24B44">
          <v-btn text>Local</v-btn>
        </v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step step="6" @click="e1 = 6">
          <v-btn text>Extras</v-btn>
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <h4 class="center">Que tipo de serviço deseja?</h4>
          <h5
            class="center"
          >Pode saber mais sobre os nossos serviços e menus na nossa página de serviços</h5>
          <!-- <v-card class="mb-12" flat> -->
          <v-row class="justify-center">
            <v-col v-for="service in services" v-bind:key="service.id" md="3" class="ma-5">
              <div v-bind:class="{selected:service.selected}">
                <v-hover v-slot:default="{ hover }">
                  <v-card color="grey lighten-4" height="150 px" outlined flat>
                    <v-img :aspect-ratio="16/9" :src="service.imgLink">
                      <div
                        v-if="hover || service.selected==true"
                        class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-1 white--text"
                        style="height: 100%;"
                        v-on:click="setSelectedService(service._id)"
                      >{{service.name}}</div>
                    </v-img>
                  </v-card>
                </v-hover>
              </div>
            </v-col>
          </v-row>
          <!-- </v-card> -->

          <v-btn color="primary" @click="e1=2">Continue</v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <h4 class="center">Qual dos menus vai desejar?</h4>
          <!-- <v-card class="mb-12" flat> -->
          <v-row class="justify-center">
            <v-col v-for="menu in menus" v-bind:key="menu.id" md="3" class="ma-5">
              <div v-bind:class="{selected:menu.selected}">
                <v-hover v-slot:default="{ hover }">
                  <v-card color="grey lighten-4" height="150 px" outlined>
                    <v-img :aspect-ratio="16/9" :src="menu.imgLink">
                      <div
                        v-if="hover || menu.selected==true"
                        class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-1 white--text"
                        style="height: 100%;"
                        v-on:click="setSelectedMenu(menu._id)"
                      >{{menu.name}}</div>
                    </v-img>
                  </v-card>
                </v-hover>
              </div>
            </v-col>
          </v-row>
          <!-- </v-card> -->

          <v-btn color="primary" @click="e1 = 3">Continue</v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <h4 class="center">Escolha o dia e a hora do seu evento!</h4>
          <!-- <v-card class="mb-12" flat> -->
          <v-row class="justify-center">
            <v-col md="3" class="ma-5">
              <v-date-picker
                v-model="datePicker"
                year-icon="mdi-calendar-blank"
                prev-icon="mdi-skip-previous"
                next-icon="mdi-skip-next"
                full-width
              ></v-date-picker>
            </v-col>
            <v-col md="3" class="ma-5">
              <v-time-picker v-model="timePicker" color="green lighten-1" full-width></v-time-picker>
            </v-col>
          </v-row>
          <!-- </v-card> -->

          <v-btn color="primary" @click="e1=4">Seguinte</v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="4" flat>
          <h4 class="center">Que tipo de vestuário deseja que os nossos colaboradores utilizem?</h4>
          <br />
          <!-- <v-card class="mb-12" flat> -->
          <v-row class="justify-center">
            <v-col v-for="vestuario in vestuarios" v-bind:key="vestuario.id" md="3" class="ma-5">
              <div v-bind:class="{selected:vestuario.selected}">
                <v-hover v-slot:default="{ hover }">
                  <v-card color="grey lighten-4" height="150 px" outlined>
                    <v-img :aspect-ratio="16/9" :src="vestuario.img">
                      <div
                        v-if="hover || vestuario.selected==true"
                        class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-1 white--text"
                        style="height: 100%;"
                        v-on:click="setSelectedVestuario(vestuario._id)"
                      >{{vestuario.name}}</div>
                    </v-img>
                  </v-card>
                </v-hover>
              </div>
            </v-col>
          </v-row>
          <!-- </v-card> -->
          <br />
          <br />

          <v-btn color="primary" @click="e1=5">Seguinte</v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="5" flat>
          <!-- <v-card class="mb-12" flat> -->
          <v-row class="justify-center">
            <v-col cols="12" md="6">
              <h4>Onde irá decorrer este evento?</h4>
              <h5>Nós possuimos espaços do qual pode usufruir mas se preferir escolher o espaço por favor clique no seletor e escreva no campo abaixo a morada que deseja.</h5>
              <br />
              <v-row align="center">
                <v-checkbox v-model="enabled" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                <v-text-field :disabled="!enabled" v-model="local" label="Insira a morada aqui."></v-text-field>
              </v-row>
            </v-col>
          </v-row>
          <br />
          <br />

          <v-btn color="primary" @click="e1=6">Seguinte</v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="6" flat>
          <!-- <v-card class="mb-12" flat> -->
          <v-row class="justify-center">
            <v-col cols="12" md="6">
              <h4>Deseja algo que não está exposto no nosso website? Algo especial?</h4>
              <h5>Escreva no campo abaixo o que deseja acrescentar ao seu pedido (ex Múscia, Decoração)</h5>
              <br />
              <v-textarea solo name="input-7-4" label="Insira texto aqui." v-model="extras"></v-textarea>
            </v-col>
          </v-row>
          <br />
          <br />

          <v-btn color="primary" @click="submitNewRequest()">Submeter Pedido</v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <br />
    <br />
    <br />
  </v-content>
</template>

<style scoped>
.center {
  margin-top: 25px;
  margin-bottom: 25px;
  text-align: center;
}
</style>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "stepper",
  components: {},

  data() {
    return {
      services: [],
      menus: [],
      vestuarios: [],
      e1: 0,
      datePicker: new Date().toISOString().substr(0, 10),
      timePicker: null,
      request: null,
      selectedMenu: null,
      selectedService: null,
      selectedVestuario: null,
      extras: "",
      local: "sem local",
      enabled: false,
      users: null,
      loggedUser: null,
      Loguser: localStorage.getItem("userLoggedIn"),
      url: "http://localhost:3000/requests/"
    };
  },
  created() {
    console.log(this.Loguser)
      axios
      .get("http://localhost:3000/services/")
      .then(res => {
        this.services = res.data;
        console.log(this.services);
      })
      .catch(error => {
        console.log(error);
      })
  
      axios
        .get("http://localhost:3000/menus/")
        .then(res => {
          this.menus = res.data;
          this.allMenusStore = res.data;
          console.log(this.menus);
        })
        .catch(error => {
          console.log(error);
        })


      axios
        .get("http://localhost:3000/clothing/")
        .then(res => {
          this.vestuarios = res.data;
          console.log(this.vestuarios);
        })
        .catch(error => {
          console.log(error);
        })


      axios
        .get("http://localhost:3000/users/")
        .then(res => {
          this.users = res.data;
          this.getLoggedUser();
          console.log(this.users);
        })
        .catch(error => {
          console.log(error);
        })
     
  },


  methods: {
    setSelectedService(id) {
      for (let i = 0; i < this.services.length; i++) {
        if (this.services[i].selected == true && this.services[i]._id != id) {
          this.services[i].selected = false;
        }
        if (this.services[i].selected == false && this.services[i]._id == id) {
          this.services[i].selected = true;
          this.selectedService = this.services[i];
          console.log("Selected service:   " + this.services[i]);
          this.menus = this.allMenusStore.filter(
            menu => menu.idServico == this.selectedService._id
          );
        }
      }
    },
    setSelectedMenu(id) {
      for (let i = 0; i < this.menus.length; i++) {
        if (this.menus[i].selected == true && this.menus[i]._id != id) {
          this.menus[i].selected = false;
        }
        if (this.menus[i].selected == false && this.menus[i]._id == id) {
          this.menus[i].selected = true;
          this.selectedMenu = this.menus[i];
          console.log("Selected menu:   " + this.menus[i]);
        }
      }
    },
    setSelectedVestuario(id) {
      for (let i = 0; i < this.vestuarios.length; i++) {
        if (
          this.vestuarios[i].selected == true &&
          this.vestuarios[i]._id != id
        ) {
          this.vestuarios[i].selected = false;
        }
        if (
          this.vestuarios[i].selected == false &&
          this.vestuarios[i]._id == id
        ) {
          this.vestuarios[i].selected = true;
          this.selectedVestuario = this.vestuarios[i];
          console.log("Selected vestuario:   " + this.vestuarios[i]);
        }
      }
    },
    async submitNewRequest() {
      if (!this.menus.some(menu => menu.selected == true)) {
        //this.selectedMenu=this.menus.filter(menu=> menu.selected==true)

        Swal.fire({
          title: "Tem que selecionar um Menu!",
          icon: "error"
        });
      }

      if (!this.services.some(services => services.selected == true)) {
        //this.selectedMenu=this.services.filter(services=> services.selected==true)
        Swal.fire({
          title: "Tem que selecionar um Serviço!",
          icon: "error"
        });
      }

      if (this.datePicker == null) {
        Swal.fire({
          title: "Tem que selecionar um dia",
          icon: "error"
        });
      }

      if (this.timePicker == null) {
        Swal.fire({
          title: "Tem que selecionar uma hora",
          icon: "error"
        });
      } else {
        const response = await axios.post(this.url + "/", {
          userId: localStorage.getItem("userLoggedIn"),
          serviceName: this.selectedService.name,
          menuName: this.selectedMenu.name,
          date: this.datePicker,
          time: this.timePicker,
          vestuario: this.selectedVestuario.name,
          extras: this.extras,
          local: this.local,
          budget: 0,
          state: 1
        });

        if (response.data.error) {
          console.log(response.data.error);
          Swal({
            type: "error",
            title: "Ocorreu um erro, tente mais tarde"
          });
        }
          /*   
         this.$store.commit("ADD_REQUEST", {
          id: this.$store.getters.getReqLastId,
          userId: this.$store.getters.getLoggedUser.id,
          userName: this.$store.getters.getLoggedUser.username,
          serviceName: this.selectedService.name,
          menuName: this.selectedMenu.name,
          date: this.datePicker,
          time: this.timePicker,
          vestuario: this.selectedVestuario.name,
          extras: this.extras,
          local: this.local,
          budget: 0,
          state: 1
        }); */

          /* 
         this.$store.commit("UPDATENOTIFICATION", {
          id: this.$store.getters.getNotificationLastId,
          userId: this.$store.getters.getLoggedUser.id,
          userName: this.$store.getters.getLoggedUser.username,
          state: 1,
          serviceName: this.selectedService.name,
          menuName: this.selectedMenu.name,
          new: true
        })  */
          
          
      

      

          
           if (this.loggedUser.rewards.acheivements[0].available == true) {
            this.loggedUser.rewards.acheivements[0].progress = 100;
            this.loggedUser.points =
              this.loggedUser.points +
              this.loggedUser.rewards.acheivements[0].points;
            this.loggedUser.rewards.acheivements[0].available = false;
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
          console.log("ola2");

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
              this.loggedUser.rewards.acheivements[3].points;
            this.loggedUser.rewards.acheivements[3].available = false;
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

          Swal.fire({
            title: "Pedido efetuado com sucesso!",
            icon: "success"
          }).then(this.$router.push({ name: "home" }));
        }
    },

    getLoggedUser() {
      console.log(this.users)
      console.log(this.Loguser)
      for (let i = 0; i < this.users.length; i++) {
        console.log(this.loggedUser)
            if (this.users[i]._id == this.Loguser) {
              this.loggedUser = this.users[i];
              console.log(this.loggedUser);
              console.log("ola32");
            }
          }
    /*   for (let i = 0; i < this.users.length; i++) {
        if (this.users[i]._id == this.logUser) {
          this.loggedUser = this.users[i];
          this.acheivements = this.loggedUser.rewards.acheivements;
          this.rewards = this.$store.getters.getRewards;
          console.log(this.rewards);
        }
      } */
    }
    
  }
};
</script>
 <style>
.selected {
  border: 3px solid blue;
  border-radius: 5px;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.7;

  position: absolute;
  width: 100%;
}
</style>