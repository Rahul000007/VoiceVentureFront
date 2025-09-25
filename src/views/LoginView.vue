<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="text" class="form-control" required />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    ...mapActions(["login"]),
    async loginUser() {
      try {
        await this.login({email: this.email, password: this.password});
        this.$router.push("/call");
      } catch (error) {
        alert(error)
        this.$toast.error(error);
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
}
</style>
