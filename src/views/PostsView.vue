<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Import the useRouter hook

const posts = ref([]); // Initialize posts as a ref
const isLoading = ref(true); // Initialize loading state
const router = useRouter(); // Initialize the router

const checkImageExists = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl);
    return response.ok;
  } catch (error) {
    return false;
  }
};

const getPosts = async () => {
  try {
    const response = await axios.get("https://api.labmov.tec.br/api/projetos", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem("auth-token")}`
      }
    });

    // If response is not successful
    if (response.status !== 200) {
      throw new Error('Failed to fetch posts');
    }

    posts.value = response.data.Dados;

    for (const item of posts.value) {
      const imageUrl = `/files/ftp/${item.projeto_id}/${item.nome_imagem}${item.extensao_imagem}`;
      item.imageExists = await checkImageExists(imageUrl);
    }

  } catch (error) {
    console.error('Error fetching posts:', error);
    
    // If the status code is 401, redirect to login page
    if (error.response && error.response.status === 401) {
      alert("Unauthorized access. Redirecting to login page.");
      router.push('/login');
    }

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
        <img v-if="item.imageExists" :src="`/files/ftp/${item.projeto_id}/${item.nome_imagem}${item.extensao_imagem}`" width="80%" height="75%" class="imgCard"/>
        <img v-else src="/files/notfound.png" width="80%" height="75%" class="imgCard"/> <!-- Placeholder image -->
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
$bgColor: rgb(250 250 250);
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
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
}
.postItem {
  width: 320px;
  height: 400px;
  cursor: pointer;
  background-color: $bgColor;
  // background-color: aqua;
  transition: transform 0.3s;
  border-radius: 0px;
  -webkit-box-shadow: 3px 3px 9px 1px rgba(0,0,0,0.5);
-moz-box-shadow: 3px 3px 9px 1px rgba(0,0,0,0.5);
box-shadow: 3px 3px 9px 1px rgba(0,0,0,0.5);
}

.postItem:hover {
  transform: scale(1.1);
  background: -webkit-linear-gradient(360deg, var(--labcolor), #00f0ff);
  color: white;
  p{
    color: white;
  }
}
.info {
  padding-left: 5px;
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
