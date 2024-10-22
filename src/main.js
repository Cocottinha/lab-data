import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import "@/assets/globals.css";

// Create the Vue app instance
const app = createApp(App);

// Dispatch the checkAuth action to initialize authentication state
store.dispatch('checkAuth');

// Use the router and store
app.use(store);
app.use(router);

// Mount the app
app.mount('#app');
