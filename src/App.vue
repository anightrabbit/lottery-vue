<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import axios from './model/base.model'
export default {
  name: 'App',
  created () {
    const { code, token } = this.$route.query
    if (code) axios.defaults.headers.common['X-Prize-Code'] = code
    if (token) {
      axios.defaults.headers.common.Authorization = 'Bearer ' + token
      localStorage.setItem('token', token)
    }
  }
}
</script>
<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
