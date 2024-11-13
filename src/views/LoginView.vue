<template>
    <div class="main">
      <LoginComponent />
    </div>
  </template>
  
  <script>
  import LoginComponent from '@/components/LoginComponent.vue';
  
  export default {
    name: 'LoginView',
    components: {
        LoginComponent,
    },
  };
  </script>
  
  <style>
    .main{
      display: flex;
      place-items: center;
      margin: 0 auto;
    }

  </style>
  