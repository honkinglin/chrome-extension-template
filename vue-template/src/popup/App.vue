<template>
  <div id="app">
    <img
      src="../assets/logo.svg"
      width="200"
    >
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import event from '@/common/event'

export default {
  name: 'App',
  data () {
    return {
      msg: 'This is popup page!!!!!'
    }
  },
  created () {
    event.$emit('sync-page', null, true).then((data) => {
      console.log('sync-page', data)
    })
  }
}
</script>

<style lang="scss">
html, body {
  width: 600px;
  height: 600px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
