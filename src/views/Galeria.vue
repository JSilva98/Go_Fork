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
export default {
  components: {
    NavbarSemLog,
    Footer
  },
  data: function() {
    return {
      reviews: this.$store.state.reviews,
      slides: [
        "https://www.eventosesabores.pt/wp-content/uploads/2019/06/eventosesabores_homepage_img5.jpg",
        "https://mariolagastronomia.com.br/wp-content/uploads/2017/10/Servico-de-catering-SP.jpg",
        "https://www.storycatering.pt/wp-content/uploads/2015/10/catering-eventos-orcamentos.png",
        "https://pmemagazine.sapo.pt/wp-content/uploads/2016/11/zaton-catering-001-660x330.jpg"
      ]
    };
  },

  methods: {
    
  }
};
</script>
