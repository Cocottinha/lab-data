<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import AnaliseProjeto from '@/components/AnaliseProjeto.vue';

export default {
    components:{
        AnaliseProjeto
    },
    props:['params'],
    setup(){
        const post = ref(null);
        const objetoAnalise = ref(null);
        const atributos = ref(null);
        const filePath = ref([]);
        const isLoading = ref(true)
        const idProjeto = ref(null);

        const route = useRoute();

        const getParams = async () => {
            const tecnicaParams = route.params.id.split('-');
            console.log(tecnicaParams);
            return tecnicaParams;
        };

        const getPost = async (projetoId) => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_APIPROJETOS}/${projetoId}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json; charset=utf-8',
                        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                    }
                });
                return response;
            } catch (error) {
                console.error("Não foi possível recuperar o post!", error);
                return null;
            } finally{
                isLoading.value = false;
            }
        };
        const fetchData = async () => {
            const params = await getParams();
            
            idProjeto.value = params[0];
            post.value = await getPost(params[0]);
            if (post.value && post.value.status === 200) {
                
                objetoAnalise.value = post.value.data.tipo_analises.find(tipo => tipo.Id_tipo_analise === parseInt(params[2]))
                    .analises.find(analise => analise.id_analise === parseInt(params[3]));
                if (objetoAnalise.value) {
                         console.log("Objeto de análise encontrado:", objetoAnalise.value);
                }
            } else {
                console.log("Impossível recuperar os dados!");
            }
        };

        onMounted(() => {
            fetchData();
        });

        return {
            objetoAnalise,
            filePath,
            atributos,
            isLoading,
            idProjeto
        };
    }
}

</script>

<template>
    <div v-if="isLoading">
        Loading...
    </div>
    <div v-else>
        <div v-if="objetoAnalise">
            <h1>{{item}}</h1>
            <br>
            <AnaliseProjeto :idProjeto="idProjeto" :attributes="objetoAnalise"/>
        </div>
    </div>
</template>