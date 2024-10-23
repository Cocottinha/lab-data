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
        <img :src="`${pathImagem}`" />
    </div>
</template>