import { collection, query, where, getDocs } from "firebase/firestore";
import { fireDB } from "../firebase/firebaseConfig.js";

export const fetchUserDataById = async (userName) => {
  try {
    // console.log("Fetching books for student:", userName);
    
    const issuedBooksRef = collection(fireDB, "issued_books");
    const q = query(issuedBooksRef, where("student_name", "==", userName), where("returned", "==", false));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error("No issued books found for the student.");
      return []; // Return an empty array instead of null
    }

    // Fetch all issued books for the student
    const books = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return books;
  } catch (error) {
    console.error("Error fetching user books:", error.message);
    throw new Error(error.message);
  }
};