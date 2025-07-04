import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../firebase/firebaseConfig";

// Fetch all teachers
export const fetchTeachers = async () => { 
  try {
    const teachersCollection = collection(fireDB, "teachers");
    const snapshot = await getDocs(teachersCollection);
    const teachers = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return teachers;
  } catch (error) {
    console.error("Error fetching teachers:", error);
    return [];
  }
};

// Delete a teacher by ID
export const deleteTeacher = async (teacherId) => {
  try {
    const teacherDocRef = doc(fireDB, "teachers", teacherId);
    await deleteDoc(teacherDocRef);
    console.log(`Teacher with ID ${teacherId} deleted successfully`);
    return true;
  } catch (error) {
    console.error(`Error deleting teacher with ID ${teacherId}:`, error);
    return false;
  }
};
