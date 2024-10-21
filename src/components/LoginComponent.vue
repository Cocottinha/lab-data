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
import { ref } from 'vue';
import axios from 'axios';
import router from '@/router';

export default {
  name: 'LoginComponent',
  setup() {
    const username = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const handleLogin = async () => {
      errorMessage.value = ''; // Reset error message

      try {
        const result = await Login(username.value, password.value);
        if (result) {
          alert('Login successful!');
          localStorage.setItem("auth-token", result.Dados.token);
          localStorage.setItem("user-name", result.Dados.nome);

          // Redirect to the intended route or home
          const redirectPath = router.currentRoute.value.query.redirect || '/';
          router.push(redirectPath);
        } else {
          errorMessage.value = 'Invalid username or password.';
        }
      } catch (err) {
        errorMessage.value = err.message || 'An error occurred during login.';
      }
    };

    return {
      username,
      password,
      errorMessage,
      handleLogin,
    };
  },
};

// The API login function
export const Login = async (username, password) => {
  const requestData = {
    email: username,
    password: password,
  };

  try {
    const response = await axios.post("https://api.labmov.tec.br/api/login", requestData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    if (!response.data.Sucesso) {
      throw new Error("Token not found!");
    }

    return response.data; // Return the response for further processing
  } catch (err) {
    console.error(err);
    throw new Error('Login failed. Please check your credentials.');
  }
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
