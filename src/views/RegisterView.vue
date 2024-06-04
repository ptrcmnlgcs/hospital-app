<template>
    <div class="container mt-5 w-25">
      <h4 class="text-center">Registration Form</h4>
      <form @submit.prevent="registerUser" class="registration-form">
        <div class="form-group mb-3">
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="name"
            @input="clearErrors('name')"
            placeholder="Enter name"
            required
          />
        </div>
        <div class="form-group mb-3">
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="email"
            @input="clearErrors('email')"
            placeholder="Enter email"
            required
          />
          <small class="text-danger" v-if="errors.email">{{ errors.email[0] }}</small>
        </div>
        <div class="form-group mb-3">
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
            @input="clearErrors('password')"
            placeholder="Password"
            required
          />
          <small class="text-danger" v-if="errors.password">{{ errors.password[0] }}</small>
        </div>
        <div class="form-group mb-3">
          <input
            type="password"
            class="form-control"
            id="confirm"
            v-model="confirm"
            placeholder="Confirm Password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary mt-3 w-100 register-button">Register</button>
      </form>
      <div class="col-12">
        <p class="mt-3 text-left">
          If you already have an account,
          <router-link to="/">login here</router-link>.
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        confirm: '',
        errors: {}
      };
    },
    methods: {
      async registerUser() {
        try {
          const response = await axios.post(this.$root.$data.apiUrl + '/register', {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.confirm
          });
          if (response.status === 201) {
            this.name = '';
            this.email = '';
            this.password = '';
            this.confirm = '';
            alert('Registration successful');
            this.$router.push('/');
          }
        } catch (error) {
          this.errors = error.response.data.errors;
        }
      },
      clearErrors(field) {
        this.errors[field] = null;
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    animation: fadeIn 1s ease-in-out;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h4 {
    color: #333;
    margin-bottom: 20px;
  }
  
  .form-control {
    height: 45px;
    border-radius: 5px;
    border: 1px solid #ccc;
    transition: border-color 0.3s;
  }
  
  .form-control:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
  
  .register-button {
    height: 45px;
    border-radius: 5px;
    background-color: #007bff;
    border-color: #007bff;
    transition: background-color 0.3s, transform 0.3s;
  }
  
  .register-button:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
  
  .registration-form {
    animation: slideIn 0.5s ease-in-out;
  }
  
  .text-left {
    text-align: left;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes slideIn {
    from {
      transform: translateY(10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  </style>
  