<template>
    <div>
      <h2>Book List</h2>
      <ul v-if="books.length > 0">
        <li v-for="book in books" :key="book.id">
          ISBN: {{ book.isbn }}, Name: {{ book.name }}
        </li>
      </ul>
      <p v-else>No books available. Add some books to see them listed here.</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { collection, getDocs } from 'firebase/firestore';
  import db from '../firebase/init.js';
  
  export default {
    setup() {
      const books = ref([]);
  
      // Function to fetch books from Firestore
      const fetchBooks = async () => {
        try {
          // Get all documents from the 'books' collection
          const querySnapshot = await getDocs(collection(db, 'books'));
          // Map the documents into a list of book objects
          books.value = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      };
  
      // Fetch books when the component is mounted
      onMounted(fetchBooks);
  
      return {
        books,
      };
    },
  };
  </script>
  
  <style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin: 5px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  p {
    color: #888;
    font-style: italic;
  }
  </style>
  