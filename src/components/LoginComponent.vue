<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
          />
        </div>
        <button type="submit">Login</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'LoginComponent',
    setup() {
      const username = ref('');
      const password = ref('');
      const errorMessage = ref('');
  
      const handleLogin = () => {
        // Reset error message
        errorMessage.value = '';
  
        // Basic validation (you can expand this logic)
        if (username.value === 'admin' && password.value === 'password') {
          alert('Login successful!');
        } else {
          errorMessage.value = 'Invalid username or password.';
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
  