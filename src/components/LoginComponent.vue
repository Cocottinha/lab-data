<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import axios from 'axios';
import router from '@/router';

export default {
  name: 'LoginComponent',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {

      this.errorMessage = '';

      try {
        const response = await axios.post("https://api.labmov.tec.br/api/login", {
          email: this.username,
          password: this.password,
        });

        if (response.data.Sucesso) {
          const token = response.data.Dados.token;
          const name = response.data.Dados.nome;
          this.login({ token, name });
          router.push(this.$route.query.redirect || '/');
        } else {
          this.errorMessage = 'Invalid username or password.';
        }
      } catch (err) {
        this.errorMessage = err.message || 'An error occurred during login.';
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 300px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #2897f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #007bff;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
