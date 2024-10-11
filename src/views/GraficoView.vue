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
    props: ['params'], // Pass in params from the router
    setup() {
        const tecnica = ref('');
        const post = ref(null);
        const objetoAnalise = ref(null);
        const filePath = ref(''); // Add filePath ref
        const route = useRoute(); //slug

        const getParams = async () => {
            const tecnicaParams = route.params.id.split('-');
            tecnica.value = tecnicaParams[1] //set name of technique
            return tecnicaParams;
        }

        const getPost = async (projetoId) => {
            let response;
            try {
                response = await axios.get(`https://api.labmov.tec.br/api/projetos/${projetoId}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json; charset=utf-8',
                        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                    }
                });
                return response;
            } catch (error) {
                console.log("Não foi possível recuperar o post!");
                return null;
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
                        }
                    });
                });

                if (objetoAnalise.value != null) {
                    filePath.value = "../assets/20_ponto_97_XRF_1.csv"; // Set file path
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
            filePath // Make filePath available
        };
    }
};
</script>

<template>
    <div v-if="objetoAnalise">
        <h1>{{ objetoAnalise.nome_tecnica }}</h1>

        <!-- Pass filePath as a prop to GraficoXRF -->
        <GraficoXRF v-if="tecnica.startsWith('XRF')" :file-path="filePath" />
        <GraficoFTIR v-if="tecnica == 'FTIR'" :file-path="filePath" />
    </div>
</template>
