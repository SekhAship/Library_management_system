import { collection, getDocs, doc, getDoc, addDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { fireDB } from "../firebase/firebaseConfig.js";

// Fetch all students
export const fetchStudents = async () => {
  try {
    const studentsCollection = collection(fireDB, "users");
    const snapshot = await getDocs(studentsCollection);
    const students = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })).map(student => ({
      id: student.id,
      name: student.name,
      email: student.email,
      role: student.role
    }));
    return students;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw new Error(error.message);
  }
};

// Fetch all books
export const fetchBooks = async () => {
  try {
    const booksCollection = collection(fireDB, "books");
    const snapshot = await getDocs(booksCollection);
    const books = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })).map(book => ({
      id: book.id,
      name: book.name,
      author: book.author,
      isbn: book.isbn,
    }));
    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw new Error(error.message);
  }
};

// Issue a book with student name, book name, and ISBN number
export const issueBook = async (studentId, bookId, issueDate, returnDate) => {
  try {
    // Fetch student details
    const studentDocRef = doc(fireDB, "users", studentId);
    const studentSnapshot = await getDoc(studentDocRef);
    const studentData = studentSnapshot.data();

    // Fetch book details
    const bookDocRef = doc(fireDB, "books", bookId);
    const bookSnapshot = await getDoc(bookDocRef);
    const bookData = bookSnapshot.data();

    if (!studentData || !bookData) {
      throw new Error("Student or Book not found");
    }

    // Insert into 'issued_books' with student name, book name, and ISBN
    const issuedBooksRef = collection(fireDB, "issued_books");
    await addDoc(issuedBooksRef, {
      student_id: studentId,
      student_name: studentData.name, // Store student name
      book_id: bookId,
      book_name: bookData.name, // Store book name
      isbn: bookData.isbn, // Store ISBN number
      issue_date: issueDate,
      return_date: returnDate,
      returned: false,
    });

    // Update user's document to add book details
    await updateDoc(studentDocRef, {
      books: arrayUnion({
        book_id: bookId,
        book_name: bookData.name,
        isbn: bookData.isbn,
        issue_date: issueDate,
        return_date: returnDate,
      }),
    });

    console.log("Book issued successfully");
    return true;
  } catch (error) {
    console.error("Error issuing book:", error);
    throw new Error(error.message);
  }
};
