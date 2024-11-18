<template>
    <div class="main">
      <div class="login-container">
        <h2>Criar Conta</h2>
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <input type="text" id="name" placeholder="Nome" v-model="name" required />
            <input type="text" id="email" placeholder="Email" v-model="email" required />
            <input type="password" id="password" placeholder="Senha" v-model="password" required />
            <input type="password" id="c_password" placeholder="Confirme a Senha" v-model="cPassword" required />
          </div>
          <button type="submit">Criar</button>
  
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import router from '@/router';
  
  export default {
    name: 'CreateAccountComponent',
    data() {
      return {
        name: '',
        email: '',
        password: '',
        cPassword: '',
        errorMessage: '',
      };
    },
    methods: {
      async handleRegister() {
        this.errorMessage = '';
  
        // Validação da senha
        if (this.password !== this.cPassword) {
          this.errorMessage = 'As senhas não coincidem.';
          return;
        }

        try {
          const response = await axios.post(process.env.VUE_APP_APIREGISTRAR, {
            name: this.name.toString(),
            email: this.email.toString(),
            password: this.password.toString(),
            c_password: this.cPassword.toString(),
          },{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
        }});
          
          if (response.data.Sucesso) {
            // Armazena o token e redireciona
            const token = response.data.Dados.token;
            const name = response.data.Dados.nome;
  
            // Salva o token e nome no estado global ou localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('name', name);
  
            router.push(this.$route.query.redirect || '/');
          } else {
            this.errorMessage = response.data.Mensagem || 'Erro ao criar a conta.';
          }
        } catch (err) {
          this.errorMessage = err.response?.data?.Mensagem || 'Ocorreu um erro durante a criação da conta.';
          console.log(err)
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
    height: 80vh;
    margin: 0 auto;
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
  
  input {
    width: 90%;
    padding: 20px;
    margin: 15px;
    border-radius: 5px;
    border: 1px solid black;
    outline: none;
    background-color: #f4f4f5;
    color: black;
    font-family: Arial, Helvetica, sans-serif;
  }
  
  button {
    width: 90%;
    padding: 20px;
    background: linear-gradient(90deg, var(--labcolor) 0%, rgba(0, 212, 255, 1) 100%);
    color: white;
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
  </style>
  