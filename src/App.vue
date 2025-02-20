<template>
  <nav>
    <router-link to="/" class="logo" v-if="!isMobile">
      <img src="./assets/icon.svg" width="36px" class="logoI" /><span>Lab.Data</span>
    </router-link>
    <router-link to="/" class="logo" v-else>
      <img src="./assets/icon.svg" width="36px" class="logoI" />
    </router-link>

    <div class="bar">
      <router-link to="/admin" class="item" v-if="isAdmin">Admin</router-link>
      <router-link to="/posts" class="item">Postagens</router-link>     
      <router-link to="/login" class="item" v-if="!loggedIn">Entrar</router-link>
      <a @click="showModal = true" class="profile" v-if="loggedIn">Sair</a>
    </div>

    <ConfirmationModal :isOpen="showModal" :onConfirm="handleLogout" :onCancel="cancelLogout" />
    
  </nav>
  <router-view />
</template>


<script>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
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
    const userType = computed(() => store.getters.getUserType);
    const isAdmin = computed(() => loggedIn.value && userType.value === 'admin');
    const showModal = ref(false);
    const windowWidth = ref(window.innerWidth); // Reactive property for window width

    console.log(userType, username);
    const handleLogout = () => {
      store.dispatch('logout');
      showModal.value = false;
    };

    const cancelLogout = () => {
      showModal.value = false;
    };

    const updateWindowWidth = () => {
      windowWidth.value = window.innerWidth; // Update the reactive property
    };

    const isMobile = computed(() => windowWidth.value < 670);

    onMounted(() => {
      window.addEventListener('resize', updateWindowWidth);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateWindowWidth);
    });

    
    return {
      loggedIn,
      username,
      showModal,
      handleLogout,
      cancelLogout,
      windowWidth,
      isMobile,
      userType,
      isAdmin
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
  margin: auto;
  padding-top: 5px;
    padding-left: 50px;
    padding-right: 50px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
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
    margin-top: 0px;
    display: flex;
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
    margin: 6px;

    &:hover {
      background-color: #a6a6a6;
      transition: 0.8s;
      color: white;
    }
  }

  .profile{
    font-size: 20px;
    border-radius: 20px;
    margin: 6px;

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
@media (max-width: 420px){
nav{
  gap: 20px;
}
}
</style>
