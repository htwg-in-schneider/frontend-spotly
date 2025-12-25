<template>
  <div class="admin-users-view">
    <div class="top-bar">
      <button @click="$router.push('/admin')" class="back-link">
        <span class="arrow">←</span> Dashboard
      </button>
      <div class="admin-badge">Admin-Modus</div>
    </div>

    <h1 class="page-title">Benutzer verwalten</h1>

    <div class="search-pill">
      <span class="icon">🔍</span>
      <input
          v-model="searchQuery"
          placeholder="Benutzer suchen..."
          class="search-input"
      />
    </div>

    <div class="table-card">
      <div class="table-header">
        <div class="col">Name</div>
        <div class="col">E-mail</div>
        <div class="col">Aktion</div>
      </div>

      <div class="table-body">
        <div v-if="filteredUsers.length === 0" class="no-data">
          Keine Benutzer gefunden.
        </div>

        <div v-for="user in filteredUsers" :key="user.id" class="table-row">
          <div class="col font-bold">{{ user.username }}</div>
          <div class="col email-cell">{{ user.email || 'keine@mail.de' }}</div>
          <div class="col actions">
            <button @click="toggleRole(user)" class="btn-small">sperren</button>
            <button @click="deleteUser(user)" class="btn-small btn-red">löschen</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      searchQuery: ''
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter(u =>
          u.username.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch('http://localhost:8080/api/users');
        if (!response.ok) throw new Error('Fehler beim Laden');
        this.users = await response.json();
      } catch (e) {
        console.error("Fehler:", e);
      }
    },

    async deleteUser(user) {
      if (confirm(`Sind Sie sicher, dass Sie den Benutzer "${user.username}" löschen wollen?`)) {
        try {
          const response = await fetch(`http://localhost:8080/api/users/${user.id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            this.fetchUsers();
          }
        } catch (e) {
          alert("Fehler beim Löschen.");
        }
      }
    },

    async toggleRole(user) {
      if (confirm(`Sind Sie sicher, dass Sie den Benutzer "${user.username}" sperren wollen?`)) {
        try {
          const response = await fetch(`http://localhost:8080/api/users/${user.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...user, role: 'LOCKED' })
          });

          if (response.ok) {
            alert("Benutzer wurde gesperrt.");
            this.fetchUsers();
          }
        } catch (e) {
          alert("Sperren fehlgeschlagen.");
        }
      }
    }
  }
}
</script>

<style scoped>
.admin-users-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: transparent;
  min-height: 80vh;
}

/* Neuer Top-Bar Bereich */
.top-bar {
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.back-link {
  background: none;
  border: none;
  color: #5daae0;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 16px;
  padding: 5px 0;
}

.back-link:hover {
  text-decoration: underline;
}

.admin-badge {
  background: rgba(93, 170, 224, 0.1);
  color: #5daae0;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

.page-title {
  color: #5daae0;
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 25px;
}

.search-pill {
  background: white;
  padding: 10px 20px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 280px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  margin-bottom: 35px;
}

.search-input {
  border: none;
  outline: none;
  margin-left: 10px;
  width: 100%;
}

.table-card {
  background: rgba(173, 216, 245, 0.5); /* Hellblau transparent */
  border-radius: 20px;
  width: 100%;
  max-width: 800px;
  overflow: hidden;
  backdrop-filter: blur(8px);
}

.table-header {
  display: grid;
  grid-template-columns: 1.2fr 2fr 1fr;
  padding: 15px 20px;
  font-weight: bold;
  color: #4a90e2;
  border-bottom: 1px solid rgba(255,255,255,0.3);
}

.table-row {
  display: grid;
  grid-template-columns: 1.2fr 2fr 1fr;
  padding: 15px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  align-items: center;
}

.font-bold { font-weight: 700; }

.email-cell {
  font-size: 14px;
  color: #444;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn-small {
  background: rgba(255, 255, 255, 0.6);
  border: none;
  padding: 6px 12px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

.btn-small:hover {
  background: white;
}

.btn-red {
  color: #ff4d4d;
}

.no-data {
  padding: 40px;
  text-align: center;
  color: #666;
}
</style>