<template>
  <div class="main">
    <div class="login-container">
      <h2>Entrar</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <input type="text" id="username" placeholder="Email" v-model="username" required />
          <input type="password" id="password" placeholder="Senha" v-model="password" required />
        </div>
        <button type="submit">Conectar</button>
        
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <a href="/forgot-password">Esqueceu a Senha?</a>

      </form>
    </div>
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
        const response = await axios.post(process.env.VUE_APP_APILOGIN, {
          email: this.username,
          password: this.password,
        });

        if (response.data.Sucesso) {
          const token = response.data.Dados.token;
          const name = response.data.Dados.nome;
          const type = response.data.Dados.type;
          console.log(type);
          this.login({ token, name, type });
          router.push(this.$route.query.redirect || '/');
          this.errorMessage = "Conectando ..."
        } else {
          this.errorMessage = 'Usuário ou senha incorretos!';
        }
      } catch (err) {
        this.errorMessage = err.message || 'Ocorreu um erro durante a conexão.';
      }
    },
  },
};
</script>

<style scoped>
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh; /* Full viewport height */
  margin: 0 auto; /* Ensure no extra margin is added */
}

.login-container {
  width: 100%;
  max-width: 500px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.form-group {
  margin-top: 15px;
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 90%;
  padding: 20px;
  margin: 15px;
  border-radius: 5px;
  border: 1px black;
  outline: 1px black;
  background-color: #f4f4f5;
  color: var(black);
  font-family: Arial, Helvetica, sans-serif;
}

button {
  width: 90%;
  padding: 20px;
  background: linear-gradient(90deg, var(--labcolor) 0%, rgba(0, 212, 255, 1) 100%);
  color: var(--bg);
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 15px;
}

button:hover {
  background-color: #007bff;
}

.error {
  color: red;
  margin-top: 10px;
}
a{
  text-decoration: none;
  color: black;
}
</style>
