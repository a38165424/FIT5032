<template>
    <!-- Using Bootstrap's Header template (starter code) -->
    <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
    <div class="container">
      <header class="d-flex justify-content-center py-3">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active" aria-current="page"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link" active-class="active">About</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="Firelogin" class = "nav-link" active-calss="active">Firebase Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="FireRegister" class = "nav-link" active-calss="active">Firebase Register</router-link>
          </li>
          <li class="nav-item">
            <router-link to="addbook" class = "nav-link" active-calss="active">Add Book</router-link>
          </li>
        </ul>
      </header>
    </div>
</template>
