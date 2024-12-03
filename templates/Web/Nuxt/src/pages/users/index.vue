<template>
  <div>
    <div>
      <button @click="newUser">New user</button>
      <button @click="refreshPage">Refresh</button>
      <button @click="deleteSelectedUsers">Delete</button>
    </div>

    <div>{{ users.length }} result{{ users.length > 1 ? "s" : "" }} found.</div>

    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Name</th>
            <th>Created time</th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="users.length === 0">
            <td colspan="4" style="text-align: center">No data available.</td>
          </tr>

          <tr v-else v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.createdTime }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
const users = ref([
  {
    id: "1",
    email: "someone@example.com",
    name: "AspNetApp User",
    createdTime: new Date(),
  },
  {
    id: "2",
    email: "anotherone@example.com",
    name: "AspNetApp User 2",
    createdTime: new Date(),
  },
]);

const refreshPage = () => {
  console.log("Refresh page");
};

const deleteSelectedUsers = () => {
  console.log("Delete user");
};

const newUser = () => {
  console.log("New user");
};
</script>

<style></style>
