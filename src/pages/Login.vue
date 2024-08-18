<template>
    <div class="login-container d-flex justify-content-center align-items-center vh-100">
      <div class="card p-4 shadow-lg">
        <h1 class="text-center mb-4 font-weight-bold">部立彰化醫院</h1>
        <h3 class="text-center mb-4">疫苗快打</h3>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="username">帳號:</label>
            <input type="text" class="form-control" v-model="username" required />
          </div>
          <div class="form-group">
            <label for="password">密碼:</label>
            <input type="password" class="form-control" v-model="password" required />
          </div>
          <button type="submit" class="btn btn-primary btn-block mt-4">登入</button>
        </form>
        <p v-if="errorMessage" class="text-danger text-center mt-3">{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import router from '../router';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        errorMessage: '',
      };
    },
    methods: {
      async login() {
        try {
            const response = await axios.get('/api/api-health-check');
            console.log(response.data);
        //   const response = await axios.post('https://your-api-url.com/login', {
        //     username: this.username,
        //     password: this.password,
        //   });
  
          if (response.data.success) {
            localStorage.setItem('token', 'token');
            router.push({ path: '/dashboard' });
          }
        } catch (error) {
          this.errorMessage = 'Invalid username or password.';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    background-color: #f8f9fa;
  }
  
  .card {
    width: 100%;
    max-width: 400px;
    border-radius: 10px;
  }
  
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
  }
  
  .text-danger {
    font-size: 0.9rem;
  }
  </style>