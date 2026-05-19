<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

// Estados do componente
const tags = ref([]);
const usuarios = ref([]);
const projetos = ref([]);
const isLoading = ref(false);

// Estado para criação de nova tag
const novaTagNome = ref('');

// Estado da tag que está sendo editada/gerenciada no momento
const tagSelecionada = ref(null);
const usuariosSelecionados = ref([]);
const projetosSelecionados = ref([]);

// Busca os dados iniciais do banco
const carregarDados = async () => {
  isLoading.value = true;
  try {
    const token = localStorage.getItem("auth-token");
    const headers = { 'Authorization': `Bearer ${token}` };
    
    // Pega a URL base do seu arquivo .env
    const baseUrl = process.env.VUE_APP_API_URL;

    // Faz as requisições apontando para a URL do servidor dinamicamente
    const [resTags, resUsuarios, resProjetos] = await Promise.all([
      axios.get(`${baseUrl}/tags`, { headers }),
      axios.get(`${baseUrl}/usuarios`, { headers }),
      axios.get(`${baseUrl}/projetos2`, { headers })
    ]);

    tags.value = resTags.data.Dados || resTags.data;
    usuarios.value = resUsuarios.data.Dados || resUsuarios.data;
    projetos.value = resProjetos.data.Dados || resProjetos.data;
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    alert('Erro ao carregar dados do servidor.');
  } finally {
    isLoading.value = false;
  }
};

