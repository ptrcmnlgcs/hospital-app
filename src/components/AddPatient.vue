<template>
  <div class="container p-4">
    <h1>Add New Patient</h1>
    <form @submit.prevent="addPatient">
      <div class="form-group mb-3">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="patient.name"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="patient.email"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label for="phone">Phone</label>
        <input
          type="text"
          class="form-control"
          id="phone"
          v-model="patient.phone"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label for="dob">Date of Birth</label>
        <input
          type="date"
          class="form-control"
          id="dob"
          v-model="patient.dob"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label for="gender">Gender</label>
        <select
          class="form-control"
          id="gender"
          v-model="patient.gender"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div class="form-group mb-3">
        <label for="doctor_name">Doctor Name</label>
        <input
          type="text"
          class="form-control"
          id="doctor_name"
          v-model="patient.doctor_name"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary animated-button">Add Patient</button>
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
      patient: {
        name: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        doctor_name: ""
      },
      successMessage: "",
      errorMessage: ""
    };
  },
  methods: {
    async addPatient() {
      try {
        const token = localStorage.getItem("token");
        await axios.post(`${BASE_URL}/api/add`, this.patient, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Handle successful addition
        this.successMessage = "Patient added successfully!";
        setTimeout(() => {
          this.successMessage = "";
          this.$router.push('/admin-view-patient');
          // Optionally redirect to another page
        }, 2000);
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
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  transition: transform 0.3s ease-in-out;
}

.container:hover {
  transform: scale(1.02);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.animated-button {
  transition: background-color 0.3s, transform 0.2s;
}

.animated-button:hover {
  background-color: #007bff;
  transform: translateY(-2px);
}

.animated-button:active {
  transform: translateY(1px);
}

.spinner-border {
  margin-right: 5px;
}
</style>