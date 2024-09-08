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
  import { loginApi,GetToken,DivisionData,CheckVacc } from '@/api';
  
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
          // const response = await GetToken();
          // console.log(response);
          // if(response.status===200)
          //   localStorage.setItem('token', response.data);
          // else
          //   throw "連線失敗";

          // var div = await DivisionData();
          // console.log(div);
          
          
          
          var login =await loginApi(this.username,this.password);
          console.log(login);
          
          if(login.data.success){
            localStorage.setItem('token', login.data.result.token);
            router.push({ path: '/dashboard' });
          }
          else
            throw login.data.message;
          

        } catch (error) {
          this.errorMessage = error;
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