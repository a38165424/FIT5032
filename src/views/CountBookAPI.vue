<template>
  <div id="app">
    <h1>Book Counter</h1>
    <!-- Display JSON data with <pre> tag -->
    <pre v-if="jsondata">{{ jsondata }}</pre>
    <!-- Display error if there is any -->
    <p v-if="error">{{ error }}</p>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      jsondata: null,  // Store the API response data
      error: null,     // Store error messages
    };
  },
  mounted() {
    this.getBookCountAPI();  // Automatically call API on page load
  },
  methods: {
    async getBookCountAPI() {
      try {
        const response = await axios.get('https://countbooks-shrjweduqq-uc.a.run.app');
        this.jsondata = response.data;  // Only store response.data
        this.error = null;
      } catch (error) {
        console.error('Error fetching book count:', error);
        this.error = 'Error fetching data';  // Display error message
        this.jsondata = null;  // Clear jsondata if there is an error
      }
    },
  },
};
</script>
<style scoped>
#app {
  text-align: center;
  margin-top: 50px;
}
</style>
