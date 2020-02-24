<template>
<div>
  <h1>Não tem autorização para aceder a esta página!</h1>
  <router-link :to="{name:'login'}" tag="button">
    <v-btn class="mb-1 ml-5"  dark large >
      Login Page
    </v-btn>
  </router-link>
  </div>
</template>