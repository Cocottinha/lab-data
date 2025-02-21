<script setup>
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router'; // Import the useRouter hook

const posts = ref([]);
const currentPage = ref(1);
const lastPage = ref(1);
const isLoading = ref(true);
const searchQuery = ref('');
const sortOption = ref('');
const perPage = ref(10); // Default items per page
const router = useRouter();

const checkImageExists = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl);
    return response.ok;
  } catch (error) {
    return false;
  }
};

const getPosts = async (page = 1, query = '', sort = '') => {
  isLoading.value = true;
  try {
    const response = await axios.get(
      `${process.env.VUE_APP_APIPROJETOS}?page=${page}&search=${query}&sort=${sort}&perPage=${perPage.value}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${localStorage.getItem("auth-token")}`,
        }
      }
    );

    if (response.status !== 200) {
      throw new Error('Failed to fetch posts');
    }

    posts.value = response.data.Dados.data;
    currentPage.value = response.data.Dados.current_page;
    lastPage.value = response.data.Dados.last_page;

    for (const item of posts.value) {
      const imageUrl = `/files/ftp/${item.projeto_id}/${item.nome_imagem}${item.extensao_imagem}`;
      item.imageExists = await checkImageExists(imageUrl);
    }
  } catch (error) {
    console.error('Error fetching posts:', error);

    if (error.response && error.response.status === 401) {
      alert("Unauthorized access. Redirecting to login page.");
      router.push('/login');
    }
  } finally {
    isLoading.value = false;
  }
};

const searchPosts = () => {
  const query = searchQuery.value.trim();
  getPosts(1, query || '', sortOption.value);
};

const nextPage = () => {
  if (currentPage.value < lastPage.value) {
    getPosts(currentPage.value + 1, searchQuery.value, sortOption.value);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    getPosts(currentPage.value - 1, searchQuery.value, sortOption.value);
  }
};

