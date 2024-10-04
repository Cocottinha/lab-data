<template>
  <nav>   
    <div>
      <router-link to="/" class="logo"><img src="../src/assets/icon.svg" width="36px" class="logoI"/>Lab.Data</router-link>
    </div>
    <div class="bar">
      <router-link to="/about" class="item">About</router-link>
      <router-link to="/posts" class="item">Posts</router-link>
      <router-link to="/login" class="item">Login</router-link>
    </div>
       
  </nav>
  <router-view/>
</template>

<script>

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body{
  padding: 10px;
  margin: 10px
}
nav {
  gap: 40px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 210px;
  margin-right: 180px;


  .router-link-exact-active{
     background: -webkit-linear-gradient(360deg, var(--labcolor), #00f0ff);
     color: white;
     border-radius: 20px 20px 20px 20px;
  }

  .bar{
    text-align: end;  
    margin-top: 7px;
  }
  a {
    font-weight: bold;
    color: #2c3e50;
    padding: 10px;
    cursor: pointer;
    text-decoration: none;
  }
  .item{
    font-size: 20px;
  }
  .logo{
    font-size: 30px;
    font-weight: bold;
    background: -webkit-linear-gradient(360deg, var(--labcolor), #00f0ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .logoI {
    float: left;
    padding: 5px;
    font-size: 30px;
  }
}
</style>
