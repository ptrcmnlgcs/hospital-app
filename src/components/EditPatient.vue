<template>
  <div class="container p-4">
    <h1 class="animate__animated animate__fadeInDown">Edit Patient</h1>
    <form @submit.prevent="updatePatient" class="animate__animated animate__fadeInUp">
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
        <label for="age">Age</label>
        <input
          type="number"
          class="form-control"
          id="age"
          v-model="patient.age"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label for="gender">Gender</label>
        <select class="form-control" id="gender" v-model="patient.gender" required>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="form-group mb-3">
        <label for="diagnosis">Diagnosis</label>
        <textarea
          class="form-control"
          id="diagnosis"
          v-model="patient.diagnosis"
          rows="5"
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary animated-button">Update</button>
    </form>
    <transition name="fade">
      <div v-if="successMessage" class="alert alert-success mt-3 animate__animated animate__fadeIn">{{ successMessage }}</div>
    </transition>
    <transition name="fade">
      <div v-if="errorMessage" class="alert alert-danger mt-3 animate__animated animate__fadeIn">{{ errorMessage }}</div>
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
        age: null,
        gender: "male",
        diagnosis: "",
      },
      successMessage: "",
      errorMessage: ""
    };
  },
  created() {
    this.fetchPatient();
  },
  methods: {
    async fetchPatient() {
      try {
        const patientId = this.$route.params.id;
        const response = await axios.get(`${BASE_URL}/api/get/${patientId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.patient = response.data.patient;
      } catch (error) {
        console.error("Error fetching patient:", error);
        this.errorMessage = "An error occurred while fetching the patient.";
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      }
    },
    async updatePatient() {
      try {
        const patientId = this.$route.params.id;
        const response = await axios.put(
          `${BASE_URL}/api/update/${patientId}`,
          this.patient,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // Handle successful update, e.g., redirect or show a success message
        console.log("Response:", response.data);
        this.successMessage = "Patient updated successfully!";
        this.errorMessage = "";
        setTimeout(() => {
          this.successMessage = "";
          this.$router.push({ name: '/admin-view-patient' });
        }, 2000);
      } catch (error) {
        if (error.response) {
          console.error("Error response:", error.response.data);
          this.errorMessage = 'An error occurred: ' + error.response.data.message;
        } else if (error.request) {
          console.error("Error request:", error.request);
          this.errorMessage = 'No response received from the server.';
        } else {
          console.error("Error message:", error.message);
          this.errorMessage = 'Error: ' + error.message;
        }
        this.successMessage = "";
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      }
    },
  },
};
</script>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.alert {
  margin-top: 20px;
}
</style>
