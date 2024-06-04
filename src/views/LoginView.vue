<template>
    <div class="container mt-5 col-3">
      <div class="row">
        <h4>Enter your email and password</h4>
        <form @submit.prevent="loginUser" class="col-12">
          <div class="form-group mt-3">
            <input 
              type="email" 
              class="form-control" 
              id="email" 
              v-model="email" 
              placeholder="Enter email" 
              required 
              @input="clearErrors"
            >
            <small class="text-danger" v-if="errors">{{ errors }}</small>
          </div>
          <div class="form-group mt-3">
            <input 
              type="password" 
              class="form-control" 
              id="password" 
              v-model="password" 
              placeholder="Password" 
              required 
              @input="clearErrors"
            >
          </div>
          <button 
            type="submit" 
            class="btn btn-primary mt-3 w-100" 
            @click="buttonClick"
            :class="{ 'clicked': isClicked }"
          >
            Login
          </button>
        </form>
      </div>
      <div class="row">
        <div class="col-12">
          <p class="mt-3 text-left">
            Don't have an account? 
            <router-link to="/register">Register here!</router-link>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        errors: null,
        isClicked: false
      };
    },
    methods: {
      async loginUser() {
        try {
          const response = await axios.post(this.$root.$data.apiUrl + '/login', {
            email: this.email,
            password: this.password
          });
          if (response.status === 201) {
            localStorage.setItem('token', response.data.token);
            this.$router.push('/home');
          }
        } catch (error) {
          this.errors = error.response.data.message;
        }
      },
      clearErrors() {
        this.errors = null;
      },
      buttonClick() {
        this.isClicked = true;
        setTimeout(() => {
          this.isClicked = false;
        }, 200);
      }
    }
  };
  </script>
  
  <style>
  .container {
    max-width: 400px;
  }
  
  .clicked {
    animation: button-click 0.2s ease;
  }
  
  @keyframes button-click {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(1);
    }
  }
  </style>
  