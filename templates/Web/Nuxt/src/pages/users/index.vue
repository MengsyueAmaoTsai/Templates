<template>
  <div>
    <div class="command-buttons">
      <!-- Command buttons -->
      <button @click="newUser">New user</button>
      <button @click="refreshUsers">Refresh</button>
      <button @click="deleteSelectedUsers" :disabled="!selectedUserIds.length">
        Delete
      </button>
    </div>

    <!-- Statistics -->
    <div class="result-statistics">
      {{ users.length }} result{{ users.length === 1 ? "" : "s" }} found.
    </div>

    <!-- User list -->
    <div v-if="users.length === 0">No data available.</div>

    <div v-else>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                :checked="allSelected"
                @change="toggleAllUsers"
              />
            </th>
            <th>Id</th>
            <th>Email</th>
            <th>Name</th>
            <th>Created time</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>
              <input
                type="checkbox"
                :value="user.id"
                v-model="selectedUserIds"
              />
            </td>
            <td>{{ user.id }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.createdTime.toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
const selectedUserIds = ref<string[]>([]);

const allSelected = computed(() => {
  return selectedUserIds.value.length === users.value.length;
});

const users = ref([
  {
    id: "1",
    email: "user1@example.com",
    name: "User One",
    createdTime: new Date(),
  },
  {
    id: "2",
    email: "user2@example.com",
    name: "User Two",
    createdTime: new Date(),
  },
]);

const toggleAllUsers = (event: Event) => {
  if (!event.target) {
    return;
  }
  const target = event.target as HTMLInputElement;

  selectedUserIds.value = target.checked
    ? users.value.map((user) => user.id)
    : [];
};

const newUser = () => {
  navigateTo("/users/new");
};

const refreshUsers = () => {
  alert("Refreshing users...");
};

const deleteSelectedUsers = () => {
  let text = "";

  for (const userId of selectedUserIds.value) {
    text += userId + "\n";
  }

  alert("Deleting selected users:\n" + text);
};
</script>

<style>
.command-buttons {
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
}

.result-statistics {
  margin-bottom: 1rem;
  font-weight: bold;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}

th {
  background-color: #f9f9f9;
}

input[type="checkbox"] {
  margin: 0;
}
</style>
