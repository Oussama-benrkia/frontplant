export const environment = {
    apiUrl: 'http://localhost:8080',
    userController: {
      user: '/api/user',
      actionUser: '/api/user/',
      listUser: '/api/user/list'
    },

    plantesController: {
      plantes: '/api/plantes',
      actionPlantes: '/api/plantes/',
      commentaire: '/api/plantes/commentaire/',
      listPlantes: '/api/plantes/list'
    },

    maladiesController: {
      maladie: '/api/maladies',
      actionMaladie: '/api/maladies/',
      listMaladies: '/api/maladies/list'
    },

    compteController: {
      Profile: '/api/compte',
    },

    articleController: {
      article: '/api/articles',
      actionArticle: '/api/articles/',
      commentaire: '/api/articles/commentaire/',
      listArticles: '/api/articles/list'
    },
    authController: {
      register: '/auth/register',
      refreshToken: '/auth/refresh',
      login: '/auth/login',
      logout: '/api/auth/logout'
    }
  };
