import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menus: [{
      id: 0,
      idServico: 0,
      name: "Menu Simples",
      food: ["Pão", "Bolachas"],
      drink: ["Café", "Leite"],
      imgLink: "https://hatandapron.files.wordpress.com/2013/09/dsc_1436.jpg",
      selected: false
    },
    {
      id: 1,
      idServico: 0,
      name: "Menu Premium",
      food: ["Pão", "Bolachas", "Bolo de Chocolate"],
      drink: ["Café", "Leite", "Sumo de Laranja"],
      imgLink: "https://thumbs.dreamstime.com/b/bolo-de-chocolate-da-cereja-e-ajuste-do-suco-de-laranja-na-tabela-de-madeira-56219471.jpg",
      selected: false
    },
    {
      id: 2,
      idServico: 0,
      name: "Menu Deluxe",
      food: ["Pão", "Bolachas", "Bolo de Chocolate", "Compota", "Mel"],
      drink: ["Café", "Leite", "Sumo de Laranja", "Sumo de Maça"],
      imgLink: "https://www.nacadeiradapapa.com/wp-content/uploads/2019/02/paosemgluten04-1200x675.jpg",
      selected: false
    },
    {
      id: 3,
      idServico: 2,
      name: "Menu Simples",
      food: ["Pão", "Bolachas"],
      drink: ["Café", "Água"],
      imgLink: "https://hatandapron.files.wordpress.com/2013/09/dsc_1436.jpg",
      selected: false
    },
    {
      id: 4,
      idServico: 2,
      name: "Menu Premium",
      food: ["Pão", "Bolachas", "Bolo de Chocolate"],
      drink: ["Café", "Água", "Sumo de Laranja"],
      imgLink: "https://thumbs.dreamstime.com/b/bolo-de-chocolate-da-cereja-e-ajuste-do-suco-de-laranja-na-tabela-de-madeira-56219471.jpg",
      selected: false
    },
    {
      id: 5,
      idServico: 3,
      name: "Menu Simples",
      food: ["Bife de Perú grelhado", "Francesinha"],
      drink: ["Água", "Refrigerante"],
      imgLink: "https://i.pinimg.com/originals/a0/e2/5d/a0e25ddcfae768e2e7b8fcaf5f3cbd47.jpg",
      selected: false
    },
    {
      id: 6,
      idServico: 3,
      name: "Menu Premium",
      food: ["Coelho Assado", "Salmão no Forno"],
      drink: ["Água", "Refrigerante", "Vinho"],
      imgLink: "https://www.pingodoce.pt/wp-content/uploads/2016/10/salmaonoforno-516x310.jpg",
      selected: false
    },
    {
      id: 7,
      idServico: 3,
      name: "Menu Deluxe",
      food: ["Cozido à Portuguesa", "Bacalhau à Lagareiro"],
      drink: ["Água", "Refrigerante", "Vinho", "Espumante"],
      imgLink: "https://www.teleculinaria.pt/wp-content/uploads/2018/05/bacalhau-a-lagareiro.jpg",
      selected: false
    },],
    vestuarios: [
      {
        id: 0,
        name: "Formal",
        img: "https://i.pinimg.com/originals/a9/f3/d5/a9f3d5b95b612e63bb8c601aa0433612.jpg",
        selected: false
      },
      {
        id: 1,
        name: "Informal",
        img: "https://www.russums-shop.co.uk/files/uk/imagelibrary/subcategory/coloured-shirts.jpg",
        selected: false
      }
    ],
    users: [
      /* {
        id: 0,
        username: "admin",
        password: "123",
        type: 1
      },
      {
        id: 1,
        email: "joao@gmail.com",
        username: "joao",
        password: "123",
        foto: "https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png",
        type: 3
      } */

    ],
    achievements: [
      {
        id: 0,
        tittle: "Primeiro Pedido",
        desc: "Faça o seu primeiro pedido para receber 5 pontos!",
        points: 5,
        available: true,
        progress: 0,
      },
      {
        id: 1,
        tittle: "Primeiro Pagamento",
        desc: "Faça o seu primeiro pagamento para receber 5 pontos!",
        points: 5,
        available: true,
        progress: 0,
      },
      {
        id: 2,
        tittle: "Primeira review",
        desc: "Faça sua primeira avaliação para receber 5 pontos!",
        points: 5,
        available: true,
        progress: 0,
      },
      {
        id: 3,
        tittle: "Fazer 10 pagamentos",
        desc: "Faça 10 avaliações para receber 50 pontos!",
        points: 50,
        available: true,
        progress: 0,
      },
      {
        id: 4,
        tittle: "Fazer 10 reviews",
        desc: "Faça o seu primeiro pedido para receber 35‬ pontos!",
        points: 35,
        available: true,
        progress: 0,
      }
    ],
    rewards: [
      {
        id: 0,
        tittle: "Fazer um pedido de graça",
        desc: "Junte 200‬ pontos para receber um pedido gratuito",
        progress: "0",
        meta: 200,
        complete: false,
      },
      {
        id: 1,
        tittle: "Receber um cupao de 20€",
        desc: "Junte 100‬ pontos para receber um cupao de 20€",
        progress: 0,
        meta: 100,
        complete: false,
      }
    ],
    loggedUser: { id: -1 },
    requests: [
      {
        id: 0,
        userId: 4,
        userName: "marcia",
        serviceName: "Coffe Break",
        menuName: "Menu A",
        date: "2020-01-30",
        time: "06:35",
        vestuario: "Formal",
        extras: "Musica",
        local: "sem local",
        budget: 0,
        state: 1
      },
      {
        id: 1,
        userId: 1,
        userName: "joao",
        serviceName: "Coffe Break",
        menuName: "Menu A",
        date: "2020-01-30",
        time: "06:35",
        vestuario: "Formal",
        extras: "Musica",
        local: "R.rua",
        budget: 0,
        state: 1
      }
    ],
    services: [
      {
        id: 0,
        name: "Pequeno Almoço",
        imgLink: "https://media-manager.noticiasaominuto.com/1920/1558605477/naom_5ce66e68b5899.jpg?crop_params=eyJsYW5kc2NhcGUiOnsiY3JvcFdpZHRoIjoyNTYwLCJjcm9wSGVpZ2h0IjoxNDM5LCJjcm9wWCI6MCwiY3JvcFkiOjg3fSwicG9ydHJhaXQiOnsiY3JvcFdpZHRoIjo5NzMsImNyb3BIZWlnaHQiOjE3MzAsImNyb3BYIjoxMTYwLCJjcm9wWSI6MH19",
        selected: false,

      },
      {
        id: 2,
        name: "Coffe Break",
        imgLink: "https://cdn.dicionariopopular.com/imagens/coffee-break-og.jpg",
        selected: false,

      },
      {
        id: 3,
        name: "Buffet",
        imgLink: "https://fokke.com.br/wp-content/uploads/2013/09/buffet.jpg",
        selected: false,

      }
    ],

    notifications: [

    ],

    reviews: [
      {
        id: 0,
        userId: 1,
        userName: "joao",
        foto: "https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png",
        rating: 4,
        comment: "Gostei do serviço"
      }
    ]

  },
  mutations: {
    REGISTER: (state, paylod) => {
      state.users.push({
        id: paylod.id,
        username: paylod.username,
        password: paylod.password,
        email: paylod.email,
        foto: paylod.foto,
        type: paylod.type,
        points: 0,
        rewards: {
          requestServiceForFree: false,
          get20EurosCupon: false,
          achievements: [
            {
              id: 0,
              tittle: "Primeiro Pedido",
              desc: "Faça o seu primeiro pedido para receber 5 pontos!",
              points: 5,
              available: true,
              progress: 0,
            },
            {
              id: 1,
              tittle: "Primeiro Pagamento",
              desc: "Faça o seu primeiro pagamento para receber 5 pontos!",
              points: 5,
              available: true,
              progress: 0,
            },
            {
              id: 2,
              tittle: "Primeira review",
              desc: "Faça o seu primeiro pedido para receber 5 pontos!",
              points: 5,
              available: true,
              progress: 0,
            },
            {
              id: 3,
              tittle: "Fazer 10 pagamentos",
              desc: "Faça 10 pagamentos para receber 50 pontos!",
              points: 50,
              available: true,
              progress: 0,
            },
            {
              id: 4,
              tittle: "Fazer 10 reviews",
              desc: "Faça o seu primeiro pedido para receber 35‬ pontos!",
              points: 35,
              available: true,
              progress: 0,
            }
          ]

        },


      })
    },
    SET_LOGGED_USER: (state, paylod) => { state.loggedUser = paylod },
    LOGOUT: (state) => { state.loggedUser = { id: -1 } },
    ADD_REQUEST: (state, payload) => {
      state.requests.push({
        id: payload.id,
        userId: payload.userId,
        userName: payload.userName,
        serviceName: payload.serviceName,
        menuName: payload.menuName,
        date: payload.date,
        time: payload.time,
        vestuario: payload.vestuario,
        state: payload.state,
        extras: payload.extras,
        local: payload.local
      })
    },
    UPDATENOTIFICATION: (state, payload) => {
      state.notifications.push({
        userId: payload.userId,
        userName: payload.userName,
        serviceName: payload.serviceName,
        menuName: payload.menuName,
        state: payload.state,
        new: payload.new
      })
    },
    ADDREQUESTTOUSER: (state, payload) => {
      state.userRequests.push({
        id: payload.id,
        idUser: payload.idUser,
        userName: payload.userName,
        serviceName: payload.serviceName,
        menuName: payload.menuName,
        budget: payload.budget,
        state: payload.state
        /*      date: payload.date,
             time: payload.time,
             vestuario: payload.vestuario */
      })
    },
    ADDSERVICE: (state, payload) => {
      state.services.push({
        id: payload.id,
        name: payload.name,
        imgLink: payload.imgLink,
        selected: false,
      })
    },
    ADDMENU: (state, payload) => {
      state.menus.push({
        id: payload.id,
        idServico: payload.idServico,
        name: payload.name,
        imgLink: payload.imgLink,
        food: payload.food,
        drink: payload.drink,
        selected: false,
      })
    },
    ADDREVIEW: (state, payload) => {
      state.reviews.push({
        id: payload.id,
        userId: payload.userId,
        userName: payload.userName,
        rating: payload.rating,
        comment: payload.comment,

      })
    },
  },
  getters: {
    getLogin: (state) => (username, password) => {

      return state.users.find(user => (user.username === username && user.password === password))

    },
    getLastId: (state) => {
      let lastId = 0
      if (state.users.length > 0) {
        lastId = state.users[state.users.length - 1].id + 1
      }
      return lastId
    }, getReqLastId: (state) => {
      let lastId = 0
      if (state.requests.length > 0) {
        lastId = state.requests[state.requests.length - 1].id + 1
      }
      return lastId
    },
    getServLastId: (state) => {
      let lastId = 0
      if (state.services.length > 0) {
        lastId = state.services[state.services.length - 1].id + 1
      }
      return lastId
    },
    getMenuLastId: (state) => {
      let lastId = 0
      if (state.menus.length > 0) {
        lastId = state.menus[state.menus.length - 1].id + 1
      }
      return lastId
    },
    getRequestToUserLastId: (state) => {
      let lastId = 0
      if (state.userRequests.length > 0) {
        lastId = state.userRequests[state.userRequests.length - 1].id + 1
      }
      return lastId
    },
    getReviewLastId: (state) => {
      let lastId = 0
      if (state.reviews.length > 0) {
        lastId = state.reviews[state.reviews.length - 1].id + 1
      }
      return lastId
    },
    getNotificationLastId: (state) => {
      let lastId = 0
      if (state.notifications.length > 0) {
        lastId = state.notifications[state.notifications.length - 1].id + 1
      }
      return lastId
    },
    getLoggedUser: (state) => {
      return state.loggedUser;
    },
    getServices: (state) => {
      return state.services;
    },
    getMenus: (state) => {
      return state.menus;
    },
    getUserRequests: (state) => {
      return state.requests;
    },
    getVestuarios: (state) => {
      return state.vestuarios;
    },
    getAchievements: (state) => {
      return state.achievements;
    },

    getRewards: (state) => {
      return state.rewards;
    },

    getNotifications: (state) => {
      return state.notifications;
    },
    getUsers: (state) => {
      return state.users;
    },



  },
  actions: {},
  modules: {},

});
