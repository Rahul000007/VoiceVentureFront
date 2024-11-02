<!--src/Views/RegisterView.vue-->
<template>
  <div class="register-container">
    <h2>Register</h2>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label>Full Name</label>
        <input v-model="fullName" type="text" class="form-control" required />
      </div>
      <div class="form-group">
        <label>Username</label>
        <input v-model="username" type="text" class="form-control" required />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" class="form-control" required />
      </div>
      <div class="form-group">
        <label>Phone Number</label>
        <input v-model="phoneNumber" type="text" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      fullName: "",
      username: "",
      email: "",
      password: "",
      phoneNumber: "",
    };
  },

  methods: {
    ...mapActions(["register"]),
    async registerUser() {
      try {
        await this.register({
          fullName: this.fullName,
          username: this.username,
          email: this.email,
          password: this.password,
          phoneNumber: this.phoneNumber
        });
        this.$toast.success('Registration successful! Please log in.');
        this.$router.push("/login"); // Redirect to login page after successful registration
      } catch (error) {
        this.$toast.error(error.response?.data?.message || "Registration failed!");
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
