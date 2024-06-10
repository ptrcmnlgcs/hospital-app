<template>
    <div class="p-4">
      <h1>Edit Profile</h1>
      <div v-if="!isEditing">
        <table class="table">
          <tbody>
            <tr>
              <th scope="row">Name:</th>
              <td>{{ user.name }}</td>
            </tr>
            <tr>
              <th scope="row">Email:</th>
              <td>{{ user.email }}</td>
            </tr>
            <tr>
              <th scope="row">Phone:</th>
              <td>{{ user.phone }}</td>
            </tr>
            <tr>
              <th scope="row">Username:</th>
              <td>{{ user.username }}</td>
            </tr>
          </tbody>
        </table>
        <button class="btn btn-primary animated-button" @click="isEditing = true">Edit</button>
      </div>
      <form v-else @submit.prevent="updateProfile">
        <table class="table">
          <tbody>
            <tr>
              <th scope="row">Name:</th>
              <td><input type="text" class="form-control" v-model="user.name" required /></td>
            </tr>
            <tr>
              <th scope="row">Email:</th>
              <td><input type="email" class="form-control" v-model="user.email" required /></td>
            </tr>
            <tr>
              <th scope="row">Phone:</th>
              <td><input type="text" class="form-control" v-model="user.phone" required /></td>
            </tr>
            <tr>
              <th scope="row">Username:</th>
              <td><input type="text" class="form-control" v-model="user.username" required /></td>
            </tr>
            <tr>
              <th scope="row">Password:</th>
              <td><input type="password" class="form-control" v-model="user.password" placeholder="Enter new password" /></td>
            </tr>
          </tbody>
        </table>
        <button type="submit" class="btn btn-primary animated-button">Update Profile</button>
        <button type="button" class="btn btn-secondary animated-button" @click="cancelEdit">Cancel</button>
      </form>
      <transition name="fade">
        <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
      </transition>
      <transition name="fade">
        <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
      </transition>
    </div>
  </template>
  
  <script>
  import { BASE_URL } from "@/config";
  import axios from "axios";
  
  export default {
    data() {
      return {
        user: {
          name: "",
          email: "",
          phone: "",
          username: "",
          password: ""
        },
        successMessage: "",
        errorMessage: "",
        isEditing: false
      };
    },
    methods: {
      async updateProfile() {
        try {
          const token = localStorage.getItem("token");
          await axios.put(`${BASE_URL}/api/user`, this.user, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          // Handle successful update
          this.successMessage = "Profile updated successfully!";
          setTimeout(() => {
            this.successMessage = "";
          }, 2000);
          this.isEditing = false;
        } catch (error) {
          // Handle error
          if (error.response) {
            this.errorMessage = 'An error occurred: ' + error.response.data.message;
          } else if (error.request) {
            this.errorMessage = 'No response received from the server.';
          } else {
            this.errorMessage = 'Error: ' + error.message;
          }
          setTimeout(() => {
            this.errorMessage = "";
          }, 5000);
        }
      },
      fetchUserProfile() {
        const token = localStorage.getItem("token");
        axios
          .get(`${BASE_URL}/api/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.user = response.data;
          })
          .catch((error) => {
            console.error("There was an error fetching the user profile:", error);
          });
      },
      cancelEdit() {
        this.isEditing = false;
        this.fetchUserProfile();
      }
    },
    created() {
      this.fetchUserProfile();
    },
  };
  </script>
  
  <style scoped>
  /* Navbar styles */
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
  