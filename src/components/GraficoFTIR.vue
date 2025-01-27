<script module>
import { ref, watch } from 'vue';
import ChartComponent from './ChartComponent.vue';
import readTextFileFTIR from '@/utils/readTextFileFTIR';

export default {
    props: ['filePath','attributes'],
    components: {
        ChartComponent
    },
    setup(props) {
        const arrayA = ref([]);
        const arrayB = ref([]);
        const atributos = ref(null);

        const loadFileData = async () => {
            if (props.filePath) {
                console.log("Loading file from:", props);
                try {
                    const vrau = await readTextFileFTIR(props.filePath);

                    arrayA.value = vrau.arrayA || [];
                    arrayB.value = vrau.arrayB || [];

                    atributos.value = props.attributes;

                    console.log("A",arrayA)
                    // console.log("B",vrau.arrayB)
                } catch (error) {
                    console.error("Error loading FTIR file:", error);
                }
            }
        };

        watch(() => props.filePath, () => {
            loadFileData();
        }, { immediate: true });

        return {
            arrayA,
            arrayB,
            atributos
        };
    },
};
</script>

<template>
    <div v-if="arrayA.length && arrayB.length" class="container1">
        <div v-if="arrayA.length && arrayB.length > 2000 " class="chart">
            <ChartComponent :xData="arrayA" :yData="arrayB" />                   
        </div>
        <div v-else class="error">
          Não foi possível carregar o gráfico!
        </div>
        <div class="atributos">
                <h2>Parâmetros de aquisição: </h2>
                <p>Tempo: {{ atributos.tempo }}</p>
                <p>Resolução: {{ atributos.resolucao }}</p>
                <p>Intervalo: {{ atributos.intervalo }}</p>
                <p>Data: {{ atributos.data }}</p>
                <p>Comentário: {{ atributos.comentario }}</p>
                <p>Resultado: {{ atributos.resultado }}</p>
                <p>Tonalidade: {{ atributos.tonalidade }}</p>

            </div>
        
    </div>
    <div v-else>
        <h2>No data available</h2>
    </div>
</template>

<style scoped>
.container1 {
    height: 900px;
    padding: 10px;
    place-items: center;
}
.chart {
    display: grid;
    place-items: center;
    
}
.error{
  font-size: 30px;
  padding: 100px;
}
.atributos {
    text-align: left;
    place-items: left;
    width: 1200px;
    margin-top: 20px;
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