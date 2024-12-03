<template>
  <div>
    <div>
      <button>New signal source</button>
      <button>Refresh</button>
      <button>Delete</button>
    </div>

    <div></div>

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
          <tr v-for="user of users" x:key="user.id">
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
</script>

<style></style>