const updatePost = async (item) => {
  try {
    const response = await axios.put(
      `${process.env.VUE_APP_APIPROJETOS}/${item.projeto_id}`,
      {
        nome_projeto: item.nome_projeto,
        nome_autor: item.nome_autor,
        ano_obra: item.ano_obra,
        estilo: item.estilo,
        tecnica: item.tecnica,
        equipe: item.equipe,
      },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${localStorage.getItem("auth-token")}`,
        },
      }
    );

    if (response.status === 200) {
      alert('Projeto atualizado com sucesso!');
    }
  } catch (error) {
    console.error('Erro ao atualizar projeto:', error);
    alert('Erro ao atualizar projeto. Tente novamente.');
  }
};

onMounted(() => {
  getPosts();
});

watch(perPage, () => {
  getPosts(1, searchQuery.value, sortOption.value); // Reset to the first page when perPage changes
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
    <div class="search-bar">
      <div class="tabela">
        <div class="pesquisa">
          <input type="text" v-model="searchQuery" placeholder="Buscar projetos..." @keyup.enter="searchPosts" />
          <button @click="searchPosts">Buscar</button>
        </div>

        <div class="ordenar">
          <div class="vrau">
            <label>Ordernar por:</label>
            <select v-model="sortOption" @change="searchPosts">
              <option value="">Nenhum</option>
              <option value="date_asc">Data (Antiga → Nova)</option>
              <option value="date_desc">Data (Nova → Antiga)</option>
              <option value="name_asc">Nome (A → Z)</option>
              <option value="name_desc">Nome (Z → A)</option>
            </select>
          </div>
          <div class="vrau">
            <label>Itens por página:</label>
            <select v-model="perPage">
              <option :value="10">10</option>
              <option :value="15">15</option>
              <option :value="30">30</option>
              <option :value="50">50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="isLoading" class="loading">Loading...</div>
  <div v-else class="grid">
    <div class="postItem" v-for="item in posts" :key="item.projeto_id">
      <img v-if="item.imageExists" :src="`/files/ftp/${item.projeto_id}/${item.nome_imagem}${item.extensao_imagem}`"
        width="80%" height="75%" class="imgCard" :title="`${item.nome_projeto}`" />
      <img v-else src="/files/notfound.png" width="80%" height="75%" class="imgCard" />
      <form @submit.prevent="updatePost(item)" class="info">
          <label for="nome_projeto">Nome Obra:</label>
          <input type="text" v-model="item.nome_projeto">

          <label for="nome_autor">Nome Autor:</label>
          <input type="text" v-model="item.nome_autor">

          <label for="ano_obra">Ano:</label>
          <input type="text" v-model="item.ano_obra">

          <label for="estilo">Estilo:</label>
          <input type="text" v-model="item.estilo">
          

          <label for="tecnica">Técnica:</label>
          <input type="text" v-model="item.tecnica">

          <label for="equipe">Equipe:</label>
          <input type="text" v-model="item.equipe">
          <label>Data: </label>
          <div class="data">
            {{ formatDateToBrazilian(item.created_at) }}
          </div>

          
          <div>
          </div>

          <button type="submit">Atualizar</button>
      </form>
      <hr>
    </div>
  </div>

  <div class="pagination" v-if="!isLoading">
    <button :disabled="currentPage === 1" @click="prevPage">Anterior</button>
    <span>Página {{ currentPage }} de {{ lastPage }}</span>
    <button :disabled="currentPage === lastPage" @click="nextPage">Próxima</button>
  </div>

</template>


<style lang="scss" scoped>
$bgColor: rgb(250 250 250);

.pesquisa {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
}

.vrau {
  overflow: visible;
  white-space: wrap;

  label {
    padding: 5px;
  }
}

.ordenar {
  gap: 10px;
  display: flex;
  justify-content: center;
}

.tabela {
  label {
    padding: 5px;
  }

  padding: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
}
hr{
  margin-top: 30px;
  margin-bottom: 0px;
}

.search-bar {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.search-bar label {
  padding: 12px;
}

.search-bar input {
  width: 300px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  min-height: 44px;
}

.search-bar select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  min-width: 120px;
  cursor: pointer;
}

.search-bar select:hover {
  border-color: #0056b3;
}

.search-bar button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #bbbaba;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  min-height: 44px;
}

.search-bar button:hover {
  background-color: #0056b3;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 40px;
  gap: 10px;
}

span {
  padding: 5px;
}

button {
  cursor: pointer;
  padding: 0px;

  border-radius: 20px;
  border: none;
  padding: 5px;
}

button:hover {
  background: -webkit-linear-gradient(360deg, var(--labcolor), #00f0ff);
  color: white;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.posts {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.loading {
  text-align: center;
  font-size: 20px;
  margin: 20px;
  /* Add margin for aesthetics */
}

.grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  margin-top: 4%;
  gap: 35px;
  padding-left: 0px;
  margin-bottom: 50px;

}

.imgCard {
  width: 200px;
  height: 210px;
  object-fit: cover;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  float: left;
  border-radius: 20px;
}

.postItem {
  width: 100%;
  height: 220px;
  border-radius: 0px;
  
}

.info {
  padding-left: 5px;
  margin-bottom: 5px;
  padding-right: 20px;
  margin-top: 5px;

  font-size: 14px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);

  button{
    width: 100%;
    height: 30px;
    margin: 5px;
  }

  .data{
    margin-top: 15px;
  }

  label {
    text-align: left;
    padding-top: 15px;
  }

  input {
    font-size: 14px;
    padding: 5px;
    margin-top: 10px;
    border: 0.1px solid #ccc;
    border-radius: 5px;
  }

  gap: 15px;
}


@media (max-width: 1700px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1176px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .tabela {
    display: flex;
    flex-direction: column;
    width: 80%;
  }
}

@media (max-width: 840px) {
  .grid {
    place-items: center;
    padding-left: 0px;
    grid-template-columns: repeat(1, 1fr);
  }
}

@media (max-width: 616px) {
  .ordenar {
    flex-direction: column;
  }
}

@media (max-width: 540px) {
  .tabela {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 320px;
  }

  .vrau {
    max-width: 320px;
  }

  .ordenar {
    max-width: 320px;
  }

  .search-bar {
    justify-content: center;
  }
}

@media (max-width: 420px) {
  .imgCard {
    width: 260px;
  }

  label {
    padding: 0px;
  }

  .search-bar {
    display: flex;
    flex-direction: row;
    justify-content: center;

    select,
    input,
    button {
      width: 212px;
    }
  }

  .vrau {
    width: 212px;
  }

  .pesquisa {
    flex-direction: column;

    input {
      width: 212px;
    }

    button {
      width: 212px;
    }
  }

  .tabela {
    padding: 0px;
  }

  .postItem {
    width: 260px;
  }
}
</style>
