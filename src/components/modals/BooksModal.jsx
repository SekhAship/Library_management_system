// // components/Modal.jsx
// import React from 'react';
// import Modal from 'react-modal';

// Modal.setAppElement('#root'); // Avoid accessibility warning

// const BookModal = ({ isOpen, onRequestClose, editBookData, setEditBookData, handleUpdate }) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onRequestClose}
//       className="custom-modal"
//       style={{
//         content: {
//           width: '400px',  
//           height: '350px', 
//           margin: 'auto',  
//           padding: '20px', 
//           borderRadius: '10px',
//           boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)', 
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'space-between',
//           backgroundColor: '#f9f9f9', 
//           overflow: 'hidden', 
//         },
//         overlay: {
//           backgroundColor: 'rgba(0, 0, 0, 0.5)', // Slightly dark background
//         },
//       }}
//     >
//       <div>
//         <h2 className="text-lg font-semibold mb-3">Edit Book</h2>

//         <div className="flex flex-col gap-2">
//           <input 
//             type="text" 
//             value={editBookData.name} 
//             onChange={(e) => setEditBookData({ ...editBookData, name: e.target.value })} 
//             placeholder="Name" 
//             className="border p-2 rounded"
//           />
//           <input 
//             type="text" 
//             value={editBookData.author} 
//             onChange={(e) => setEditBookData({ ...editBookData, author: e.target.value })} 
//             placeholder="Author" 
//             className="border p-2 rounded"
//           />
//           <input 
//             type="text" 
//             value={editBookData.publisher} 
//             onChange={(e) => setEditBookData({ ...editBookData, publisher: e.target.value })} 
//             placeholder="Publisher" 
//             className="border p-2 rounded"
//           />
//           <input 
//             type="text" 
//             value={editBookData.isbn} 
//             onChange={(e) => setEditBookData({ ...editBookData, isbn: e.target.value })} 
//             placeholder="ISBN" 
//             className="border p-2 rounded"
//           />
//         </div>

//         <div className="flex justify-end gap-2 mt-3">
//           <button 
//             onClick={onRequestClose} 
//             className="bg-gray-500 text-white px-4 py-2 rounded"
//           >
//             Cancel
//           </button>
//           <button 
//             onClick={handleUpdate} 
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default BookModal;






import React from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/firebaseConfig.js";

// import { db, collection, addDoc } from "../firebaseConfig";


function BookModal({ isOpen, onRequestClose, editBookData, setEditBookData, handleUpdate }) {
    const [form] = Form.useForm(); // ✅ Create form instance

    const onFinish = async (values) => {
        try {
            const newDonor = {
                name: values.name,
                age: Number(values.age),
                gender: values.gender,
                bloodType: values.bloodType,
                organ: values.organ,
                height: Number(values.height),
                weight: Number(values.weight),
                registeredAt: new Date().toISOString(),
            };

            await addDoc(collection(fireDB, "hospital/J1mvbTqe81NV60tTKYoT/donors"), newDonor);
            message.success("Donor Registered Successfully!");
            toast.success("Donor Registered Successfully!"); // ✅ Add toast notification

            form.resetFields(); // ✅ Reset form after successful submission
            onRequestClose();
        } catch (error) {
            console.error("Error adding donor:", error);
            message.error("Failed to register donor. Try again.");
        }
    };

    return (
        <Modal open={isOpen} onCancel={onRequestClose} footer={null}>
            <div>
                <h2 className="text-lg font-semibold mb-3">Edit Book</h2>

                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        value={editBookData.name}
                        onChange={(e) => setEditBookData({ ...editBookData, name: e.target.value })}
                        placeholder="Name"
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        value={editBookData.author}
                        onChange={(e) => setEditBookData({ ...editBookData, author: e.target.value })}
                        placeholder="Author"
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        value={editBookData.publisher}
                        onChange={(e) => setEditBookData({ ...editBookData, publisher: e.target.value })}
                        placeholder="Publisher"
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        value={editBookData.isbn}
                        onChange={(e) => setEditBookData({ ...editBookData, isbn: e.target.value })}
                        placeholder="ISBN"
                        className="border p-2 rounded"
                    />
                </div>

                <div className="flex justify-end gap-2 mt-3">
                    <button
                        onClick={onRequestClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default BookModal;