// Cria uma nova tag vazia
const criarTag = async () => {
  if (!novaTagNome.value.trim()) return;
  try {
    const token = localStorage.getItem("auth-token");
    // eslint-disable-next-line no-unused-vars
    const response = await axios.post(`${process.env.VUE_APP_API_URL}/tags`, 
      { name: novaTagNome.value },
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    
    novaTagNome.value = '';
    alert('Tag criada com sucesso!');
    carregarDados(); // Recarrega a lista
  } catch (error) {
    console.error(error);
    alert('Erro ao criar tag.');
  }
};

// Abre o painel de gerenciamento da tag selecionada
// Abre o painel de gerenciamento da tag selecionada
const abrirGerenciamento = (tag) => {
  tagSelecionada.value = tag;
  
  // 1. Mapeia os usuários vinculados (id)
  const listaUsuarios = tag.users || tag.usuarios || [];
  usuariosSelecionados.value = listaUsuarios.map(u => u.id);
  
  // 2. Mapeia os projetos vinculados (Varre todas as possibilidades de ID)
  const listaProjetos = tag.projetos || tag.projects || [];
  
  projetosSelecionados.value = listaProjetos.map(p => {
    // Caso o ID esteja direto no objeto principal do projeto
    if (p.projeto_id) return p.projeto_id;
    if (p.id) return p.id;
    
    // Caso o Laravel tenha jogado os IDs para dentro do objeto 'pivot'
    if (p.pivot) {
      if (p.pivot.projeto_id) return p.pivot.projeto_id;
      if (p.pivot.id) return p.pivot.id;
    }
    
    return null;
  }).filter(id => id !== null); // Remove qualquer valor nulo por segurança

  // LOG DE DEPURAÇÃO: Abra o console (F12) no navegador ao clicar na tag
  // para vermos exatamente o que o Laravel está entregando!
  console.log("Projetos que o Vue marcou como selecionados:", projetosSelecionados.value);
};

// Salva os vínculos de usuários e projetos no Laravel
const salvarVinculos = async () => {
  if (!tagSelecionada.value) return;
  isLoading.value = true;
  
  try {
    const token = localStorage.getItem("auth-token");
    const headers = { 'Authorization': `Bearer ${token}` };

    // Envia os IDs selecionados para a rota de vínculo da Tag
    await axios.post(`${process.env.VUE_APP_API_URL}/tags/${tagSelecionada.value.id}/vincular`, {
      usuarios: usuariosSelecionados.value,
      projetos: projetosSelecionados.value
    }, { headers });

    alert('Vínculos atualizados com sucesso!');
    tagSelecionada.value = null; // Fecha o painel
    carregarDados(); // Atualiza a lista geral
  } catch (error) {
    console.error(error);
    alert('Erro ao salvar vínculos.');
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  carregarDados();
});
</script>

<template>
  <div class="gerenciador-container">
    <h2>Gerenciamento de Tags e Permissões</h2>

    <div class="card nova-tag">
      <h3>Criar Nova Tag</h3>
      <div class="input-group">
        <input v-model="novaTagNome" type="text" placeholder="Nome da tag (Ex: Laboratório B)" @keyup.enter="criarTag" />
        <button @click="criarTag">Criar Tag</button>
      </div>
    </div>

    <div v-if="isLoading" class="loading">Processando...</div>

    <div v-else class="painel-flex">
      <div class="card lista-tags">
        <h3>Tags Ativas</h3>
        <ul>
          <li v-for="tag in tags" :key="tag.id" :class="{ ativo: tagSelecionada?.id === tag.id }" @click="abrirGerenciamento(tag)">
  <div>
    <strong>{{ tag.name }}</strong>
    <br />
    <small class="contador-tags">
      ({{ tag.users?.length || 0 }} Usuários | {{ tag.projetos?.length || 0 }} Projetos)
    </small>
  </div>
  <small class="seta-gerenciar">➔ Gerenciar</small>
</li>
        </ul>
      </div>

      <div v-if="tagSelecionada" class="card painel-vinculo">
        <h3>Gerenciando Tag: <span class="tag-destaque">{{ tagSelecionada.name }}</span></h3>
        
        <div class="listas-selecao">
          <div class="coluna-selecao">
            <h4>Aderir Usuários (Pesquisadores)</h4>
            <div class="checkbox-group">
              <label v-for="user in usuarios" :key="user.id" class="checkbox-item">
                <input type="checkbox" :value="user.id" v-model="usuariosSelecionados" />
                {{ user.name }} ({{ user.user_type }})
              </label>
            </div>
          </div>

          <div class="coluna-selecao">
            <h4>Aderir Projetos</h4>
            <div class="checkbox-group">
              <label v-for="proj in projetos" :key="proj.projeto_id || proj.id" class="checkbox-item">
                <input type="checkbox" :value="proj.projeto_id || proj.id" v-model="projetosSelecionados" />
                {{ proj.nome_projeto || proj.nome }}
              </label>
            </div>
          </div>
        </div>

        <div class="acoes-painel">
          <button class="btn-cancelar" @click="tagSelecionada = null">Cancelar</button>
          <button class="btn-salvar" @click="salvarVinculos">Salvar Alterações</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contador-tags {
  color: #777;
  font-size: 0.8rem;
}
.seta-gerenciar {
  align-self: center;
}
.gerenciador-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.card {
  background: #ffffff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.input-group {
  display: flex;
  gap: 10px;
  input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    background-color: #00f0ff;
    color: #333;
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    border: none;
    &:hover { background-color: #0056b3; color: white; }
  }
}

.painel-flex {
  display: flex;
  gap: 20px;
}

.lista-tags {
  flex: 1;
  ul { list-style: none; padding: 0; }
  li {
    display: flex;
    justify-content: space-between;
    padding: 12px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    border-radius: 4px;
    margin-bottom: 5px;
    &:hover { background-color: #f0f0f0; }
    &.ativo { background-color: #e0f7fa; border-left: 5px solid #00f0ff; }
  }
}

.painel-vinculo {
  flex: 2;
  .tag-destaque { color: #0056b3; font-weight: bold; }
}

.listas-selecao {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.coluna-selecao {
  flex: 1;
  h4 { margin-bottom: 10px; border-bottom: 2px solid #eee; padding-bottom: 5px; }
}

.checkbox-group {
  max-height: 250px;
  overflow-y: auto;
  border: 1px solid #eee;
  padding: 10px;
  border-radius: 4px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 0;
  cursor: pointer;
  &:hover { background-color: #fafafa; }
}

.acoes-painel {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  button {
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    border: none;
    font-weight: bold;
  }
  .btn-cancelar { background-color: #e0e0e0; }
  .btn-salvar { background-color: #00f0ff; }
}
</style>