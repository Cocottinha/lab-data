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

function formatDateToBrazilian(date) {
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
}
</script>

<template>
  <div class="posts">
    <div class="grid">
      <div class="PostItem" v-for="item, itemIndex in posts" :key="itemIndex" @click="$router.push(`/post/${item.id}`)">        
        <img src="../assets/validar.png" width="80%" height="75%" class="imgCard"/>
        <div class="info">
          <h2>{{ item.title }}</h2>
          <p>{{ item.description }}</p>
          <p>{{ formatDateToBrazilian(item.date) }}</p>
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
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(1fr);
  margin-top: 4%;
  margin-left: 100px;
  margin-right: 180px;
  gap: 50px;
  padding-left: 100px;
  margin-bottom: 50px
}
.imgCard{
  width: 320px;
  object-fit: cover;
  border-radius:  10px 10px 0 0;
  margin-top: 0px;
}
.PostItem {
  padding: 0px;
  width: 320px;
  height: 400px;
  cursor: pointer;
  background-color: rgb(234, 234, 234);
  transition: transform 0.3s;
  border-radius:  10px;
}
.PostItem:hover{
  transform: scale(1.1);
}
.info{
  background-color: rgb(234, 234, 234);
  padding: 0px;
  margin-bottom: 5px;
  h2{
    text-align: left;
    padding: 5px 0px 5px 10px;
  }
  p{
    text-align: left;
    padding-left: 11px;
    padding-bottom: 0px
  }
}

</style>