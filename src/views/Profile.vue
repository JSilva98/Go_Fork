<template>
  <div>
    <NavbarSemLog />
    <h2><span>Perfil</span></h2>
    <v-container fluid>
      <br />
      <v-layout column>
        <v-card>
          <v-card-text>
            <v-row>
              <v-flex>
                <v-img 
                  v-if="this.loggedUser.foto != ''"
                  max-height="125"
                  max-width="125"
                  class="centerImg"
                  :src="this.loggedUser.foto"
                ></v-img>
                <v-img 
                  v-if="this.loggedUser.foto == ''"
                  max-height="125"
                  max-width="125"
                  class="centerImg"
                  src="https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png"
                ></v-img>
              </v-flex>
            </v-row>
            <br />
            <h1 class="center">Bem-vindo {{this.loggedUser.username}}</h1>
            <br />
            <br />
            <v-row>
              <v-col cols="6">
                <h5>Username:</h5>
                <v-text-field
                  v-model="editUsername"
                  prepend-icon="person"
                  :label="this.loggedUser.username"
                  required
                ></v-text-field>
                <h5>Insira o link da sua Foto:</h5>
                <v-text-field
                  v-model="editFoto"
                  prepend-icon="person"
                  :label="this.loggedUser.foto"
                  required
                ></v-text-field>
                <h5>Email:</h5>
                <v-text-field
                  v-model="editEmail"
                  prepend-icon="email"
                  :label="this.loggedUser.email"
                  required
                ></v-text-field>
                <h5>Password:</h5>
                <v-text-field
                  v-model="editPassword"
                  prepend-icon="lock"
                  :label="this.loggedUser.password"
                  type="password"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <h1>Necessita de ajuda?</h1>
                <br />
                <h3>Deseja alterar a sua informação?</h3>
                <br />
                <p>
                  A sua informação atual encontra-se exposta no interior de cada caixa de texto, para puder alterar
                  necessita de primir a caixa de texto e escrever a sua nova informação. De seguida, prima o botão "Alterar Informação" e
                  ja está!
                </p>
                <h5>Nota: Os campos que não preencher irão permanecer com a informação que possuia anteriormente.</h5>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-flex class="center">
              <v-btn @click="editUser()">Alterar Informação</v-btn>
            </v-flex>
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-container>
    <br />
    <br />
    <v-row class="justify-center">
      <h2><span>Conquistas</span></h2>
    </v-row>
    <br />
    <br />
    <!-- Achievements -->
    <v-row class="justify-center">
      <v-col v-for="achievement in achievements" v-bind:key="achievement.id">
        <v-card class="mx-auto" max-width="344" height="150" outlined shaped>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">{{achievement.tittle}}</div>

              <v-list-item-subtitle>{{achievement.desc}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-row class="justify-center">
            <div>{{achievement.progress}}%</div>
          </v-row>
          <v-card class="mx-auto" max-width="200">
            <v-progress-linear
              :value="achievement.progress"
              :buffer-value="bufferValue"
              :color="color"
              absolute
              height="7"
            ></v-progress-linear>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
    <br />
    <br />
    <v-row class="justify-center">
      <h2><span>Recompensas</span></h2>
      <br />
      <br />
    </v-row>
    <!-- Recompensas -->
    <v-row class="justify-center">
      <v-col v-for="reward in rewards" v-bind:key="reward.id" cols="12">
        <v-card class="mx-auto" width="600" height="150" outlined shaped>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">{{reward.tittle}}</div>

              <v-list-item-subtitle>{{reward.desc}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-row class="justify-center">
            <div>{{reward.progress}}%</div>
          </v-row>
          <v-card class="mx-auto" max-width="400">
            <v-progress-linear
              :value="reward.progress"
              :buffer-value="bufferValue"
              :color="color"
              absolute
              height="7"
            ></v-progress-linear>
          </v-card>
        </v-card>
      </v-col>
    </v-row>

    <br />
    <br />
    <Footer></Footer>
  </div>
</template>


<style scoped>
.center {
  margin-top: 25px;
  margin-bottom: 25px;
  text-align: center;
}

.centerImg {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

h2 {
   width: 100%; 
   text-align: center; 
   border-bottom: 1px solid #000; 
   line-height: 0.1em;
   margin-top: 25px; 
} 

h2 span { 
    background:#fafafa; 
    padding:0 10px; 
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
    return {
      loggedUser: this.$store.state.loggedUser,
      points: this.$store.state.loggedUser.points,
      users: this.$store.state.users,
      editUsername: "",
      editFoto: "",
      editEmail: "",
      editPassword: "",
      achievements: null,
      rewards: null,
      value: 0,
      bufferValue: 100
    };
  },
  computed: {
    // progress () {
    //   return Math.min(100, this.value * 10)
    // },
    color() {
      return ["error", "warning", "success"][Math.floor(this.progress / 40)];
    }
  },

  created() {
    //this.achievements = this.$store.getters.getAchievements;
    this.rewards = this.$store.getters.getRewards;
   this.achievements =this.loggedUser.rewards.achievements;
   console.log(this.achievements)
   //this.rewards= this.loggedUser.arewards;
    for (let i = 0; i < this.rewards.length; i++) {
      this.rewards[i].progress = (this.points * 100) / this.rewards[i].meta;
    }
  },

  methods: {
    check() {
      console.log(this.loggedUser);
    },

    editUser() {
      for (let i = 0; i < this.users.length; i++) {
        if (this.loggedUser.id === this.users[i].id) {
          if (this.editUsername == "") {
            this.editUsername = this.loggedUser.username;
          } else {
            this.users[i].username = this.editUsername;
          }
          if (this.editFoto == "") {
            this.editFoto = this.loggedUser.foto;
          } else {
            this.users[i].foto = this.editFoto;
          }
          if (this.editEmail == "") {
            this.editEmail = this.loggedUser.email;
          } else {
            this.users[i].email = this.editEmail;
          }
          if (this.editPassword == "") {
            this.editPassword = this.loggedUser.password;
          } else {
            this.users[i].password = this.editPassword;
          }
        }
      }
    }
  }
};
</script>
