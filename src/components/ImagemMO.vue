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
        {{atributos}}
    </div>
    <div v-for="(path, index) in pathImagem" :key="index">
        <img :src="path" />
        <div class="atributos" v-if="atributos">
                <h2>Parâmetros de aquisição: </h2>
                <p>Aumento: </p>
                <!-- <p>Data: {{ atributos.data }}</p>
                <p>Comentário: {{ atributos.comentario }}</p>
                <p>Resultado: {{ atributos.resultado }}</p>
                <p>Tonalidade: {{ atributos.tonalidade }}</p> -->

        </div>
    </div>
</template>