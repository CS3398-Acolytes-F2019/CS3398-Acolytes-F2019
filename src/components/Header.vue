<template>
    <header class="header">
        <h1>File Trust</h1>
        <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    </header>
</template>

<script>
export default {
    name: "Header"
}
</script>

<style scoped>
    .header{
        background : #F08080;
        color: #fff;
        text-align: right;
        padding: 10px
        }

    
    
</style>