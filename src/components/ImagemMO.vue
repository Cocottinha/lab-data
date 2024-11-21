<script module>
/* eslint-disable */
import { ref, onMounted } from 'vue';

export default {
    props: ['idProjeto', 'attributes'],
    setup(props) {
        const atributos = ref(null);
        const idProjeto = ref(null);

        function formatDateToBrazilian(dateString) {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();

            return `${day}/${month}/${year}`;
        }
        const getProps = async () => {
            try {
                idProjeto.value = props.idProjeto;

                atributos.value = props.attributes;

                console.log(idProjeto.value)
                console.log(atributos.value)

            } catch (error) {
                console.log(error)
            }
        }

        onMounted(() => {
            getProps();
        });

        return {
            idProjeto,
            atributos,
            formatDateToBrazilian
        };
    },
};

</script>

<template>
    <div class="parametros">
        <h2>Parâmetros:</h2>

        <p>Data: {{ formatDateToBrazilian(atributos?.data) }}</p>
        <p>Tonalidade: {{ atributos?.tonalidade }}</p>
        <p>Objetiva: {{ atributos?.objetiva }}</p>
        <p>Resultado: {{ atributos?.resultado }}</p>
        <p>Comentario: {{ atributos?.comentario }}</p>

        <div v-for="(item, index) in atributos?.imagensEAumentos" :key="index" class="imagens">
            <p>Aumento: {{ item?.aumento }}</p>
            <img :src="`/files/ftp/${idProjeto}/${item?.diretorio}`" alt="Image" width="60%" />
        </div>
    </div>
</template>

<style>
.parametros p {
    padding-left: 10px;
    gap: 15px;
    margin-bottom: 5px;
    margin-top: 10px;
}

.parametros h2 {
    margin-bottom: 25px;
}

.parametros {
    margin: 25px;
    max-width: 100%;
}

.imagens {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    /* Ensure no extra margin is added */
    padding: 5px;
    margin: 5px;
    margin-top: 30px;
    p{
        padding: 10px;
    }
}
</style>
