<template>
  <div v-if="arrayA.length && arrayB.length" class="container1">
    <div class="chart">
      <ChartComponent :xData="eixoXCalibrado" :yData="arrayB" />
    </div>

    <button class="log" @click="toggleLog">
      Log(10) {{ applyLog ? 'Enable' : 'Disable' }}
    </button>

    <div class="atributos">
      <h2>Parâmetros de aquisição:</h2>
      <p>Tempo: {{ atributos?.tempo }}</p>
      <p>Tensão: {{ atributos?.voltagem }}</p>
      <p>Corrente: {{ atributos?.corrente }}</p>
      <p>Colimador: {{ atributos?.colimador }}</p>
      <p>Calibração A: {{ atributos?.calibracaoA }}</p>
      <p>Calibração B: {{ atributos?.calibracaoB }}</p>
      <p>Data: {{ atributos?.data }}</p>
      <p>Comentário: {{ atributos?.comentario }}</p>
      <p>Resultado: {{ atributos?.resultado }}</p>
      <p>Tonalidade: {{ atributos?.tonalidade }}</p>
    </div>
  </div>
  <div v-else>
    <h2>No data available</h2>
  </div>
</template>
<style scoped>
.painel-calibracao {
    display: flex;
    gap: 20px;
    background: #f4f4f4;
    padding: 10px;
    border-radius: 6px;
    margin-bottom: 15px;
    font-size: 14px;
}
.ponto-input {
    display: flex;
    gap: 10px;
}
.ponto-input input {
    width: 80px;
    padding: 3px;
}

/* Mantém o resto dos seus estilos abaixo intactos */
.container1 {
    height: 900px;
    padding: 10px;
    place-items: center;
}
.chart {
    display: grid;
    place-items: center;
}
.atributos {
    text-align: left;
    place-items: left;
    margin-top: 20px;
    width: 1200px;
    padding: 10px;
    padding-bottom: 20px;
    p {
        padding: 10px;
    }
}
button.log {
    margin-bottom: 20px;
    padding: 10px 20px;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}
button.log:hover {
    background-color: #555;
}
@media (max-width: 1367px) {
  .atributos {
    width: 1150px;
  }
}

@media (max-width: 1260px) {
  .atributos {
    width: 1024px;
  }
}

@media (max-width: 1024px) {
  .atributos {
    width: 768px;
  }
}

@media (max-width: 768px) {
  .atributos {
    width: 600px;
  }
}

@media (max-width: 640px) {
  .atributos {
    width: 435px;
  }
}

@media (max-width: 476px) {
  .atributos {
    width: 340px;
  }
}
</style>
<script>
import { ref, watch, computed } from 'vue';
import readTextFileXRF from '@/utils/readTextFileXRF';
import ChartComponent from './ChartComponent.vue';

export default {
  props: ['filePath', 'attributes'],
  components: {
    ChartComponent,
  },
  setup(props) {
    const arrayA = ref([]);
    const arrayB = ref([]);
    const coeficienteA = ref(null);
    const coeficienteB = ref(null);
    const atributos = ref(null);
    const applyLog = ref(false);

    const applyLinearCoefficients = (canais, coefA, coefB, decimals = 3) => {
      return canais.map(canal => Number(((coefA * canal) + coefB).toFixed(decimals)));
    };

    const loadFileData = async () => {
      if (props.filePath) {
        try {
          coeficienteA.value = null;
          coeficienteB.value = null;

          const vrau = await readTextFileXRF(props.filePath, applyLog.value);
          arrayA.value = vrau.arrayA || [];
          arrayB.value = vrau.arrayB || [];

          const coefA = Number(vrau.coeficienteA);
          const coefB = Number(vrau.coeficienteB);
          coeficienteA.value = vrau.coeficienteA !== null && Number.isFinite(coefA) ? coefA : null;
          coeficienteB.value = vrau.coeficienteB !== null && Number.isFinite(coefB) ? coefB : null;

          atributos.value = props.attributes;
        } catch (error) {
          console.error("Error loading XRF file:", error);
        }
      }
    };

    const toggleLog = () => {
      applyLog.value = !applyLog.value;
      loadFileData();
    };

    watch(() => props.attributes, (newVal) => {
      atributos.value = newVal;
    }, { immediate: true });

    const eixoXCalibrado = computed(() => {
      if (!arrayA.value.length) return [];

      if (coeficienteA.value !== null && coeficienteB.value !== null) {
        return applyLinearCoefficients(arrayA.value, coeficienteA.value, coeficienteB.value, 3);
      }

      return arrayA.value;
    });

    watch(() => props.filePath, loadFileData, { immediate: true });

    return {
      arrayA,
      arrayB,
      coeficienteA,
      coeficienteB,
      atributos,
      eixoXCalibrado,
      toggleLog,
      applyLog,
    };
  },
};
</script>