<template>
  <div>
    <template>
      <b-navbar>
        <template #brand>
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            <img
              src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
              alt="Lightweight UI components for Vue.js based on Bulma"
            />
          </b-navbar-item>
        </template>
        <template #start>
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            Home
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/about' }">
            About
          </b-navbar-item>
          <b-navbar-dropdown label="Info">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
              About
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
              Contact
            </b-navbar-item>
          </b-navbar-dropdown>
        </template>

        <template #end>
          <b-navbar-item tag="div">
            <div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light" v-on:click="fetchSomething()">
                Log in
              </a>
            </div>
          </b-navbar-item>
        </template>
      </b-navbar>
    </template>
    <section class="main-content columns">
      <aside class="column is-2 section">
        <p class="menu-label is-hidden-touch">General</p>
        <ul class="menu-list">
          <li v-for="(item, key) of items" :key="key">
            <nuxt-link :to="item.to" exact-active-class="is-active">
              <b-icon :icon="item.icon" /> {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
      </aside>

      <div class="container column is-10">
        <nuxt />
      </div>
    </section>
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

<style scoped>
</style>
