<template>
    <div class="button">
      <h3>Filtrar:</h3>
      <select v-model="selectedOption" id="filters" @change="handleSelectChange">
        <option value="Todas">Todas</option>
        <option value="MO">MO</option>
        <option value="FTIR">FTIR</option>
        <option value="XRF">XRF</option>
      </select>
    </div>
  </template>
  
  <script>
  import { ref, } from 'vue';
  
  export default {
    name: 'ComboBoxTecnicas',
    props: {
      pontos: {
        type: Array,
        required: true
      }
    },
    emits: ['setSortedPosts', 'onSelectChange'],
    setup(props, { emit }) {
      const selectedOption = ref('Todas');
  
      const handleSelectChange = () => {
        const option = selectedOption.value;
        emit('onSelectChange', option);
  
        switch (option) {
          case 'Todas':
            emit('setSortedPosts', props.pontos);
            break;
          case 'MO':
            filterByTechnique('MO');
            break;
          case 'FTIR':
            filterByTechnique('FTIR');
            break;
          case 'XRF':
            filterByTechnique('XRF');
            break;
          default:
            break;
        }
      };
  
      const filterByTechnique = (technique) => {
        if (!Array.isArray(props.pontos)) {
          console.log('pontos não é um array');
          return;
        }
  
        const filteredPosts = props.pontos.filter((ponto) => {   
          let tecnicas = [];      
          switch (technique) {
            case 'MO': 
              ponto.tecnicas.map((i) => {
                if(i.nome_tecnica.startsWith('MO')){
                  tecnicas.push(i.nome_tecnica)
                }
              })
              return tecnicas && tecnicas.length > 0;     
            case 'FTIR':
              ponto.tecnicas.map((i) => {
                if(i.nome_tecnica.startsWith('FTIR')){
                  tecnicas.push(i.nome_tecnica)
                }
              })
              return tecnicas && tecnicas.length > 0; 
            case 'XRF':
              ponto.tecnicas.map((i) => {
                if(i.nome_tecnica.startsWith('XRF')){
                  tecnicas.push(i.nome_tecnica)
                }
              })
              return tecnicas && tecnicas.length > 0; 
            default:
              return false;
          }
        });
        emit('setSortedPosts', filteredPosts);
      };
  
      return {
        selectedOption,
        handleSelectChange
      };
    }
  };
  </script>
  
  <style scoped>
  .button select {
    position: relative;
    border-radius: 3px;
    border-color: gray;
    padding: 3px;
    width: 130px;
    text-align: center;
    font-size: 16px;
    background-color: transparent;
  }
  
  .button {
    width: 110px;
    text-align: right;
    position: relative;
    float: right;
  }
  
  .button h3 {
    text-align: left;
    padding-bottom: 5px;
    padding-left: 5px;
  }
  </style>
  