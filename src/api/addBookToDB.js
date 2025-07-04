import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { fireDB } from '../firebase/firebaseConfig';

export const addBookToDB = async (product, setLoading) => {
    if (
        !product.name || 
        !product.author || 
        !product.publisher || 
        !product.isbn
    ) {
        toast.error("All fields are required");
        return { success: false };
    }

    setLoading(true);
    try {
        const productRef = collection(fireDB, 'books');
        await addDoc(productRef, product);
        toast.success("Book added successfully!");
        setLoading(false);
        return { success: true };
    } catch (error) {
        console.error("Error adding book:", error);
        toast.error("Failed to add book.");
        setLoading(false);
        return { success: false };
    }
};
