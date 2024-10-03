<template>
  <div class="posts">
    <h1>This is a posts page</h1>
     <div class="PostItem" v-for="item, itemIndex in posts" :key="itemIndex" @click="$router.push(`/post/${item.id}`)">
        {{item}}
     </div>
  </div>
</template>

<script setup>
 const posts = [
  {
    id:1,
    title: "Vrau",
    description: "Vrau",
    date: new Date()
  },
  {
    id:2,
    title: "Vrau",
    description: "Vrau",
    date: new Date()
  }
 ]
 
</script>

<style lang="css">

</style>