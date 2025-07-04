import { collection, addDoc } from "firebase/firestore";
import { fireDB } from "../firebase/firebaseConfig";

// Add a student
export const addStudent = async (name, email, department, collegeId) => {
  try {
    const studentRef = collection(fireDB, "students"); // Reference to 'students' collection
    await addDoc(studentRef, {
      name,
      email,
      department,
      collegeId,
      createdAt: new Date().toISOString(), // Optional: Add timestamp
    });
    console.log("Student added successfully");
    return true;
  } catch (error) {
    console.error("Error adding student:", error);
    return false;
  }
};
