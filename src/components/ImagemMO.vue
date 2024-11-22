<script module>
/* eslint-disable */
import { ref, onMounted } from 'vue';
import ZoomMoModal from './ZoomMoModal.vue';

export default {
    components:{
        ZoomMoModal,
    },  
    props: ['idProjeto', 'attributes'],
    setup(props) {
        const atributos = ref(null);
        const idProjeto = ref(null);
        const showModal = ref(false);
        const filePath = ref("");

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

            } catch (error) {
                console.log(error)
            }
        }
        const openModal = (file) =>{
            filePath.value = file;
            showModal.value = true;
        }
        const closeModal = () =>{
            showModal.value = false;
            filePath.value = null;
        }

        onMounted(() => {
            getProps();
        });

        return {
            idProjeto,
            atributos,
            formatDateToBrazilian,
            showModal, 
            openModal,
            closeModal,
            filePath
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
            <div class="norm">
                <img :src="`/files/ftp/${idProjeto}/${item?.diretorio}`" alt="Image" class="imagem" @click="openModal(`/files/ftp/${idProjeto}/${item?.diretorio}`)"/>
                <div id="myResult" class="img-zoom-result"></div>
                <p><strong>Aumento:</strong> {{ item?.aumento }}</p> 
            </div>
                                
        </div>
    </div>
    <ZoomMoModal :isOpen="showModal" :onExit="closeModal" :file="filePath"/>
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
    margin: 25px auto;
    max-width: 100%;
    align-items: left;
  justify-content: center;
    display: flex;
    flex-direction: row;
}
.desc{
    display: flex;
    flex-direction: column;
  align-items: left;
  justify-content: left;
  text-align: left;
  height: 20vh; /* Full viewport height */
  margin: 0 ; /* Ensure no extra margin is added */
  max-width: 300px;
  text-wrap:balance;
  p{
    width: 300px;
  }
}
.imagens {
    display: grid;
    grid-template-columns: repeat(2, 0.5fr);
    align-items: center;
    justify-content: center;
    margin: 0 20px;
    gap: 0px;
    max-width: 500px;
    transition: 0.3s;
    p{
        text-align: center;
    }
}
.imagem{
    max-width: 500px;
    cursor: zoom-in;   
}
.imagens:hover{
        transform: scale(1.1);
    }
</style>
