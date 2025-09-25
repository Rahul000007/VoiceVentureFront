<!--src/Views/RegisterView.vue-->
<template>
  <div class="register-container">
    <h2>Register</h2>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label>Name</label>
        <input v-model="name" type="text" class="form-control" required />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" class="form-control" />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" class="form-control" required />
      </div>
      <button type="submit" class="mt-3 btn btn-primary">Register</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },

  methods: {
    ...mapActions(["register"]),
    async registerUser() {
      try {
      const response =  await this.register({
          name: this.name,
          email: this.email,
          password: this.password,
        });
        console.log(response.data?.message);
        this.$toast.success(response.data.message);
        this.$router.push("/login");
      } catch (error) {
        this.$toast.error(error.response?.data?.message);
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
}
</style>
