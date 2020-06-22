<template>

  <v-hover v-slot:default="{ hover }" >
    <v-card class="md-auto" color="grey lighten-4" height="150 px" outlined>
      <v-img :aspect-ratio="16/9" :src=image>
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-1 white--text"
            style="height: 100%;"
             
          >{{name}}</div>
        </v-expand-transition>
      </v-img>
     
    </v-card>
  </v-hover>
 
</template>


  <style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.7;

  position: absolute;
  width: 100%;
}
</style>

<script>
export default {
  props: ['name', 'image'],
  data() {
    return {
    };
  },

  mounted() {
    console.log(this.image);
  },

  methods:{
  
  }
  

};
</script>

