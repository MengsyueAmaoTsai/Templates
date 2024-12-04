<template>
  <div>
    <div v-if="user" class="user-details">
      <p>Id: {{ user.id }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Name: {{ user.name }}</p>
      <p>Created time: {{ user.createdTime.toLocaleString() }}</p>
    </div>

    <button @click="navigateTo('/users')">Back to list</button>
  </div>
</template>

<script setup lang="ts">
const { $resources } = useNuxtApp();
const route = useRoute();
const userId = route.params.userId as string;

const user = ref(null);

onMounted(async () => {
  const result = await $resources.getUser(userId);

  user.value = {
    id: result.id,
    email: result.email,
    name: result.name,
    createdTime: new Date(result.createdTime),
  };
});
</script>

<style scoped lang="scss">
.user-details {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;

  font-size: 16px;
  h1 {
    color: #333;
  }

  div {
    margin-top: 20px;
    p {
      margin-bottom: 10px;
    }
  }
}
</style>
