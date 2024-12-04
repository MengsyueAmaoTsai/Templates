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
        <th @click="sortByField('id')">Id</th>
        <th @click="sortByField('email')">Email</th>
        <th @click="sortByField('name')">Name</th>
        <th @click="sortByField('createdTime')">Created time</th>
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

// Sorting
const sortBy = ref("id");
const orderBy = ref("asc");

const sortByField = (fieldName: string) => {
  if (sortBy.value === fieldName) {
    orderBy.value = orderBy.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = fieldName;
    orderBy.value = "asc";
  }

  users.value.sort((a, b) => {
    let aValue = a[fieldName];
    let bValue = b[fieldName];

    if (fieldName === "createdTime") {
      aValue = new Date(a[fieldName]);
      bValue = new Date(b[fieldName]);
    }

    if (aValue < bValue) {
      return orderBy.value === "asc" ? -1 : 1;
    } else if (aValue > bValue) {
      return orderBy.value === "asc" ? 1 : -1;
    } else {
      return 0;
    }
  });
};
</script>
