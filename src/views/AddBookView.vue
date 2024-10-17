<template>
  <div class="container">
    <h1>Add Book</h1>
    <form @submit.prevent="addBook" class="form">
      <div class="form-group">
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="isbn" id="isbn" required placeholder="Enter ISBN" />
      </div>
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required placeholder="Enter Book Name" />
      </div>
      <button type="submit" class="btn btn-primary">Add Book</button>
    </form>

    <h2>Book List</h2>
    <ul class="book-list">
      <li v-for="book in books" :key="book.id" class="book-item">
        <span>{{ book.name }} (ISBN: {{ book.isbn }})</span>
        <button @click="editBook(book)" class="btn btn-secondary">Edit</button>
        <button @click="deleteBook(book.id)" class="btn btn-danger">Delete</button>
      </li>
    </ul>

    <h2>Set Query Conditions</h2>
    <form @submit.prevent="queryBooks" class="form">
      <div class="form-group">
        <label for="isbnCondition">ISBN Condition:</label>
        <select v-model="isbnCondition" class="input-select">
          <option value=">">Greater than</option>
          <option value="<">Less than</option>
          <option value="==">Equal to</option>
        </select>
        <input type="number" v-model.number="isbnValue" placeholder="ISBN value" class="input-text" />
      </div>

      <div class="form-group">
        <label for="order">Order By:</label>
        <select v-model="order" class="input-select">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div class="form-group">
        <label for="limit">Limit:</label>
        <input type="number" v-model.number="limitValue" min="1" placeholder="Enter limit" class="input-text" />
      </div>

      <button type="submit" class="btn btn-search">Search</button>
    </form>

    <h2>Filtered Books</h2>
    <ul class="book-list">
      <li v-for="book in filteredBooks" :key="book.id" class="book-item">
        {{ book.name }} (ISBN: {{ book.isbn }})
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import db from '../firebase/init.js';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, orderBy, limit } from 'firebase/firestore';

export default {
  setup() {
    const isbn = ref('');
    const name = ref('');
    const books = reactive([]);
    const filteredBooks = reactive([]);

    // Query conditions state
    const isbnCondition = ref('>'); // Default condition
    const isbnValue = ref(0); // Default value
    const order = ref('desc'); // Default order
    const limitValue = ref(5); // Default limit

    // Add a new book to Firestore
    const addBook = async () => {
      try {
        const isbnNumber = Number(isbn.value);
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number');
          return;
        }

        await addDoc(collection(db, 'books'), {
          isbn: isbnNumber,
          name: name.value
        });

        isbn.value = '';
        name.value = '';
        alert('Book added successfully!');
        fetchBooks(); // Refresh the book list after adding
      } catch (error) {
        console.error('Error adding book: ', error);
      }
    };

    // Fetch all books from Firestore
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'books'));
        books.length = 0; // Clear the existing list
        querySnapshot.forEach((doc) => {
          books.push({ id: doc.id, ...doc.data() });
        });
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    // Edit a book's details
    const editBook = async (book) => {
      const newName = prompt('Enter new name:', book.name);
      if (newName) {
        try {
          await updateDoc(doc(db, 'books', book.id), {
            name: newName
          });
          alert('Book updated successfully!');
          fetchBooks(); // Refresh the book list after update
        } catch (error) {
          console.error('Error updating book:', error);
        }
      }
    };

    // Delete a book from Firestore
    const deleteBook = async (id) => {
      try {
        await deleteDoc(doc(db, 'books', id));
        alert('Book deleted successfully!');
        fetchBooks(); // Refresh the book list after deletion
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    };

    // Query books with user-defined conditions
    const queryBooks = async () => {
      try {
        const q = query(
          collection(db, 'books'),
          where('isbn', isbnCondition.value, isbnValue.value), // Use user-defined condition
          orderBy('isbn', order.value), // Order based on user selection
          limit(limitValue.value) // Limit results based on user input
        );

        const querySnapshot = await getDocs(q);
        filteredBooks.length = 0; // Clear the existing list
        querySnapshot.forEach((doc) => {
          filteredBooks.push({ id: doc.id, ...doc.data() });
        });

        if (filteredBooks.length === 0) {
          alert('No books found with the given criteria.');
        }
      } catch (error) {
        console.error('Error retrieving books with queries:', error);
      }
    };

    // Fetch books when the component is mounted
    onMounted(() => {
      fetchBooks();
    });

    return {
      isbn,
      name,
      books,
      filteredBooks,
      addBook,
      editBook,
      deleteBook,
      queryBooks,
      isbnCondition,
      isbnValue,
      order,
      limitValue
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.input-text,
.input-select {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.book-list {
  list-style: none;
  padding: 0;
}

.book-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  margin-bottom: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.btn {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-search {
  background-color: #28a745;
  color: white;
}
</style>
