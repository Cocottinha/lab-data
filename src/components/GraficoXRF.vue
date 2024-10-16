<script module>
import { ref, watch } from 'vue';
import readTextFileXRF from '@/utils/readTextFileXRF'

export default {
    props: ['filePath'],
    setup(props) {
        const arrayA = ref([]);
        const arrayB = ref([]);

        const loadFileData = async () => {
            if (props.filePath) {
                console.log("Loading file from:", props.filePath);
                try {
                    // const fetch = await fetch(props.filePath)
                    const vrau = readTextFileXRF('/files/20_ponto_97_XRF_1.csv');
                    console.log("teste", vrau)
                    // const response = await readTextFileXRF(props.filePath); // Adjust the endpoint if necessary
                    // const data = await response.json();
                    
                    // console.log(data)
                    // arrayA.value = data.arrayA;
                    // arrayB.value = data.arrayB;

                    // console.log("Parsed data", arrayA.value, arrayB.value);
                } catch (error) {
                    console.error("Error loading CSV file:", error);
                }
            }
        };

        watch(() => props.filePath, () => {
            loadFileData();
        }, { immediate: true });

        return {
            arrayA,
            arrayB
        };
    }
};
</script>

<template>
    <div v-if="arrayA.length && arrayB.length">
        <h2>XRF Chart</h2>
        <PlotComponent :x="arrayA" :y="arrayB" />
    </div>
    <div v-else>
        <h2>No data available</h2>
    </div>
</template>
