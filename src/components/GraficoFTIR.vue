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

                    console.log(atributos)
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
        <div class="chart">
            <ChartComponent :xData="arrayA" :yData="arrayB" />                   
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

<style>
    .container1{
        height:900px;
        padding: 10px; 
        place-items: center;
    }
    .chart{
        display: grid;
        place-items: center;
    }
    .atributos{
        display: grid;
        place-items: left;
        text-align: left;
        width: 1200px;
        margin-top: 20px;
        padding: 10px 10px 100px 10px;
        p{
            padding: 10px;
        }
    }
    
</style>