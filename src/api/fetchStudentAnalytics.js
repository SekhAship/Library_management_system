import { collection, getDocs, query, where } from "firebase/firestore";
import { fireDB } from "../firebase/firebaseConfig.js";

export const fetchStudentAnalytics = async () => {
  try {
    // Fetch total number of students
    const studentsSnapshot = await getDocs(collection(fireDB, "users"));
    const totalStudents = studentsSnapshot.size-1;

    // Fetch total number of books issued
    const issuedBooksSnapshot = await getDocs(collection(fireDB, "issued_books"));
    const totalBooksIssued = issuedBooksSnapshot.size;

    // Fetch overdue books where books are not returned
    const overdueQuery = query(
      collection(fireDB, "issued_books"),
      where("returned", "==", false) // Assuming there is a field isReturned
    );
    const overdueSnapshot = await getDocs(overdueQuery);
    const totalOverdueBooks = overdueSnapshot.size;

    // Return analytics data
    return {
      totalStudents,
      totalBooksIssued,
      totalOverdueBooks,
    };
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    throw new Error(error.message);
  }
};
