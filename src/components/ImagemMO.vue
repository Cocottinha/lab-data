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
        <div class="desc">
            <h2>Parâmetros:</h2>
            <p><strong>Data:</strong> {{ formatDateToBrazilian(atributos?.data) }}</p>
            <p><strong>Tonalidade:</strong> {{ atributos?.tonalidade }}</p>
            <p><strong>Objetiva:</strong> {{ atributos?.objetiva }}</p>
            <p><strong>Resultado:</strong> {{ atributos?.resultado }}</p>
            <p><strong>Comentário:</strong> {{ atributos?.comentario }}</p>
        </div>

        <div v-for="(item, index) in atributos?.imagensEAumentos" :key="index" class="imagens">
            
            <img :src="`/files/ftp/${idProjeto}/${item?.diretorio}`" alt="Image" class="imagem"/>
            <p><strong>Aumento:</strong> {{ item?.aumento }}</p>
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
    display: flex;
    flex-direction: row;
}
.desc{
    display: flex;
    flex-direction: column;
  align-items: left;
  justify-content: left;
  text-align: left;
  height: 30vh; /* Full viewport height */
  margin: 0 auto; /* Ensure no extra margin is added */
  max-width: 200px;
}
.imagens {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding: 5px;
    margin: 5px;
    gap: 20px;
    p{
        text-align: left;
    }
}
.imagem{
    max-width: 500px;
}
</style>
