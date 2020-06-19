<template>
  <div class="about">
    <NavbarSemLog />
    <h2><span>Galeria</span></h2>
     <p class="center">Gostamos de partilhar convosco todos os eventos de catering que já realizamos.</p>
    <v-carousel
      cycle
      height="460"
      hide-delimiter-background
      show-arrows-on-hover
      class="pa-md-12 mx-lg-auto"
    >
      <v-carousel-item v-for="slide in slides" :key="slide">
        <v-sheet height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <v-img :src="slide" aspect-ratio="2"></v-img>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <br />
    <div>
      <h2><span>Avaliações</span></h2>
       <p class="center">Os nossos clientes têm possibilidade de avaliar e comentar o serviço prestado.</p>
    </div>
    <v-row class="justify-center">
      <v-col v-for="review in reviews" :key="review.id" md="3" class="ma-5">
        <v-card class="mx-auto" max-width="344" outlined shaped>
          <v-list-item three-line>
            <v-list-item-content>
              
              <div class="overline mb-4">
                <v-avatar>
                <img :src="review.foto" max-height=15 max-width=15 />
              </v-avatar> {{review.userName}}</div>
              <v-list-item-title class="headline mb-1">
                <v-rating :value="review.rating" background-color="grey" color="grey" readonly></v-rating>
              </v-list-item-title>
              <v-list-item-subtitle>{{review.comment}}</v-list-item-subtitle>
              <td v-if="userLoggedIn != -1 && type == 1">
                    <v-btn small @click="removeReview(review._id)" color="error">Remover</v-btn>
                  </td>
            </v-list-item-content>
          </v-list-item>
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
    background:#fafafa; 
    padding:0 10px; 
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
      reviews: [],
      users: null,
      userLoggedIn: localStorage.getItem("userLoggedIn"),
      type: 0,
      slides: [
        "https://www.eventosesabores.pt/wp-content/uploads/2019/06/eventosesabores_homepage_img5.jpg",
        "https://mariolagastronomia.com.br/wp-content/uploads/2017/10/Servico-de-catering-SP.jpg",
        "https://www.storycatering.pt/wp-content/uploads/2015/10/catering-eventos-orcamentos.png",
        "https://pmemagazine.sapo.pt/wp-content/uploads/2016/11/zaton-catering-001-660x330.jpg"
      ]
    };
  },

  created() {
 

    axios
        .get("http://localhost:3000/reviews/")
        .then(res => {
          this.reviews = res.data;
        })
        .catch(error => {
          console.log(error);
        })


    axios
      .get("http://localhost:3000/users/")
      .then(res => {
        this.users = res.data;
        this.getLoggedUser();
        //console.log(this.users)
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    getLoggedUser() {
       for (let i = 0; i < this.users.length; i++) {
        if (this.users[i]._id == this.userLoggedIn) {
          this.type = this.users[i].type;
        }
      }
    },

    removeReview(id){
      const swalButtons = Swal.mixin({
        customClass: {
          confirmButton: "confirm-button-class",
          cancelButton: "cancel-button-class"
        },
        buttonsStyling: true
      });

      swalButtons
        .fire({
          title: "Deseja mesmo remover esta review?",
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
            swalButtons.fire("Review removido com sucesso", "", "success");
            for (let i = 0; i < this.reviews.length; i++) {
              if (this.reviews[i]._id == id) {
                let route = "http://localhost:3000/reviews/" + this.reviews[i]._id;
                axios
                  .delete(route)
                  .then(res => {
                    console.log(res);
                  })
                  .catch(error => {
                    console.log(error);
                  });
                this.reviews.splice(i, 1);
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
