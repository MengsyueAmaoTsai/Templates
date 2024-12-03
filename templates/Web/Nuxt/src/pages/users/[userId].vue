<template>
  <div>
    <div v-if="user === null">
      <p>Loading...</p>
    </div>

    <div v-else class="user-details">
      <p><strong>ID:</strong> {{ user.id }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Created time:</strong> {{ user.createdTime }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const isBusy = ref(false);
const route = useRoute();
const userId = route.params.userId;

const user = ref<{
  id: string;
  email: string;
  name: string;
  createdTime: Date;
} | null>(null);

const getUserDetails = async () => {
  try {
    user.value = {
      id: userId as string,
      email: "test@gmail.com",
      name: "Test User",
      createdTime: new Date(),
    };
  } catch (err) {
    alert("Failed to fetch user details.");
  } finally {
    isBusy.value = false;
  }
};

onMounted(getUserDetails);
</script>

<style>
.user-details {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.actions button {
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.actions button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
