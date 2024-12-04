<template>
  <div class="container">
    <div>
      <button @click="navigateTo('/users/new')">New user</button>
    </div>

    <div class="result-info">
      {{ users.length }} result{{ users.length === 1 ? "" : "s" }} found
    </div>

    <div class="search-bar">
      <input class="search-input" type="search" placeholder="Search" />
    </div>

    <div class="user-table">
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Email</td>
            <td>Name</td>
            <td>Created time</td>
          </tr>
        </thead>

        <tbody>
          <tr v-if="users.length === 0">
            <td colspan="4">No results.</td>
          </tr>

          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>
              <a :href="`/users/${user.id}`">
                {{ user.email }}
              </a>
            </td>
            <td>{{ user.name }}</td>
            <td>{{ user.createdTime.toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $resources } = useNuxtApp();

const users = ref<
  {
    id: string;
    email: string;
    name: string;
    createdTime: Date;
  }[]
>([]);

onMounted(async () => {
  const result = await $resources.listUsers();

  users.value = result.map((u) => ({
    id: u.id,
    email: u.email,
    name: u.name,
    createdTime: new Date(u.createdTime),
  }));
});
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* Header with button */
.header {
  text-align: right;
  margin-bottom: 20px;
}

.new-user-btn {
  padding: 10px 20px;
  font-size: 14px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.new-user-btn:hover {
  background-color: #45a049;
}

/* Information about search results */
.result-info {
  font-size: 16px;
  margin-bottom: 20px;
  color: #333;
}

/* Search bar */
.search-bar {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

/* User table */
.user-table table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.user-table table thead {
  background-color: #f4f4f4;
  color: #333;
}

.user-table table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

.user-table table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.user-table table tr:hover {
  background-color: #f1f1f1;
}

.user-table table td[colspan="4"] {
  text-align: center;
  color: #888;
}

button {
  padding: 10px 20px;
  font-size: 14px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

button:active {
  background-color: #3e8e41;
}

button:focus {
  outline: none;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:disabled:hover {
  background-color: #ccc;
}
</style>
