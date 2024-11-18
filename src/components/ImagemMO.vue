<script module>
import { ref, onMounted } from 'vue';

export default {
    props: ['filePath','attributes'],
    setup(props) {
        const atributos = ref(null);
        const pathImagem = ref(null);

        const getProps = async () => {
            try {
            pathImagem.value = props.filePath;

            atributos.value = props.attributes;

            console.log(pathImagem.value)
            console.log(atributos.value)

            } catch (error) {
                console.log(error)
            }
        }
        
        onMounted(() => {
            getProps();
        });

        return {
            pathImagem,
            atributos
        };
    },
};
</script>

<template>
    <div>
        <!-- Loop through attributes -->
        <div v-for="(atributo, index) in atributos" :key="index">
            <h3>Parâmetro {{ index }}</h3>
            <p>{{ atributo }}</p>
        </div>
    </div>

    <!-- Loop through image paths -->
    <div v-for="(path, index) in pathImagem" :key="index">
        <img :src="path" alt="Image" />
        <div class="atributos" v-if="atributos.length">
            <h2>Parâmetros de aquisição:</h2>
            <p>Aumentos: {{ atributos[index] || 'N/A' }}</p>
        </div>
    </div>
</template>
