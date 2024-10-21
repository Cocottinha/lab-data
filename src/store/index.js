// src/store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    loggedIn: false,
    username: '',
  },
  mutations: {
    setAuth(state, { token, name }) {
      state.loggedIn = true;
      state.username = name;
      localStorage.setItem('auth-token', token);
      localStorage.setItem('user-name', name);
    },
    logout(state) {
      state.loggedIn = false;
      state.username = '';
      localStorage.removeItem('auth-token');
      localStorage.removeItem('user-name');
      location.reload();
    },
    checkAuth(state) {
      state.loggedIn = !!localStorage.getItem('auth-token');
      state.username = localStorage.getItem('user-name') || '';
    },
  },
  actions: {
    login({ commit }, { token, name }) {
      commit('setAuth', { token, name });
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
  },
});

export default store;
