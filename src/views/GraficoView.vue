<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import GraficoXRF from '@/components/GraficoXRF.vue';
import GraficoFTIR from '@/components/GraficoFTIR.vue';

export default {
    components: {
        GraficoXRF,
        GraficoFTIR
    },
    props: ['params'],
    setup() {
        const tecnica = ref('');
        const post = ref(null);
        const objetoAnalise = ref(null);
        const idPonto = ref(null);
        const atributos = ref(null);
        const filePath = ref('');
        const isLoading = ref(true)

        const route = useRoute();

        const getParams = async () => {
            const tecnicaParams = route.params.id.split('-');
            tecnica.value = tecnicaParams[1];
            return tecnicaParams;
        };

        const getPost = async (projetoId) => {
            try {
                const response = await axios.get(`https://api.labmov.tec.br/api/projetos/${projetoId}`, {
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
            post.value = await getPost(params[0]);
            if (post.value && post.value.status === 200) {
                const Pontos = post.value.data.pontos;
                Pontos.forEach((ponto) => {
                    ponto.tecnicas.forEach((analise) => {
                        if (analise.nome_tecnica === tecnica.value) {
                            objetoAnalise.value = analise;
                            idPonto.value = ponto.nome_ponto;
                            console.log(idPonto.value)
                            atributos.value = analise;
                        }
                    });
                });

                if (objetoAnalise.value) {
                    //const vrau = require('/public/files/20_ponto_97_XRF_1.csv');
                    filePath.value = "/files/20_ponto_97_XRF_1.csv";
                    // console.log(vrau)
                    // Create a Blob from the file path
                    //const fileResponse = await axios.get(filePath.value);
                    // const fileBlob = new Blob([fileResponse.data], { type: 'text/csv' });

                     //console.log("blob", fileResponse)

                
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
            tecnica,
            filePath,
            idPonto,
            atributos,
            isLoading
        };
    }
};
</script>

<template>
    <div v-if="isLoading">
        Loading...
    </div>
    <div v-else>
        <div v-if="objetoAnalise">
            <h1>{{idPonto}}_{{ objetoAnalise.nome_tecnica }}</h1>
            <GraficoXRF v-if="tecnica.startsWith('XRF') && filePath" :filePath="filePath" :attributes="atributos"/>

            <GraficoFTIR v-if="tecnica === 'FTIR'" :filePath="filePath" />
        </div>
    </div>
    
</template>
