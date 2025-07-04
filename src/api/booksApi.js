import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { fireDB } from '../firebase/firebaseConfig.js';

// Get Books
export const getBooks = async () => {
  try {
    const booksCollection = collection(fireDB, 'books');
    const snapshot = await getDocs(booksCollection);
    const books = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw new Error("Error while getting list of books");
  } 
};

// Delete Book
export const deleteBook = async (id) => {
  try {
    const bookRef = doc(fireDB, 'books', id);
    await deleteDoc(bookRef);
  } catch (error) {
    console.error("Error deleting book:", error);
    throw new Error("Failed to delete book");
  }
};

// Update Book
export const updateBook = async (id, updatedData) => {
  try {
    const bookRef = doc(fireDB, 'books', id);
    await updateDoc(bookRef, updatedData);
  } catch (error) {
    console.error("Error updating book:", error);
    throw new Error("Failed to update book");
  }
};
