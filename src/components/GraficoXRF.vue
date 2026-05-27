<script module>
import { ref, watch, computed } from 'vue';
import readTextFileXRF from '@/utils/readTextFileXRF';
import ChartComponent from './ChartComponent.vue';
import { calibrateChannelsToKeV } from '@/utils/calibrateXRF';

export default {
    props: ['filePath', 'attributes'],
    components: {
        ChartComponent,
    },
    setup(props) {
        const arrayA = ref([]);
        const arrayB = ref([]);
        const atributos = ref(null);
        const applyLog = ref(false);

        const ponto2 = ref({ x: 1779, y: 20.21}); 
        const ponto1 = ref({ x: 630, y: 6.40});

        const loadFileData = async () => {
            if (props.filePath) {
                try {
                    const vrau = await readTextFileXRF(props.filePath, applyLog.value);
                    console.log("vrau", vrau);
                    arrayA.value = vrau.arrayA || [];
                    arrayB.value = vrau.arrayB || [];
                    atributos.value = props.attributes;
                } catch (error) {
                    console.error("Error loading XRF file:", error);
                }
            }
        };

        const toggleLog = () => {
            applyLog.value = !applyLog.value; // Toggle log10 application
            loadFileData();        
        };

        console.log("vrau",atributos);
        // --- Computed Property que aplica o utilitário de calibração em tempo real ---
        const eixoXCalibrado = computed(() => {
            if (!arrayA.value.length) return [];
            
            // Passa os canais e os dois pontos para a função de primeiro grau
            return calibrateChannelsToKeV(arrayA.value, ponto1.value, ponto2.value);
        });
        watch(() => props.filePath, loadFileData, { immediate: true });

        return {
            arrayA,
            arrayB,
            atributos,
            eixoXCalibrado,
            ponto1,
            ponto2,
            toggleLog,
            applyLog,
        };
    },
};
</script>

<template>
    <div v-if="arrayA.length && arrayB.length" class="container1">
        
        <div class="painel-calibracao">
            <div class="ponto-input">
                <label>Ponto 1 - Canal (X1): <input type="number" v-model.number="ponto1.x" /></label>
                <label>Energia keV (Y1): <input type="number" step="0.001" v-model.number="ponto1.y" /></label>
            </div>
            <div class="ponto-input">
                <label>Ponto 2 - Canal (X2): <input type="number" v-model.number="ponto2.x" /></label>
                <label>Energia keV (Y2): <input type="number" step="0.001" v-model.number="ponto2.y" /></label>
            </div>
        </div>

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
