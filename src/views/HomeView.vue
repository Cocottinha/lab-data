<template>
  <div class= "container">
    <div class="textbox">
      <h1 class="title">Nº1 do Brasil!</h1>
      <p class="desc">
        Primeira Equipe Nacional a Utilizar e Dominar a Tecnologia de MA-XRF!<br />
        Sediada no Campus IFRJ-Paracambi, a equipe do Laboratório Móvel se destaca como uma potência na área das
        análises físico-químicas de obras de arte.
      </p> 
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
</template>

<script>
export default {
  name: 'HomeView',
}
</script>

<style scoped lang="scss">
.container {
    place-items: center;
    margin: 0 auto ;
    display: flex;
    gap: 50px;
    flex-direction: row;
    padding-top: 100px;
    padding-right: 30px;
    width: 1440px;
    height: 65vh;
}
h4{
    text-align: left;
    margin: auto;
}
.textbox {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 50px;    
    width: 750px;
    margin-left: 0px;
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
.brands {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: auto;
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
   width: 650px;
    object-fit:cover ;
}

.brandImg {
    padding: 5px;
    width: 20vh;
    height: 20%;
}

@media (max-width: 1919px) {
    .container {
        flex-direction: column;
        text-align: center;
        margin: 0px;
        padding: 60px 0px 0px 40px;
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
        width: 80%;
        height: 10%;
        margin-left: auto;
    }

    .heroImg {
        object-fit: cover;
        width: 980px;
        height: 680px;
    }
}
@media (max-width: 1700px) {
    .container {
        flex-direction: column;
        text-align: center;
    }
    .brands{
        width: 85%;
        display: flex;
        flex-direction: row;
        justify-content:space-between;
    }
    .heroImg {
        object-fit: cover;
        width: 940px;
        height: 430px;
    }
}

@media (max-width: 1280px) {
    .container {
        flex-direction: column;
        text-align: center;
    }
    .brands{
        width: 85%;
        display: flex;
        flex-direction: row;
        justify-content:space-between;
    }
    .heroImg {
        object-fit: cover;
        width: 740px;
        height: 530px;
    }
}

@media (max-width: 1280px) {
    .container {
        flex-direction: column;
        
    }

    .brandImg {
        width: 85%;
        height: 60px;
        margin-left: 0%;
    }

    .heroImg {
        object-fit: cover;
        width: 640px;
        height: 430px;
    }
}

@media (max-width: 1024px) {
    .container {
        flex-direction: column;
        text-align: center;
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

@media (max-width: 420px) {
    .container {
        padding: 40px 0px 0px 20px;
    }
    .desc {
        margin-left: 20px;
        padding-right: 20px;
    }
    .brands{
        margin: 0;
        width: 220px;
    }
    h4{
        text-align: center;
        margin: auto;
    }
    .textbox{
        gap: 20px;
    }.brandImg{
        margin: 0;
        padding: 25px;
    }
    .heroImg{
        width: 320px;
        height: 210px;
        margin: 10px;
    }
}
</style>
