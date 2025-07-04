import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { fireDB } from "../firebase/firebaseConfig.js";

// Fetch book details by ISBN (only if not returned)
export const fetchIssuedBookByISBN = async (isbn) => {
  try {
    const issuedBooksRef = collection(fireDB, "issued_books");
    const q = query(issuedBooksRef, where("isbn", "==", isbn), where("returned", "==", false));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error("No issued book found for the given ISBN.");
      return null; // Return null if book is not found
    }

    const book = querySnapshot.docs[0].data();
    return { id: querySnapshot.docs[0].id, ...book };
  } catch (error) {
    console.error("Error fetching book:", error.message);
    return null;
  }
};

// Mark the issued book as returned
export const returnBook = async (bookId) => {
  try {
    const bookDocRef = doc(fireDB, "issued_books", bookId);
    await updateDoc(bookDocRef, { returned: true }); // Ensure it's a boolean if stored as BOOLEAN

    console.log("Book successfully returned.");
    return true;
  } catch (error) {
    console.error("Error returning book:", error.message);
    throw new Error(error.message);
  }
};

// Fetch all non-returned books
export const fetchAllNonReturnedBooks = async () => {
  try {
    const issuedBooksRef = collection(fireDB, "issued_books");
    const q = query(issuedBooksRef, where("returned", "==", false));
    const querySnapshot = await getDocs(q);

    const nonReturnedBooks = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return nonReturnedBooks;
  } catch (error) {
    console.error("Error fetching non-returned books:", error.message);
    return [];
  }
};
