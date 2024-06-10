<template>
    <div class="container mt-5">
      <h1>My Records</h1>
      <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
      <div class="card mb-3" v-if="patient">
        <div class="card-header">
          Personal Information
        </div>
        <div class="card-body">
          <h5 class="card-title">Name</h5>
          <p class="card-text">{{ patient.name }}</p>
          <h5 class="card-title">Email</h5>
          <p class="card-text">{{ patient.email }}</p>
          <h5 class="card-title">Phone</h5>
          <p class="card-text">{{ patient.phone }}</p>
          <h5 class="card-title">Date of Birth</h5>
          <p class="card-text">{{ patient.dob }}</p>
          <h5 class="card-title">Gender</h5>
          <p class="card-text">{{ patient.gender }}</p>
          <h5 class="card-title">Doctor Name</h5>
          <p class="card-text">{{ patient.doctor_name }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { BASE_URL } from "@/config";
  import axios from "axios";
  
  export default {
    data() {
      return {
        patient: null,
        errorMessage: "",
      };
    },
    methods: {
      fetchPatientRecords() {
        const token = localStorage.getItem("token");
        axios
          .get(`${BASE_URL}/api/get`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.patient = response.data;
          })
          .catch((error) => {
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
          });
      },
    },
    created() {
      this.fetchPatientRecords();
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin-top: 20px;
  }
  
  .card {
    margin-top: 20px;
  }
  
  .card-header {
    font-weight: bold;
  }
  </style>
  