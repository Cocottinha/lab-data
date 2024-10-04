<script setup>
const posts = [
  {
    id: 1,
    title: "Vrau",
    description: "Vrau",
    date: new Date()
  },
  {
    id: 2,
    title: "Vrau",
    description: "Vrau",
    date: new Date()
  },
  {
    id: 3,
    title: "Vrau",
    description: "Vrau",
    date: new Date()
  },
  {
    id: 4,
    title: "Vrau",
    description: "Vrau",
    date: new Date()
  },
  {
    id: 5,
    title: "Vrau",
    description: "Vrau",
    date: new Date()
  },
  {
    id: 6,
    title: "Vrau",
    description: "Vrau",
    date: new Date()
  },
  {
    id: 7,
    title: "Vrau",
    description: "Vrau",
    date: new Date()
  }
]

</script>

<template>
  <div class="posts">
    <h1>This is a posts page</h1>
    <div class="grid">
      <div class="PostItem" v-for="item, itemIndex in posts" :key="itemIndex" @click="$router.push(`/post/${item.id}`)">        
        <img src="../assets/teste2.jpg" width="300px"/>
        <div class="info">
          <h2>{{ item.title }}</h2>
          <p>{{ item.description }}</p>
          <p>{{ item.date.toString().slice(4, 15)}}</p>
        </div>  
      </div>
    </div>
  </div>
</template>

<style lang="css">
.posts{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.grid{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 4%;
  margin-left: 150px;
  margin-right: 180px;
  gap: 80px;
  padding-left: 100px;
}
.PostItem {
  padding: 40px;
  width: 400px;
  height: 530px;
  cursor: pointer;
  gap: 20px;
  background-color: rgb(234, 234, 234)
}
.info{
  background-color: rgb(234, 234, 234);
  padding: 10px;
  h2{
    text-align: left;
    padding: 10px;
  }
  p{
    text-align: left;
    padding-left: 10px;
  }
}

</style>