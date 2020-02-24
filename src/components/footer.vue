<template>
  <v-footer dark padless color="#0b5aa8" class="footer darken-3 white--text text-center">
    <div class="container">
      <div class="row">
        <div class="col-4">
          <a href="https://www.ipp.pt/">
            <img src="https://www.esmad.ipp.pt/logo_pporto_branco.png" width="200" />
          </a>
        </div>
        <div class="col-4">
          <p>Escola Superior de Media Artes e Design</p>
          <p>Rua D. Sancho I, n.º 981</p>
          <p>4480-876 Vila do Conde</p>
          <p>Portugal</p>
          <p>T. +351 252 291 700</p>
          <p>E. geral@esmad.ipp.pt</p>
        </div>
        <div class="col-4">
          <p>ESMAD © 2020</p>
          <p>GO Fork © 2020</p>
          <a href="https://moodle.esmad.ipp.pt/mdl1920/?redirect=0">
            <p>Moodle</p>
          </a>
        </div>
      </div>
    </div>
  </v-footer>
</template>

<style scoped>
p {
  margin-top: -17px;
}

footer {
 height: 200px;
  flex-shrink: 0;
}
</style>



<script>
export default {
  data: () => ({
    icons: [
      "fab fa-facebook",
      "fab fa-twitter",
      "fab fa-google-plus",
      "fab fa-linkedin",
      "fab fa-instagram"
    ]
  })
};
</script>