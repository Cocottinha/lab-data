<script>
import { ref, watch } from 'vue';
import { readTextFileXRF } from '../utils/readFileXRF.js'; // Import the function to read the file

export default {
    props: ['filePath'], // Accept filePath as a prop
    setup(props) {
        const arrayA = ref([]);
        const arrayB = ref([]);
        console.log(props.filePath)
        const loadFileData = async () => {
            if (props.filePath) {
                const { arrayA: a, arrayB: b } = await readTextFileXRF(props.filePath);
                arrayA.value = a;
                arrayB.value = b;
            }
        };

        // Load data when filePath changes
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
        <!-- Replace this with the actual chart component you're using -->
        <h2>XRF Chart</h2>
        <PlotComponent :x="arrayA" :y="arrayB" />
    </div>
    <div v-else>
        <h2>No data available</h2>
    </div>
</template>
