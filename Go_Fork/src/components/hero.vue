<template>
  <div>
    <v-parallax dark src="@/assets/asknzD.jpg">
    <!-- http://oyonode.com/images/theme-pics/paralax-orange-2.jpg -->
    
      <v-row cols align="center" justify="center">
        <v-col class="text-center" md="12">
          <h1 class="display-2 mb-4">Personalize o seu serviço</h1>
          <h4 class="font-weight-thin display-1">Serviços externos ESHT a sua disposição</h4>
          <router-link :to="{name: 'novo-pedido'}" tag="button">
            <v-btn class="mt-10" style="background-color:#F24B44" dark large> Novo Pedido</v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-parallax>
  </div>
</template>
<script>
export default {};
</script>