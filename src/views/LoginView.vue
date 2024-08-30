<template>
    <div class="login-container">
      <div class="login-card">
        <h2 class="login-title">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              v-model="username"
              required
              placeholder="Enter your username"
              class="form-input"
            />
          </div>
          <div class="input-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              placeholder="Enter your password"
              class="form-input"
            />
          </div>
          <button type="submit" class="login-button">Login</button>
        </form>
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        <button v-if="isAuthenticated" @click="handleLogout" class="logout-button">Logout</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'LoginView',
    setup() {
      const username = ref('');
      const password = ref('');
      const error = ref(null);
      const isAuthenticated = ref(false);
      const router = useRouter();
  
      onMounted(() => {
        // Check if user is already authenticated
        isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true';
      });
  
      const handleLogin = () => {
        // Get registered credentials from localStorage
        const registeredUsername = localStorage.getItem('registeredUsername');
        const registeredPassword = localStorage.getItem('registeredPassword');
  
        if (username.value === registeredUsername && password.value === registeredPassword) {
          // Set authentication state
          localStorage.setItem('isAuthenticated', true);
          isAuthenticated.value = true;
          router.push({ name: 'About' }); // Redirect to protected page
        } else {
          error.value = 'Invalid username or password.';
        }
      };
  
      const handleLogout = () => {
        // Clear authentication state
        localStorage.removeItem('isAuthenticated');
        isAuthenticated.value = false;
        router.push({ name: 'Login' }); // Redirect to login page
      };
  
      return {
        username,
        password,
        error,
        isAuthenticated,
        handleLogin,
        handleLogout,
      };
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5; /* 默认背景颜色 */
  }
  
  .login-card {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 100%;
    text-align: center;
  }
  
  .login-title {
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    color: #333;
  }
  
  .input-group {
    margin-bottom: 1.5rem;
    text-align: left;
  }
  
  .form-input {
    width: 100%;
    padding: 0.75rem;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 1rem;
  }
  
  .form-input:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
  
  .login-button,
  .logout-button {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
  }
  
  .login-button:hover,
  .logout-button:hover {
    background-color: #0056b3;
  }
  
  .error-message {
    margin-top: 1rem;
    color: red;
    font-weight: bold;
  }
  </style>
  
  