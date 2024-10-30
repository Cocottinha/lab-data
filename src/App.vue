<template>
  <nav>
    <div>
      <router-link to="/" class="logo">
        <img src="./assets/icon.svg" width="36px" class="logoI" />Lab.Data
      </router-link>
    </div>

    <div class="bar">
        <router-link to="/about" class="item">About</router-link>
        <router-link to="/posts" class="item">Posts</router-link>
        <router-link to="/login" class="item" v-if="!loggedIn">Login</router-link>
        <a @click="showModal = true" class="profile" v-if="loggedIn">{{ username }}</a>
    </div>

    <ConfirmationModal :isOpen="showModal" :onConfirm="handleLogout" :onCancel="cancelLogout" />
  </nav>
  <router-view />
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import ConfirmationModal from './components/ConfirmationModal.vue';

export default {
  components: {
    ConfirmationModal,
  },
  setup() {
    const store = useStore();
    const username = computed(() => store.getters.getUsername);
    const loggedIn = computed(() => store.getters.isLoggedIn);
    const showModal = ref(false);

    const handleLogout = () => {
      store.dispatch('logout');
      showModal.value = false;
    };

    const cancelLogout = () => {
      showModal.value = false;
    };

    return {
      loggedIn,
      username,
      showModal,
      handleLogout,
      cancelLogout,
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1e2831;
}

body {
  padding: 10px;
  margin: 10px;
  margin-left:10%;
  margin-right: 10%;
}

nav {
  gap: 40px;
  margin-bottom: 30px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;

  .router-link-exact-active {
    background: -webkit-linear-gradient(360deg, var(--labcolor), #00f0ff);
    color: white;
    border-radius: 20px;
  }

  .bar {
    text-align: end;  
    margin-top: 7px;
  }

  a {
    font-weight: bold;
    color: #2c3e50;
    padding: 10px;
    cursor: pointer;
    text-decoration: none;
    gap: 10px;
  }

  .item {
    font-size: 20px;
    border-radius: 20px;
    margin: 10px;

    &:hover {
      background-color: #a6a6a6;
      transition: 0.8s;
      color: white;
    }
  }

  .profile{
    font-size: 20px;
    border-radius: 20px;
    margin: 10px;

    &:hover {
      background-color: #cf3c3c;
      transition: 0.8s;
      color: white;
    }
  }

  .logo {
    font-size: 30px;
    font-weight: bold;
    background: -webkit-linear-gradient(360deg, var(--labcolor), #00f0ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .logoI {
    float: left;
    padding: 2px;
    font-size: 30px;
  }
}
</style>
