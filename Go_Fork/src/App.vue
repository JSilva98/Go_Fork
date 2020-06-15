<template>
  <v-app style="{ backgroundColor: white}">
    <!--<Navbar />-->
    <!--<paralax/>-->
    <router-view></router-view>

    <v-content></v-content>
  </v-app>
</template>

<script>
//import HelloWorld from "./components/HelloWorld";
//import Navbar from "./components/NavBarSemLog"
//import paralax from"./components/paralax"

export default {
  beforeDestroy() {
    //update Local Storage Users
    localStorage.setItem("users", JSON.stringify(this.$store.state.users));
    //update Local Storage Menus
    localStorage.setItem("menus", JSON.stringify(this.$store.state.menus));
    //update Local Storage Serviços
    localStorage.setItem(
      "services",
      JSON.stringify(this.$store.state.services)
    );
    //update Local Storage Requests
    localStorage.setItem(
      "requests",
      JSON.stringify(this.$store.state.requests)
    );
    //update Local Storage Reviews
    localStorage.setItem("reviews", JSON.stringify(this.$store.state.reviews));
    //update Local Storage Notifications
    localStorage.setItem(
      "notifications",
      JSON.stringify(this.$store.state.notifications)
    );
    localStorage.setItem(
      "loggedUser",
      JSON.stringify(this.$store.state.loggedUser)
    );
     localStorage.setItem(
          "rewards",
          JSON.stringify(this.$store.state.rewards)
        );
  },
  created() {
    window.addEventListener(
      "beforeunload",
      () => {
         //update Local Storage Users
        localStorage.setItem("users", JSON.stringify(this.$store.state.users));
        //update Local Storage Menus
        localStorage.setItem("menus", JSON.stringify(this.$store.state.menus));
        //update Local Storage Serviços
        localStorage.setItem(
          "services",
          JSON.stringify(this.$store.state.services)
        );
        //update Local Storage Requests
        localStorage.setItem(
          "requests",
          JSON.stringify(this.$store.state.requests)
        );
        //update Local Storage Reviews
        localStorage.setItem(
          "reviews",
          JSON.stringify(this.$store.state.reviews)
        );
        //update Local Storage Notifications
        localStorage.setItem(
          "notifications",
          JSON.stringify(this.$store.state.notifications)
        );
        localStorage.setItem(
          "loggedUser",
          JSON.stringify(this.$store.state.loggedUser)
        );
        localStorage.setItem(
          "rewards",
          JSON.stringify(this.$store.state.rewards)
        );
         
      },
      false
    );

    //efetuar se as varias veis estao no local storage para as atualizar na store
    if (localStorage.getItem("users") != null) {
      //
      this.$store.state.users = JSON.parse(localStorage.getItem("users"));

      console.log("Created function: set local Users in store");
    }
    if (localStorage.getItem("menus") != null) {
      //
      this.$store.state.menus = JSON.parse(localStorage.getItem("menus"));

      console.log("Created function: set local Menus in store");
    }
    if (localStorage.getItem("services") != null) {
      //
      this.$store.state.services = JSON.parse(localStorage.getItem("services"));

      console.log("Created function: set local Services in store");
    }
    if (localStorage.getItem("requests") != null) {
      //
      this.$store.state.requests = JSON.parse(localStorage.getItem("requests"));

      console.log("Created function: set local Requests in store");
    }
    if (localStorage.getItem("reviews") != null) {
      //
      this.$store.state.reviews = JSON.parse(localStorage.getItem("reviews"));

      console.log("Created function: set local Reviews in store");
    }
    if (localStorage.getItem("notifications") != null) {
      //
      this.$store.state.notifications = JSON.parse(
        localStorage.getItem("notifications")
      );

      console.log("Created function: set local Notifications in store");
    }
    if (localStorage.getItem("loggedUser") != null) {
      //
      this.$store.state.loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

      console.log("Created function: set local loggedUser in store");
    }
    if (localStorage.getItem("rewards") != null) {
      //
      this.$store.state.rewards = JSON.parse(localStorage.getItem("rewards"));

      console.log("Created function: set local rewards in store");
    }
  }
};
</script>

<style>
body {
  font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
  background-color: white;
}
</style>
