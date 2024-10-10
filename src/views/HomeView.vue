<template>
  <div class= "container">
    <div class="textbox">
      <h1 class="title">Nº1 do Brasil!</h1>
      <p class="desc">
        Primeira Equipe Nacional a Utilizar e Dominar a Tecnologia de MA-XRF!<br />
        Sediada no Campus IFRJ-Paracambi, a equipe do Laboratório Móvel se destaca como uma potência na área das
        análises físico-químicas de obras de arte.
      </p>
      <div class="buttons">
        <a href="/about" target="_blank"><button class="button">Saiba Mais</button></a>
      </div>  
      <h4>
        Orgãos de Fomento/Parceiros:
      </h4>
      <div class="brands">
        <div class="brandImg">
          <img src='../assets/ibram.png' width=110 height=40 alt="Ibram" />
        </div>
        <div class="brandImg">
          <img src='../assets/ifrj.png' width=120 height=40 alt="IFRJ" />
        </div>
        <div class="brandImg">
          <img src="../assets/liscomp.png" width=155 height=40 alt="Liscomp" />
        </div>
        <div class="brandImg">
          <img src='../assets/cnpq.png' width=127 height=40 alt="CNPQ" />
        </div>
        <div class="brandImg">
          <img src="../assets/faperj.jpg" width=105 height=40 alt="Faperj" />
        </div>
      </div>    
    </div>
    
    <div class="imgcontainer">
      <img src="../assets/lbmovel.jpg" alt="labmovel"  class="heroImg" />
    </div>
  </div>
  <HelloWorld msg="Welcome to Your Vue.js App" />
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

<style scoped lang="scss">
.container {
    display: flex;
    gap: 50px;
    flex-direction: row;
    padding: 120px;
    padding-right: 30px;
    width: 1340px;
}
h4{
    text-align: left;
    margin-left: 40px;
}
.textbox {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 50px;    
    width: 750px;
    margin-left: 50px;
}

.title {
    font-size: 50px;
    font-weight: 100;
    text-align: left;
    margin-left: 40px;
}

.desc {
    font-size: 22px;
    margin-left: 40px;
    text-wrap:wrap;
    text-align: justify;
    padding-right: 40px;
}

.buttons {
    display: flex;
    gap: 20px;
    justify-content: left;
    margin-left: 20px;
    padding-left: 20px;
}

.button {
    padding: 20px;
    cursor: pointer;
    min-width: 120px;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    /* -webkit-transition: background-color 2s ease-out;
    -moz-transition: background-color 2s ease-out;
    -o-transition: background-color 2s ease-out; */
    transition: color, background-color;
    transition-duration: 0.5s;
    transition-timing-function: ease;
}

.button:hover {
    background-color: gray;
    color: white;
}

.brands {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: left;
    margin-left: 25px;
}

.imgcontainer {
    flex: 1;
    position: relative;
    transition: transform 0.5s;
    object-fit: cover;
    cursor: pointer;
}

.imgcontainer:hover {
    transform: scale(1.1);
}

.heroImg {
    border-radius: 20px;
    box-shadow: 0.1rem 0.1rem 0.5rem gray;
    height: 450px;
    max-width: 700px;
    object-fit:cover ;
}

.brandImg {
    padding: 0px;
    width: 20vh;
    height: 20%;
}

@media (max-width: 1919px) {
    .container {
        flex-direction: column;
        text-align: center;
        margin: 0px;
        padding: 100px 0px 0px 80px;
        width: 95%;
    }
    .title{
        text-align: center;
        margin: 0;
    }
    .textbox {
        flex: 1;
        display: flex;
        flex-direction: column;  
        width: 100%;
        margin-left: 0px;
    }
    .desc{
        text-align: center;
    }
    .buttons {
        justify-content: left;
    }
    .brands{
        width: 85%;
        display: flex;
        flex-direction: row;
        justify-content:space-between;
    }
    .brandImg {
        padding: 10px;
        width: 100%;
        height: 20%;
        margin-left: 10%;
    }

    .heroImg {
        object-fit: cover;
        width: 980px;
        height: 580px;
    }
}

@media (max-width: 1280px) {
    .container {
        flex-direction: column;
        text-align: center;
    }

    .buttons {
        justify-content: center;
    }

    .brandImg {
        width: 100%;
        height: 60px;
        margin-left: 7%;
    }

    .heroImg {
        object-fit: cover;
        width: 980px;
        height: 580px;
    }
}

@media (max-width: 1280px) {
    .container {
        flex-direction: column;
        text-align: center;
    }

    .buttons {
        justify-content: center;
    }

    .brandImg {
        width: 100%;
        height: 60px;
        margin-left: 7%;
    }

    .heroImg {
        object-fit: cover;
        width: 980px;
        height: 580px;
    }
}

@media (max-width: 1024px) {
    .container {
        flex-direction: column;
        text-align: center;
    }

    .buttons {
        justify-content: center;
    }

    .brandImg {
        width: 100%;
        height: 50px;
        margin-left: 1%;
    }

    .heroImg {
        object-fit: cover;
        width: 640px;
        height: 430px;
    }
}

@media (max-width: 768px) {
    .title {
        font-size: 64px;
    }

    .heroImg {
        object-fit: cover;
        width: 340px;
        height: 230px;
    }

    .brands {
        flex-direction: column;
        height: 100%;
    }

    .brandImg {
        padding: 30px;
    }
}

@media (max-width: 640px) {
    .title {
        font-size: 64px;
    }

    .heroImg {
        object-fit: cover;
        width: 340px;
        height: 230px;
    }

    .brands {
        width: 400px;
    }

    .brandImg {
        width: 100%;
        height: 40px;
    }
}

@media (max-width: 500px) {
    .title {
        font-size: 64px;
    }

    .heroImg {
        object-fit: cover;
        width: 340px;
        height: 230px;
    }

    .brands {
        width: 300px;
        margin-bottom: 40px;
    }

    .brandImg {
        width: 100%;
        height: 30px;
        margin-left: 5%;
    }

    .container {
        gap: 40px;
    }
}
</style>
