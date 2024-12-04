<template>
  <div style="display: flex">
    <button>New user</button>
    <button>Delete</button>
    <button>Refresh</button>
  </div>

  <div>
    <input type="search" placeholder="Search" />
  </div>

  <div>
    <p>{{ users.length }} user{{ users.length > 1 ? "s" : "" }} found</p>
  </div>

  <table>
    <thead>
      <tr>
        <th>
          <input type="checkbox" />
        </th>
        <th>Id</th>
        <th>Email</th>
        <th>Name</th>
        <th>Created time</th>
      </tr>
    </thead>

    <tbody>
      <tr v-if="users.length === 0">
        <td>No results.</td>
      </tr>

      <tr v-for="user in users" :key="user.id">
        <td>
          <input type="checkbox" />
        </td>
        <td>{{ user.id }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.createdTime.toLocaleString() }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
const users = ref([
  {
    id: "UID0000001",
    email: "mengsyue.tsai@outlook.com",
    name: "Meng Syue Tsai",
    createdTime: new Date(),
  },
  {
    id: "UID0000002",
    email: "mengsyue.tsai@gmail.com",
    name: "Meng Syue Tsai",
    createdTime: new Date(),
  },
  {
    id: "UID0000003",
    email: "someone@example.com",
    name: "Some one",
    createdTime: new Date(),
  },
]);
</script>
