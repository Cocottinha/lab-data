<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const a = "53|djNQxyOqT1oCthp2tjA980k3rlDQId5wtFfjbLT92720cd15";

const posts = ref([]); // Initialize posts as a ref
const isLoading = ref(true); // Initialize loading state

const getPosts = async () => {
  try {
    const response = await axios.get("https://api.labmov.tec.br/api/projetos", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${a}`
      }
    });
    if (response.status !== 200) {
      throw new Error('Failed to fetch posts');
    }
    posts.value = response.data.Dados;
  } catch (error) {
    console.error('Error fetching posts:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  getPosts();
});

function formatDateToBrazilian(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
}
</script>

<template>
  <div class="posts">
    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-else class="grid">
      <div class="postItem" v-for="item in posts" :key="item.projeto_id" @click="$router.push(`/post/${item.projeto_id}`)">        
        <img src="../assets/andrerindo.jpg" width="80%" height="75%" class="imgCard"/>
        <div class="info">
          <h2>{{ item.nome_projeto }}</h2>
          <p>{{ item.nome_autor }}</p>
          <p>{{ formatDateToBrazilian(item.created_at) }}</p>
        </div>  
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$bgColor: rgb(248 250 252);
.posts {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.loading {
  text-align: center;
  font-size: 20px;
  margin: 20px; /* Add margin for aesthetics */
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 4%;
  margin-left: 100px;
  margin-right: 180px;
  gap: 50px;
  padding-left: 100px;
  margin-bottom: 50px;
}
.imgCard {
  width: 320px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}
.postItem {
  width: 320px;
  height: 400px;
  cursor: pointer;
  background-color: $bgColor;
  transition: transform 0.3s;
  border-radius: 10px;
  -webkit-box-shadow: 7px 7px 22px -7px rgba(0,0,0,0.75);
  -moz-box-shadow: 7px 7px 22px -7px rgba(0,0,0,0.75);
  box-shadow: 7px 7px 10px -7px rgba(0,0,0,0.75);
}
.postItem:hover {
  transform: scale(1.1);
}
.info {
  padding: 0;
  margin-bottom: 5px;
  h2 {
    text-align: left;
    padding: 8px 0 5px 10px;
  }
  p {
    text-align: left;
    padding-left: 11px;
    padding-bottom: 0;
  }
}
</style>
