<template lang="html">
  <div id="workPage">
    {{ message }}
    
    <div>{{ data }}</div>
    <div class="ui button">test</div>
  </div>
</template>

<script>
export default {
  name: 'WorkPage',
  data() {
    return {
      message: 'test message',
      data: []
    }
  },
  mounted() {
    this.apiGetTest()
  },
  methods: {
    apiGetTest() {
      return this.$http.get('/api/works/test')
        .then((response) => {
          this.data = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
  }
}
</script>

<style lang="css">
</style>