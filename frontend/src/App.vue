<template>
  <div id="app">
    <div id="nav">
      <!-- Menu -->
      <div class="ui top fixed teal inverted menu">
        <div class="item">
          <h5 class="header"><i class="vimeo icon"></i> VUE TEST</h5>
        </div>
        <router-link to="/" class="item">Home</router-link>
        <router-link to="/works" class="item">Work</router-link>
      </div><!-- .ui.menu -->
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    document.title = this.$route.meta.title
  },
  mounted() {
    $('.ui.dropdown').dropdown()
  },
  watch: {
    $route(to, from) {
      document.title = to.meta.title || 'Vue Test Page'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 35px;
}
</style>