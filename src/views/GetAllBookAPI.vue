<template>
    <div class="container">
      <h1>All Books</h1>
      <!-- Display error message if there's any -->
      <p v-if="error">{{ error }}</p>
  
      <!-- If book data is available, display the list -->
      <ul v-if="books.length">
        <li v-for="book in books" :key="book.id">
          {{ book.name }} - ISBN: {{ book.isbn }}
        </li>
      </ul>
  
      <!-- If no book data is available, display a message -->
      <p v-else>No books available.</p>
    </div>
  </template>
  
  <script>
  import { getDocs, collection } from 'firebase/firestore';
  import db from '../firebase/init.js'; // 确保使用了正确的 Firebase 初始化文件
  
  export default {
    data() {
      return {
        books: [], // Array to store the book data from Firestore
        error: null, // To store any error messages
      };
    },
    mounted() {
      this.fetchBooks(); // Fetch books when component is mounted
    },
    methods: {
      async fetchBooks() {
        try {
          const querySnapshot = await getDocs(collection(db, 'books')); // Fetch books from Firestore
          this.books = []; // Clear the existing list
          querySnapshot.forEach((doc) => {
            this.books.push({ id: doc.id, ...doc.data() }); // Push each book to books array
          });
          if (this.books.length === 0) {
            this.error = "No books found."; // Show error if no books found
          } else {
            this.error = null; // Clear any previous error
          }
        } catch (error) {
          console.error('Error fetching books:', error);
          this.error = 'Failed to load books'; // Set error message
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin: 10px 0;
    font-size: 18px;
  }
  </style>
  
  