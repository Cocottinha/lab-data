<template>
    <div id="app">
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
  /* Add global styles if needed */
  </style>
  