<template>
  <div>
    <Navbar />
    <div class="">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' },
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' },
        },
        {
          title: 'Login',
          icon: 'lightbulb',
          to: { name: 'login' },
        },
      ],
    }
  },
  methods: {
    async fetchSomething() {
      const ip = await this.$axios
        .$post('/api/user/login', { email: 'testemail', password: 'Pass123' })
        .then((res) => {
          return res
        })
      console.log(ip)
    },
  },
}
</script>

<style >
html {
  font-size: 100%;
  box-sizing: border-box;
}
*,
*::after,
*::before {
  box-sizing: inherit;
  /* border: 1px black solid; */
}
body {
  margin: 0;
  padding: 0;
  line-height: 1.3;
}
</style>
