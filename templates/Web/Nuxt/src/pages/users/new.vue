<template>
  <div>
    <h1>New user</h1>

    <form @submit.prevent="createUser">
      <div class="form-group">
        <label>Email:</label>
        <input
          type="email"
          v-model="form.email"
          placeholder="Enter user email"
          required
        />
      </div>

      <div class="form-group">
        <label>Name:</label>
        <input
          type="text"
          v-model="form.name"
          placeholder="Enter user name"
          required
        />
      </div>

      <div class="form-group">
        <label>Password:</label>
        <input
          type="password"
          v-model="form.password"
          placeholder="Enter user password"
          required
        />
      </div>

      <div class="form-group">
        <button type="submit" :disabled="isBusy">Create</button>
        <button type="button" :disabled="isBusy" @click="navigateTo('/users')">
          Back
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
const isBusy = ref(false);

const form = reactive({
  email: "",
  name: "",
  password: "",
});

const createUser = async () => {
  isBusy.value = true;

  try {
    let formData = JSON.stringify(form);
    alert(formData);
    navigateTo("/users");
  } catch (error) {
    alert("An unexpected error occurred.");
  } finally {
    isBusy.value = false;
  }
};
</script>

<style scoped lang="scss">
.form-group {
  display: flex;
  flex-direction: row;
}

label {
  font-weight: bold;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
