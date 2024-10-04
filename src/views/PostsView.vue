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
    <div class="grid">
      <div class="PostItem" v-for="item, itemIndex in posts" :key="itemIndex" @click="$router.push(`/post/${item.id}`)">        
        <img src="../assets/validar.png" width="80%" height="75%" class="imgCard"/>
        <div class="info">
          <h2>{{ item.title }}</h2>
          <p>{{ item.description }}</p>
          <p>{{ item.date.toString().slice(4, 15)}}</p>
        </div>  
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.posts{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.grid{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  margin: 4%;
  margin-left: 100px;
  margin-right: 180px;
  gap: 80px;
  padding-left: 110px;
}
.imgCard{
  width: 320px;
  object-fit: cover;
  border-radius: 10px;
}
.PostItem {
  padding: 20px;
  width: 400px;
  height: 530px;
  cursor: pointer;
  background-color: rgb(234, 234, 234);
  transition: transform 0.3s;
  border-radius: 10px;
}
.PostItem:hover{
  transform: scale(1.1);
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