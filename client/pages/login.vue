  <template>
  <section class="login-container">
    <b-field label="Email">
      <b-input type="email" maxlength="30" v-model="email"> </b-input>
    </b-field>
    <b-field label="Password">
      <b-input type="password" maxlength="30" v-model="password"></b-input>
    </b-field>
    <b-button @click="login(email, password)">Login</b-button>
  </section>
</template>


<script>
import jwt_decode from 'jwt-decode'
export default {
  data() {
    return {
      email: null,
      password: null,
    }
  },
  methods: {
    async login(email, password) {
      const res = await this.$axios.$post('/api/user/login', {
        email: email,
        password: password,
      })
      localStorage.setItem('Token', res.token)
      const decodedToken = jwt_decode(res.token)
      this.$store.commit('User/loadUser', decodedToken)
    },
  },
}
</script>

<style>
.login-container {
  margin-left: 40em;
  margin-right: 40em;
}
</style>