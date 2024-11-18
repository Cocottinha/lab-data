<template>
    <div class="main">
      <CAccoauntComponent />
    </div>
  </template>
  
  <script>
  import CAccoauntComponent from '@/components/CAccoauntComponent.vue';
  
  export default {
    name: 'CreateView',
    components: {
        CAccoauntComponent,
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
  