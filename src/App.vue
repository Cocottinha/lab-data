<template>
  <nav>   
    
    <router-link to="/" class="logo"><img src="../src/assets/icon.svg" width="36px" class="logoI"/>Lab.Data</router-link>
    <router-link to="/about" class="item">About</router-link>
    <router-link to="/posts" class="item">Posts</router-link>
    <router-link to="/login" class="item">Login</router-link>   
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
  margin-left: 40px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-size: 18px;

  .icon {
    margin-left: 10px;
    width: 40px;
    min-width: 40px;
    font-size: 18px;
    text-align: left;
    display: flex;
    flex-direction: row;
  }

  a {
    font-weight: bold;
    color: #2c3e50;
    padding: 20px;
    cursor: pointer;
    text-decoration: none;
    
    
  }
  .item{
    font-size: 20px;
    margin-top: 8px;
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
