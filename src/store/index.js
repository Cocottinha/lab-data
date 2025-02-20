import { createStore } from 'vuex';

const store = createStore({
  state: {
    loggedIn: false,
    username: '',
    userType: '',
  },
  mutations: {
    setAuth(state, { token, name, type }) {
      state.loggedIn = true;
      state.username = name;
      state.userType = type;
      localStorage.setItem('auth-token', token);
      localStorage.setItem('user-name', name);
      localStorage.setItem('user-type', type);
    },
    logout(state) {
      state.loggedIn = false;
      state.username = '';
      state.userType = '';
      localStorage.removeItem('auth-token');
      localStorage.removeItem('user-name');
      localStorage.removeItem('user-type');
    },
    checkAuth(state) {
      state.loggedIn = !!localStorage.getItem('auth-token');
      state.username = localStorage.getItem('user-name') || '';
      state.userType = localStorage.getItem('user-type') || '';
    },
  },
  actions: {
    login({ commit }, { token, name, type }) {
      commit('setAuth', { token, name, type });
    },
    logout({ commit }) {
      commit('logout');
    },
    checkAuth({ commit }) {
      commit('checkAuth');
    },
  },
  getters: {
    isLoggedIn: (state) => state.loggedIn,
    getUsername: (state) => state.username,
    getUserType: (state) => state.userType,
  },
});

export default store;
