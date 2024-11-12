<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PontoAnalise from '@/components/PontoAnalise.vue';
import ComboBoxTecnicas from '@/components/ComboBoxTecnicas.vue'; // Assuming ComboBoxTecnicas.vue exists

export default {
  name: 'PostView',
  components: { PontoAnalise, ComboBoxTecnicas },
  setup() {
    const post = ref({});
    const filteredPosts = ref([]);
    const selectedOption = ref('Todas');
    const selectedPonto = ref(null);
    const isTecnicaListVisible = ref(false);
    const route = useRoute();
    const isLoading = ref(true);

    const getPost = async () => {
      try {
        const response = await axios.get(`${process.env.VUE_APP_APIPROJETOS}/${route.params.id}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
          }
        });
        post.value = response.data;
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      getPost();
    });

    const handlePontoClick = (pontoId) => {
      selectedPonto.value = pontoId;
      isTecnicaListVisible.value = true;
      setTimeout(() => {
        let windowElement = document.getElementById("hide");
        if (windowElement) {
          windowElement.style.display = "block";
        }
      }, 0);
    };

    const handleFilteredPostsChange = (newFilteredPosts) => {
      filteredPosts.value = newFilteredPosts;
      isTecnicaListVisible.value = false;
    };

    const handleSelectChange = (newSelectedOption) => {
      selectedOption.value = newSelectedOption;
    };

    return {
      post,
      filteredPosts,
      selectedOption,
      selectedPonto,
      isTecnicaListVisible,
      handlePontoClick,
      handleFilteredPostsChange,
      handleSelectChange,
      isLoading
    };
  }
};
</script>

<template>
  <div class="center">
    <div v-if="isLoading">Loading...</div>
    <div v-else class="Post">
      <div class="imgContainer">
        <img :src="`/files/ftp/${post.projeto_id}/${post.nome_imagem}${post.extensao_imagem}`" class="img"
          :width="`${post.largura_imagem}`" :height="`${post.altura_imagem}`" />
        <PontoAnalise v-for="ponto in post.pontos" :key="ponto.ponto_id" :IdPonto="ponto.ponto_id"
          :NomePonto="ponto.nome_ponto" :X="ponto.coordenada_x" :Y="ponto.coordenada_y" :largImg="post.largura_imagem"
          :altImg="post.altura_imagem" @click="handlePontoClick(ponto.ponto_id)" />
      </div>

      <div class="textContainer">
        <h1 class="title">{{ post.nome_projeto }}</h1>
        <div class="detail">
          <div class="detailText">
            <span class="detailTitle">Autor:</span>
            <span class="detailValue">{{ post.nome_autor }}</span>
          </div>
          <div class="detailText">
            <span class="detailTitle">Ano:</span>
            <span class="detailValue">{{ post.ano_obra }}</span>
          </div>
          <div class="detailText">
            <span class="detailTitle">Estilo:</span>
            <span class="detailValue">{{ post.estilo }}</span>
          </div>
        </div>

        <div class="contTop">
          <ComboBoxTecnicas :pontos="post.pontos" @setSortedPosts="handleFilteredPostsChange"
            @onSelectChange="handleSelectChange" />
          <div class="cont">
            <div class="row">
              <h2>Pontos:</h2>
              <div class="column">
                <ul>
                  <li
                    v-for="ponto in (filteredPosts.length > 0 ? filteredPosts : (selectedOption === 'Todas' ? post.pontos : []))"
                    :key="ponto.ponto_id" @click="handlePontoClick(ponto.ponto_id)"
                    :class="{ selected: selectedPonto === ponto.ponto_id }">
                    {{ ponto.nome_ponto }}
                  </li>
                </ul>
              </div>
            </div>
            <!-- /*arrumar*/ -->
            <div class="row" id="hide" v-show="isTecnicaListVisible">
              <h2>Técnicas:</h2>
              <div class="column">
                <ul>
                  <template
                    v-for="(tecnica, index) in post.pontos.find(ponto => ponto.ponto_id === selectedPonto)?.tecnicas || []">
                    <router-link :key="index" v-if="tecnica.nome_tecnica.startsWith('MO')"
                      :to="`/imagem/${post.projeto_id}-${tecnica.nome_tecnica}`" target="_blank">
                      <li>{{ tecnica.nome_tecnica }}</li>
                    </router-link>
                    <router-link :key="tecnica"
                      v-else-if="tecnica.nome_tecnica.startsWith('FTIR') || tecnica.nome_tecnica.startsWith('XRF') || selectedOption === 'Todas'"
                      :to="`/grafico/${post.projeto_id}-${tecnica.nome_tecnica}`" target="_blank">
                      <li>{{ tecnica.nome_tecnica }}</li>
                    </router-link>
                  </template>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.Post {
  display: flex;
  flex-direction: row;
  padding: 0px;
  gap: 50px;
  margin: 0 auto;
}

.imgContainer {
  position: relative;
  max-width: 1024px;
  margin: 0 auto;
  overflow: hidden;
}

.img {
  height: auto;
  width: 1024px;
  object-fit: contain;
  max-width: 100%;
  display: block;
}

.textContainer {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  width: 200px;
}

a {
  text-decoration: none;
  color: black
}

.title {
  font-size: 50px;
  text-align: left;
}

.detail {
  display: flex;
  gap: 20px;
}

.detailText {
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
}

.detailTitle {
  color: gray;
  font-weight: bold;
}

.detailValue {
  font-weight: 300;
}

.content {
  font-size: 20px;
  color: rgb(74, 74, 72);
}

.tecnicas {
  padding: 5px;
}

.row {
  padding: 5px;
}

.cont {
  display: flex;
  flex-direction: row;
  text-align: left
}

.contTop {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
}

.column ul {
  list-style-type: none;
}

.column li {
  padding: 3px;
  font-size: 20px;
  text-decoration: none;
}

.column li:hover {
  background: linear-gradient(90deg, var(--labcolor) 0%, rgba(0, 212, 255, 1) 100%);
  color: white;
  cursor: pointer;

  a {
    color: white;
  }
}

.column:first-child {
  width: 150px;
  padding: 15px;
  overflow-y: auto;
  max-height: 400px;
}

.column {
  width: 150px;
  padding: 0;
  overflow-y: auto;
  max-height: 400px;
}

.column::-webkit-scrollbar {
  width: 10px;
}

.column::-webkit-scrollbar-track {
  box-shadow: inset 0 0 3px grey;
  border-radius: 0;
}

.column::-webkit-scrollbar-thumb {
  background: linear-gradient(0deg, var(--labcolor) 0%, rgba(0, 212, 255, 1) 100%);
  border-radius: 0;
}

.selected {
  background: linear-gradient(90deg, grey 0%, white 110%);
  color: white;
  font-weight: bold;
}

@media (max-width: 1669px) {
  .Post {
    width: 1280px;
  }

  .imgContainer {}
}

@media (max-width: 1536px) {
  .Post {
    width: 1200px;
  }

  .imgContainer {}
}

@media (max-width: 1367px) {
  .Post {
    width: 1150px;
  }
}

@media (max-width: 1260px) {
  .Post {
    flex-direction: column;
    width: 1024px;
  }
}

@media (max-width: 1024px) {
  .Post {
    width: 768px;
  }

  .imgContainer {
    width: 728px;
  }
}

@media (max-width: 768px) {
  .imgContainer {
    width: 600px;
  }
}

@media (max-width: 640px) {
  .imgContainer {
    width: 435px;
  }
}

@media (max-width: 476px) {
  .imgContainer {
    width: 340px;
  }
}
</style>
