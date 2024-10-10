<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
    components: {

    },
    props: ['params'], // Pass in params from the router
    setup() {
        const tecnica = ref('');
        const post = ref(null);
        const objetoAnalise = ref(null);
        const arrayA = ref([]);
        const arrayB = ref([]);
        const file = ref('');

        const route = useRoute(); //slug
        console.log(route.params.id)

        const getParams = async () => {
            const tecnicaParams = route.params.id.split('-');
            console.log(tecnicaParams)

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
                console.log(response)
                return response;

            } catch (error) {
                response = "Não foi possível recuperar o post!";
                console.log(response)
                return response;
            }
        };

        const fetchData = async () => {
            const params = await getParams();
            post.value = await getPost(params[0]);
            if (post.value.status == 200) {
                console.log("Dados recuperados com sucesso!")
                const Pontos = post.value.data.pontos;
                Pontos.forEach((ponto) => {
                    ponto.tecnicas.forEach((analise) => {
                        if (analise.nome_tecnica === tecnica.value) {
                            objetoAnalise.value = analise;
                        }
                    });
                });

                if (objetoAnalise.value != null) {
                    //const filePath = `public/ftp/${post.value.projeto_id}/${objetoAnalise.value.diretorio}`;
                    if (tecnica.value === 'XRF') {
                        // const { arrayA: a, arrayB: b } = await readTextFileXRF(filePath);
                        // arrayA.value = a;
                        // arrayB.value = b;
                    } else if (tecnica.value === 'FTIR') {
                        // const { arrayA: a, arrayB: b } = await readTextFileFTIR(filePath);
                        // arrayA.value = a;
                        // arrayB.value = b;
                    }
                }
            }
            else {
                console.log("Impossível recuperar os dados!")
            }

        };

        onMounted(() => {
            fetchData();
        });

        return {
            objetoAnalise,
            arrayA,
            arrayB,
            tecnica,
            file
        };
    }
}; 
</script>

<template>
    <div class="container" v-if="objetoAnalise">
        <h1>{{ objetoAnalise.nome_tecnica }}</h1>

        <!-- XRF Technique -->
        <PlotComponent v-if="tecnica === 'XRF'" :x="arrayA" :y="arrayB" />

        <!-- FTIR Technique -->
        <PlotComponent v-if="tecnica === 'FTIR'" :x="arrayA" :y="arrayB" />

        <!-- Parameters Component -->
        <ParamsXRF v-if="tecnica === 'XRF'" :objeto="objetoAnalise" />
        <ParamsFTIR v-if="tecnica === 'FTIR'" :objeto="objetoAnalise" />

        <div v-else>
            <h1>Gráfico não encontrado</h1>
        </div>
    </div>
</template>