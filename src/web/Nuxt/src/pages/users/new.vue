<template>
  <div>
    <form @submit.prevent="submit">
      <div class="form-group">
        <label>Email</label>
        <input
          type="email"
          v-model="newUser.email"
          placeholder="someone@example.com"
        />
      </div>

      <div class="form-group">
        <label>Name</label>
        <input type="text" v-model="newUser.name" />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input type="password" v-model="newUser.password" />
      </div>

      <div class="form-group">
        <button type="submit" class="primary-button">Submit</button>
        <button
          type="button"
          class="secondary-button"
          @click="navigateTo('/users')"
        >
          Back
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const { $resources } = useNuxtApp();

const newUser = ref({
  email: "",
  name: "",
  password: "",
});

const submit = async () => {
  try {
    const createdResponse = await $resources.createUser({
      email: newUser.value.email,
      name: newUser.value.name,
      password: newUser.value.password,
    });

    alert(`User created: ${createdResponse.id}`);
    navigateTo("/users");
  } catch (error) {
    alert(`Failed to create user: ${error}`);
  }
};
</script>
<style scoped lang="scss">
.form-group {
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.form-group label {
  font-family: Arial, sans-serif;
  font-size: 1rem;
  font-weight: 500;
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ced4da;
}

.form-group button {
  margin-right: 1rem;
  min-width: 100px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 0.25rem;
  border: none;
}

.primary-button {
  background-color: #007bff;
  color: white;
}

.secondary-button {
  background-color: #6c757d;
  color: white;
}
</style>
