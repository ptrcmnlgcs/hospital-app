<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between mb-3">
      <h2>Patient List</h2>
      <router-link to="/add-patient">
        <button class="btn btn-primary">Add New Patient</button>
      </router-link>
    </div>
    <table class="table table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th width="15%">Name</th>
          <th width="15%">Email</th>
          <th width="15%">Phone</th>
          <th width="15%">Date of Birth</th>
          <th width="10%">Gender</th>
          <th width="20%">Doctor Name</th>
          <th width="10%">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="patient in patients" :key="patient.id">
          <td>{{ patient.name }}</td>
          <td>{{ patient.email }}</td>
          <td>{{ patient.phone }}</td>
          <td>{{ patient.dob }}</td>
          <td>{{ patient.gender }}</td>
          <td>{{ patient.doctor_name }}</td>
          <td>
            <router-link :to="{ name: 'EditPatient', params: { id: patient.id } }">
              <button class="btn btn-success btn-sm mr-2">Edit</button>
            </router-link>
            <button @click="confirmDelete(patient.id)" class="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { BASE_URL } from "@/config";
import axios from "axios";

export default {
  data() {
    return {
      patients: [],
    };
  },
  methods: {
    fetchPatients() {
      axios
        .get(`${BASE_URL}/api/get`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.patients = response.data.patients;
        })
        .catch((error) => {
          console.error("There was an error fetching the patients:", error);
        });
    },
    confirmDelete(id) {
      if (confirm("Are you sure you want to delete this patient?")) {
        this.deletePatient(id);
      }
    },
    deletePatient(id) {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      axios
        .delete(`${BASE_URL}/api/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          this.fetchPatients();
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 403) {
              alert("You don't have access to delete this patient.");
            } else {
              alert("An error occurred: " + error.response.data.message);
            }
          } else if (error.request) {
            alert("No response received from the server.");
          } else {
            alert("Error: " + error.message);
          }
        });
    },
  },
  mounted() {
    this.fetchPatients();
  },
};
</script>

<style scoped>
.container {
  max-width: 1000px;
}

.table {
  margin-top: 20px;
}

.thead-dark th {
  background-color: #343a40;
  color: white;
}

h2 {
  font-size: 24px;
  font-weight: bold;
}

.btn {
  margin-right: 0.5rem;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
}

.mt-5 {
  margin-top: 3rem;
}

.mb-3 {
  margin-bottom: 1rem;
}
</style>
