<template>
  <nav class="navbar">
    <div class="container d-flex justify-content-end">
      <ul class="nav">
        <li class="nav-item"><router-link to="/profile" class="nav-link">Profile</router-link></li>
        <li class="nav-item"><router-link to="/doctor" class="nav-link">Doctor</router-link></li>
        <li class="nav-item"><router-link to="/patient" class="nav-link">Patient</router-link></li>
        <li class="nav-item"><router-link to="/appointment" class="nav-link">Appointment</router-link></li>
        <li class="nav-item"><router-link to="/medical-records" class="nav-link">Medical Records</router-link></li>
        <li class="nav-item"><router-link to="/logout" class="nav-link">Logout</router-link></li>
      </ul>
    </div>
  </nav>
  <router-view />
</template>

<script>
export default {
  name: 'App'
};
</script>

<style scoped>
.navbar {
  background-color: #333;
  padding: 1rem;
}

.nav {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
}

.nav-item {
  display: inline;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #ddd;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
