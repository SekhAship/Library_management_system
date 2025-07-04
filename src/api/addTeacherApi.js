import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../firebase/firebaseConfig";

// Add a new teacher to Firebase Auth and Firestore
export const addTeacher = async (name, email, phoneNumber, address, role) => {
  try {
    const password = `${name}@library`; // Auto-generate password

    // Create Teacher in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid; // Get Firebase user UID

    // Add Teacher to Firestore 'teachers' collection
    const teacherRef = collection(fireDB, "teachers");
    await addDoc(teacherRef, {
      uid, // Store UID for querying during login
      name,
      email,
      phoneNumber,
      address,
      role,
      createdAt: new Date().toISOString(),
    });

    console.log("Teacher added successfully to Firebase Auth and Firestore");
    return true;
  } catch (error) {
    console.error("Error adding teacher:", error);
    return false;
  }
};
