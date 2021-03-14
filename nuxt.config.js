export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'NorbertCseh',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxt/http',
    '@nuxtjs/proxy'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://localhost:3000',
    proxy: true
  },

  // proxy: {
  //   // '/api/': { target: `http://localhost:${process.env.SERVER_PORT}/`, pathRewrite: { '^/api/': '' }, changeOrigin: true }
  //   //'/api/': { target: `http://localhost:${process.env.PORT}/` }
  //   '/api/': 'http://localhost.com/3000', changeOrigin: true
  // },

  /*
  ** Server Middleware
  */
  serverMiddleware: {
    '/api': '~/api'
  },

  /*
  ** For deployment you might want to edit host and port
  */
  server: {
    port: process.env.PORT, // default: 3000
    host: process.env.HOST // default: localhost
  },


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
