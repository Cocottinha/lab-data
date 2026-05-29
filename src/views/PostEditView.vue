<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

const projetoId = route.params.id;
const projeto = ref({
  nome_projeto: '',
  nome_autor: '',
  ano_obra: '',
  estilo: '',
  tecnica: '',
  equipe: ''
});

// Criamos estados para armazenar as coleções complexas vindas do banco
const pontos = ref([]);
const tipoAnalises = ref([]);

const isLoading = ref(true);
const isSaving = ref(false);

const fetchProjeto = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(`${process.env.VUE_APP_APIPROJETOS}/${projetoId}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
      }
    });
    
    if (response.status === 200) {
      // Se o backend usar API Resource, os dados vêm em response.data.data. 
      // Caso contrário, vêm direto em response.data. Essa linha resolve ambos os casos:
      const dados = response.data.data ? response.data.data : response.data; 
      
      // Mapeia os dados gerais do projeto
      projeto.value = {
        nome_projeto: dados.nome_projeto || '',
        nome_autor: dados.nome_autor || '',
        ano_obra: dados.ano_obra || '',
        estilo: dados.estilo || '',
        tecnica: dados.tecnica || '',
        equipe: dados.equipe || ''
      };

      // Alimenta os arrays de pontos e análises estruturados pelo backend
      pontos.value = dados.pontos || [];
      tipoAnalises.value = dados.tipo_analises || [];
    }
  } catch (error) {
    console.error('Erro ao carregar o projeto:', error);
    alert('Não foi possível carregar os dados deste projeto.');
  } finally {
    isLoading.value = false;
  }
};

const handleUpdate = async () => {
  isSaving.value = true;
  try {
    // Montamos o payload contendo os dados do projeto e as estruturas alteradas
    const payload = {
      ...projeto.value,
      pontos: pontos.value,
      tipo_analises: tipoAnalises.value
    };

    const response = await axios.put(
      `${process.env.VUE_APP_APIPROJETOS}/${projetoId}`,
      payload,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
        }
      }
    );

    if (response.status === 200) {
      alert('Projeto e suas análises atualizados com sucesso!');
      router.push('/posts');
    }
  } catch (error) {
    console.error('Erro detalhado do servidor:', error);
    
    // Se o backend retornou o nosso objeto de erro customizado
    if (error.response && error.response.data && error.response.data.erro_real) {
      alert(`Erro no Backend:\n${error.response.data.erro_real}\nNo arquivo: ${error.response.data.arquivo} (Linha ${error.response.data.linha})`);
    } else {
      alert('Erro ao salvar as alterações do projeto. Tente novamente.');
    }
  } finally {
    isSaving.value = false;
  }
};

onMounted(() => {
  fetchProjeto();
});
</script>

<template>
  <div class="edit-container">
    <div v-if="isLoading" class="loading">Carregando dados estruturados do projeto...</div>
    
    <div v-else class="wrapper-edit">
      <h1>Editar Projeto (ID: {{ projetoId }}) ({{ projeto.nome_projeto }})</h1>
      
      <form @submit.prevent="handleUpdate" class="main-form">
        
        <fieldset class="section-card">
          <legend>Dados Gerais da Obra</legend>
          <div class="form-grid">
            <div class="form-group">
              <label for="nome_projeto">Nome da Obra:</label>
              <input type="text" id="nome_projeto" v-model="projeto.nome_projeto" required>
            </div>
            <div class="form-group">
              <label for="nome_autor">Nome do Autor:</label>
              <input type="text" id="nome_autor" v-model="projeto.nome_autor">
            </div>
            <div class="form-group">
              <label for="ano_obra">Ano da Obra:</label>
              <input type="text" id="ano_obra" v-model="projeto.ano_obra">
            </div>
            <div class="form-group">
              <label for="estilo">Estilo:</label>
              <input type="text" id="estilo" v-model="projeto.estilo">
            </div>
            <div class="form-group">
              <label for="tecnica">Técnica Geral:</label>
              <input type="text" id="tecnica" v-model="projeto.tecnica">
            </div>
            <div class="form-group">
              <label for="equipe">Equipe:</label>
              <input type="text" id="equipe" v-model="projeto.equipe">
            </div>
          </div>
        </fieldset>

        <fieldset class="section-card" v-if="pontos.length > 0">
          <legend>Pontos de Amostragem e Técnicas Relacionadas</legend>
          
          <div v-for="ponto in pontos" :key="ponto.ponto_id" class="ponto-block">
            <div class="ponto-header">
              <h3>{{ ponto.nome_ponto }} </h3>
            </div>
            
            <div class="tecnicas-container">
              <div v-for="tec in ponto.tecnicas" :key="tec.tecnica_id" class="tecnica-card">
              
                <div class="tecnica-title">
                  <span class="badge">{{ tec.$type }}</span>
                  <strong>{{ tec.nome_tecnica }}</strong>
                </div>  
                <div class="tecnica-fields">
                  <div class="form-group-sub" v-if="tec.tempo !== undefined">
                    <label>Tempo:</label>
                    <input type="number" v-model="tec.tempo">
                  </div>
                  <div class="form-group-sub" v-if="tec.tensao !== undefined">
                    <label>Tensão:</label>
                    <input type="number" v-model="tec.tensao">
                  </div>
                  <div class="form-group-sub" v-if="tec.corrente !== undefined">
                    <label>Corrente:</label>
                    <input type="number" v-model="tec.corrente">
                  </div>
                  <div class="form-group-sub" v-if="tec.aumento !== undefined">
                    <label>Aumento:</label>
                    <input type="number" v-model="tec.aumento">
                  </div>
                  <div class="form-group-sub" v-if="tec.objetiva !== undefined">
                    <label>Objetiva:</label>
                    <input type="number" v-model="tec.objetiva">
                  </div>
                  <div class="form-group-sub" v-if="tec.colimador !== undefined">
                    <label>Colimador:</label>
                    <input type="number" v-model="tec.colimador">
                  </div>
                  <div class="form-group-sub" v-if="tec.tonalidade !== undefined">
                    <label>Tonalidade:</label>
                    <input type="text" v-model="tec.tonalidade">
                  </div>
                  <div class="form-group-sub" v-if="tec.intervalo !== undefined">
                    <label>Intervalo:</label>
                    <input type="number" v-model="tec.intervalo">
                  </div>
                  <div class="form-group-sub" v-if="tec.resolucao !== undefined">
                    <label>Resolução:</label>
                    <input type="number" v-model="tec.resolucao">
                  </div>
                  {{ console.log(tec.$type) }}
                 <div v-if="tec.$type === 'MO'" class="aumentos-container">
                    <div v-for="(img, index) in (tec.imagensEAumentos || tec.aumentos || [])" :key="index"
                      class="aumento-row">

                      <div class="inputs-inline-group">
                        <div class="form-group-sub short-input">
                          <label>Aumento:</label>
                          <input type="text" v-model="img.aumento" placeholder="Ex: 100x, 500x">
                        </div>

                        <div class="form-group-sub long-input">
                          <label>Diretório da Imagem:</label>
                          <input type="text" v-model="img.diretorio">
                        </div>
                      </div>

                      <div class="aumento-actions">
                        <router-link class="btn-imagem" v-if="tec.nome_tecnica.startsWith('MO')"
                          :to="`/imagem/${projetoId}-${tec.nome_tecnica}`" target="_blank">
                          Exibir Imagem
                        </router-link>
                      </div>

                    </div>
                  </div>
                  <div class="form-group-sub full-width">
                    <label>Comentário:</label>
                    <textarea v-model="tec.comentario" rows="2" placeholder="Notas sobre a análise..."></textarea>
                  </div>
                  <div class="form-group-sub full-width">
                    <label>Resultados:</label>
                    <textarea v-model="tec.resultado" rows="2" placeholder="Notas sobre a análise..."></textarea>
                  </div>
                  <router-link class="btn-grafico" :key="tec.nome_tecnica"
                      v-if="tec.nome_tecnica.startsWith('FTIR') || tec.nome_tecnica.startsWith('XRF') || selectedOption === 'Todas'"
                      :to="`/grafico/${projetoId}-${tec.nome_tecnica}`" target="_blank">
                      <li>Exibir Gráfico</li>
                    </router-link>
                </div>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset class="section-card" v-if="tipoAnalises.length > 0">
          <legend>Configuração de Tipos de Análises</legend>
          
          <div v-for="tipo in tipoAnalises" :key="tipo.Id_tipo_analise" class="tipo-analise-block">
            <h4>Grupo de Análise #{{ tipo.Id_tipo_analise }}</h4>
            
            <div v-if="tipo.analises.length === 0" class="no-data">
              Nenhuma análise (Radiografia, Mapa, IRR ou Hiperespectral) vinculada a este grupo.
            </div>
            
            <div v-else class="sub-analises-grid">
              <div v-for="analise in tipo.analises" :key="analise.Analise_id" class="analise-item-card">
                <div class="analise-item-header">
                  <span class="badge-blue">{{ analise.$type }}</span>
                  <input type="text" v-model="analise.nome" class="input-inline">
                </div>
                
                <label>Descrição:</label>
                <textarea v-model="analise.descricao" rows="2"></textarea>

                <label>Parâmetros:</label>
                <input type="text" v-model="analise.parametros">
              </div>
              <router-link class="btn-grafico" v-for="item in tipo.analises" 
                    :key="item.id_analise" @click="handleAnaliseClick(item.id_analise)"
                    
                    :to="`/analise/${projetoId}-${item.nome}-${tipo.Id_tipo_analise}-${item.id_analise}`" target="_blank">
                    <li>Exibir Análise</li>
                      
                  </router-link >
            </div>
          </div>
        </fieldset>

        <div class="actions">
          <button type="button" class="btn-cancel" @click="router.push('/posts')" :disabled="isSaving">
            Cancelar
          </button>
          <button type="submit" class="btn-save" :disabled="isSaving">
            {{ isSaving ? 'Salvando tudo...' : 'Salvar Alterações' }}
          </button>
        </div>
      </form>
    </div> </div> </template>
<style lang="scss" scoped>
$bgColor: #f4f6f9;
$cardBg: #ffffff;
$primaryColor: #0056b3;
.btn-grafico {
  text-decoration: none;
  color: $primaryColor;
  font-weight: 600;
  &:hover { background-color: $primaryColor; color: white; }
  transition: all 0.3s ease;
  list-style-type: none;
  padding: 8px 12px;
  border: 1px solid $primaryColor;
  border-radius: 4px;
  margin-top: 10px;
}
.inputs-inline-group {
  display: flex;
  gap: 15px;
  width: 100%;
}

.short-input {
  width: 25%; // Define um tamanho fixo menor para o aumento
}

.long-input {
  width: 75%; // O diretório ganha a maior parte do espaço
}

.aumento-actions {
  display: flex;
  justify-content: flex-start; // Alinha o botão à esquerda (ou 'flex-end' se preferir à direita)
  margin-top: 5px;
}

.btn-imagem {
  display: inline-block;
  text-decoration: none;
  color: $primaryColor;
  font-weight: 600;
  padding: 8px 16px;
  border: 1px solid $primaryColor;
  border-radius: 4px;
  background-color: transparent;
  transition: all 0.3s ease;
  font-size: 14px;
  text-align: center;

  &:hover {
    background-color: $primaryColor;
    color: white;
  }
}
.edit-container {
  background-color: $bgColor;
  min-height: 100vh;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  border-radius: 12px;
  margin-bottom: 20px;
}
.aumento-row {
  display: flex;
  flex-direction: column; // Faz os inputs ficarem em cima e as ações embaixo
  gap: 12px;
  background: #ffffff;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #e1e8ed;
  margin-bottom: 15px;
}
.analise-item-header{
  gap: 10px;
  display: flex;
  align-items: center;
}
.wrapper-edit {
  width: 100%;
  max-width: 1000px;
  
  h1 {
    font-size: 26px;
    color: #2c3e50;
    margin-bottom: 30px;
    text-align: center;
  }
}

.main-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
 textarea{
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 6px;
  text-indent: 10px;
  padding: 4px;
 }
.section-card {
  background: $cardBg;
  border: none;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  
  legend {
    font-weight: bold;
    font-size: 18px;
    color: #2c3e50;
    padding: 0 10px;
  }
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-size: 14px;
    font-weight: 600;
    color: #555;
  }

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 15px;
    &:focus { outline: none; border-color: $primaryColor; }
  }
}

/* Estilos dos Pontos e Técnicas */
.ponto-block {
  border-left: 4px solid $primaryColor;
  background: #fafbfc;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 0 8px 8px 0;
}

.input-inline-header {
  font-size: 18px;
  font-weight: bold;
  border: none;
  background: transparent;
  border-bottom: 1px dashed #ccc;
  color: #2c3e50;
  &:focus { outline: none; border-bottom-color: $primaryColor; }
}

.tecnicas-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;
}

.tecnica-card {
  background: #fff;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  padding: 15px;
}

.tecnica-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.badge {
  background: #e1f5fe;
  color: #0288d1;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.tecnica-fields {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.form-group-sub {
  display: flex;
  flex-direction: column;
  gap: 3px;
  label { font-size: 12px; color: #777; font-weight: 600;}
  input { padding: 6px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;}
}

.full-width {
  grid-column: span 4;
  height: auto;
}

/* Seção de Tipos de Análises */
.tipo-analise-block {
  margin-bottom: 25px;
  h4 { color: #7f8c8d; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;}
}

.sub-analises-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.analise-item-card {
  background: #f8f9fa;
  border: 1px solid #eaeded;
  padding: 15px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  
  label { font-size: 12px; font-weight: bold; margin-top: 5px; color: #666; }
  input, textarea { padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; }
}

.badge-blue {
  background: #e8f5e9;
  color: #2e7d32;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.input-inline {
  font-weight: bold;
  border: none;
  background: transparent;
  border-bottom: 1px dashed #ccc;
  width: 70%;
  &:focus { outline: none; border-bottom-color: #2e7d32; }
}

.no-data { font-size: 13px; color: #999; font-style: italic; }

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 10px;
}

button {
  padding: 12px 30px;
  font-size: 16px;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  font-weight: 600;

  &:disabled { opacity: 0.5; cursor: not-allowed; }
}

.btn-cancel { background-color: #e0e0e0; color: #333; }
.btn-save { background-color: $primaryColor; color: white; }

textarea { resize: vertical; }

@media (max-width: 768px) {
  .form-grid, .sub-analises-grid { grid-template-columns: 1fr; }
  .tecnica-fields { grid-template-columns: repeat(2, 1fr); }
  .full-width { grid-column: span 2; }
}
</style>