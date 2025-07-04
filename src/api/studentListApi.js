import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../firebase/firebaseConfig";

// Fetch all students
export const fetchStudents = async () => {
  try {
    const studentsCollection = collection(fireDB, "users");
    const snapshot = await getDocs(studentsCollection);
    const students = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return students;
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
};

// Delete a student by ID
export const deleteStudent = async (studentId) => {
  try {
    const studentDocRef = doc(fireDB, "users", studentId);
    await deleteDoc(studentDocRef);
    console.log("Student deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting student:", error);
    return false;
  }
};
