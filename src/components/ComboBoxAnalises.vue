
<template>
    <div class="button">
      <h3>Filtrar:</h3>
      <select v-model="selectedOption" id="filters" @change="handleSelectAnaliseChange">
        <option value="Todas">Todas</option>
        <option value="radiografia">Radiografia</option>
        <option value="irr">IRR</option>
        <option value="mapa">Mapa</option>
        <option value="hiperespectral">Hiperespectral</option>
      </select>
    </div>
  </template>
  
<script>
import { ref, } from 'vue';

export default {
    name: 'ComboBoxAnalises',
    props: {
        tipoAnalises: {
            type: Array,
            required: true
        }
    },
    emits: ['setSortedAnalises'],
    setup(props, { emit }) {
        const selectedOption = ref('Todas');
        const handleSelectAnaliseChange = () => {
            const option = selectedOption.value;
            console.log(props);
            if (option === 'Todas') {
                emit('setSortedAnalises', props.tipoAnalises);
                return;
            }
            const filteredResults = props.tipoAnalises.filter(tipo => {
                // Verifica se dentro de 'analises' existe alguma com o $type selecionado
                // Usamos .some() para retornar true se pelo menos uma bater
                return tipo.analises.some(analise =>
                    analise.$type.toLowerCase() === option.toLowerCase()
                );
            });
            emit('setSortedAnalises', filteredResults);
        };


        return {
            selectedOption,
            handleSelectAnaliseChange
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
  